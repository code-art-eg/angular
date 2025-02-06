/*
 * Public API Surface of angular-bootstrap
 */

export {
	THEME_STORAGE_KEY_TOKEN,
	THEME_PROVIDER_TOKEN,
	DEFAULT_APP_THEME,
	DEFAULT_APP_THEME_KEY,
	DEFAULT_THEME_TOKEN,
} from './lib/constants';

export type { Theme, ThemeProvider } from './lib/types';
export { THEMES } from './lib/themes';

export { LocalStorageThemeProviderService } from './lib/local-storage-theme-provider.service';
export { ThemeService } from './lib/theme.service';

export * from './lib/theme-picker/theme-picker.component';
export * from './lib/picker/picker.component';

export type { Button } from './lib/picker/picker.component';

export type { PickerOption } from './lib/types';
