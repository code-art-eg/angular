# @code-art-eg/angular-bootstrap

This library provides [Angular](https://angular.dev/) components, directives and services for the [Bootstrap](https://getbootstrap.com/) library.

## Installation

You can install this library via npm:

```bash
npm install @code-art-eg/angular-bootstrap bootstrap
```

or via yarn:

```bash
yarn add @code-art-eg/angular-bootstrap bootstrap
```

## Versioning scheme

The library major version follows the major version of Angular it is compatible with. For example, version 19.x.x is compatible with Angular 19.x.x. Since the first version was created for Angular 19, the lowest major version is 19.0.1.

## Documentation

See documentation in [docs](https://code-art-eg.github.io/angular-bootstrap/) for more details.

## Services

### ThemeService

This service provides a way to change the theme (light vs dark) of the Bootstrap library. It automatically detects the user's system theme and sets the theme accordingly. But you can also manually set the via
a service implementing `ThemeProvider` interface provided by `THEME_PROVIDER_TOKEN`.

There is a built-in service `LocalStorageThemeService` that saves the theme in the local storage. It's provided by default via `THEME_PROVIDER_TOKEN`.
By injecting the `ThemeService` in your `AppComponent`, it will automatically set the theme and respond to changes to user's system theme
and changes to the theme via the `ThemeProvider`.

## Components

### ThemePickerComponent

This component provides a way to change the theme (light vs dark) of the Bootstrap library. It displays a dropdown menu with three options: Light, Dark and Auto.
When the user selects a theme, it changes the theme via the `ThemeProvider` provider by `THEME_PROVIDER_TOKEN` (`LocalStorageThemeService` by default).
The changes are reflected in the `ThemeService` service and the theme of the page is set accordingly.

### Example Usage

```typescript
import { ThemePickerComponent, ThemeService } from '@code-art-eg/angular-bootstrap';

@Component({
	selector: 'app-root',
	template: `
		<div class="container my-5">
			<bs-theme-picker></bs-theme-picker>
		</div>
	`,
})
export class AppComponent {
	// by injecting the service, it will automatically set the theme and respond to changes to user's system theme and changes to the theme via the ThemeProvider.
	private themeService = inject(ThemeService);
	constructor() {}
	toggleTheme() {}
}
```
