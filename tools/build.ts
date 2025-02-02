import { exec } from 'node:child_process';
import path from 'node:path';
import fs from 'fs/promises';
import { fileURLToPath } from 'url';

const libs = ['angular-bootstrap', 'angular-globalite'];

const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename);
const rootDir = path.dirname(__dirname);

console.log('rootDir', rootDir);

const versionRx = /^v(\d+\.\d+\.\d+)(?:-(\d+)-(g[a-f0-9]+))?$/;
const version = await new Promise<string>((resolve, reject) => {
	exec('git describe --tags', {}, (error, stdout) => {
		if (error) {
			reject(error);
		} else {
			resolve(stdout.trim());
		}
	});
});

const match = version.match(versionRx);
if (!match) {
	console.error(`Invalid version: ${version}`);
	process.exit(1);
}

console.log(`Version: ${version}`);

let actualVersion = match[1];
if (match[2]) {
	actualVersion += `-build.${match[2]}`;
}

for (const lib of libs) {
	console.log(`Building ${lib}...`);
	await new Promise<void>((resolve, reject) => {
		exec(
			`ng build ${lib} --configuration production`,
			{},
			(error, stdout, stderr) => {
				console.error(stderr);
				console.log(stdout);
				if (error) {
					reject(error);
					process.exit(1);
				} else {
					resolve();
				}
			}
		);
	});

	const packageJsonPath = path.join(
		rootDir,
		`dist`,
		`${lib}`,
		`package.json`
	);

	console.log('packageJsonPath:', packageJsonPath);
	// Read the package.json file
	const packageJson = JSON.parse(await fs.readFile(packageJsonPath, 'utf-8'));

	// Remove scripts and devDependencies
	delete packageJson.exports;
	packageJson.version = actualVersion;

	// Write the modified package.json to the build directory
	await fs.writeFile(
		packageJsonPath,
		JSON.stringify(packageJson, null, 2),
		'utf-8'
	);

	console.log(`Publishing ${lib}...`);
	await new Promise<void>((resolve, reject) => {
		exec(
			`npm publish --provenance --access public`,
			{
				cwd: path.join(rootDir, `dist`, `${lib}`),
			},
			(error, stdout, stderr) => {
				console.error(stderr);
				console.log(stdout);
				if (error) {
					reject(error);
					process.exit(1);
				} else {
					resolve();
				}
			}
		);
	});

	console.log(`Published ${lib}`);
}

console.log('Build complete');

process.exit(0);
