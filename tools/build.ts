import { exec } from 'node:child_process';
import path from 'node:path';
import fs from 'fs/promises';
import { fileURLToPath } from 'url';

const libs = ['angular-bootstrap', 'angular-globalite', 'angular-forms'];

const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename);
const rootDir = path.dirname(__dirname);
const prefix = '@code-art-eg';

const keys = [
	'name',
	'version',
	'author',
	'private',
	'sideEffects',
	'repository',
	'bugs',
	'homepage',
	'license',
];

function sortObjectKeys(obj: Record<string, unknown>): Record<string, unknown> {
	return Object.keys(obj)
		.sort((a, b) => {
			const indexA = keys.indexOf(a);
			const indexB = keys.indexOf(b);

			if (indexA === -1 && indexB === -1) {
				return a.localeCompare(b);
			} else if (indexA === -1) {
				return 1;
			} else if (indexB === -1) {
				return -1;
			} else {
				return indexA - indexB;
			}
		})
		.reduce(
			(result, key) => {
				result[key] = obj[key];
				return result;
			},
			{} as Record<string, unknown>
		);
}

const mainPackageJsonPath = path.join(rootDir, 'package.json');
const mainPackageJson = JSON.parse(
	await fs.readFile(mainPackageJsonPath, 'utf-8')
);

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

	for (const key of Object.getOwnPropertyNames(
		packageJson.peerDependencies
	)) {
		if (!Object.hasOwn(packageJson.peerDependencies, key)) {
			continue;
		}

		if (key in mainPackageJson.dependencies) {
			packageJson.peerDependencies[key] =
				mainPackageJson.dependencies[key];
		} else if (key in mainPackageJson.devDependencies) {
			packageJson.peerDependencies[key] =
				mainPackageJson.devDependencies[key];
		} else {
			if (key.startsWith(prefix + '/')) {
				const libName = key.slice(prefix.length + 1);
				if (libs.includes(libName)) {
					if (libName === lib) {
						console.error(`Circular dependency: ${lib}`);
						process.exit(1);
					}
					packageJson.peerDependencies[key] = actualVersion;
				} else {
					console.error(`Dependency not found: ${key}`);
					process.exit(1);
				}
			} else {
				console.error(`Dependency not found: ${key}`);
				process.exit(1);
			}
		}
	}

	packageJson.name = `${prefix}/${lib}`;
	packageJson.private = false;
	packageJson.sideEffects = false;
	packageJson.repository = mainPackageJson.repository;
	packageJson.bugs = mainPackageJson.bugs;
	packageJson.homepage = mainPackageJson.homepage;
	packageJson.author = mainPackageJson.author;
	packageJson.license = mainPackageJson.license;

	// Write the modified package.json to the build directory
	await fs.writeFile(
		packageJsonPath,
		JSON.stringify(sortObjectKeys(packageJson), null, '\t'),
		'utf-8'
	);

	if (process.env['NODE_AUTH_TOKEN']) {
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
}

console.log('Build complete');

process.exit(0);
