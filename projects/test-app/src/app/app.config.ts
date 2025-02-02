import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { SUPPORTED_LOCALES_TOKEN } from '@code-art-eg/angular-globalite';

export const appConfig: ApplicationConfig = {
	providers: [
		provideZoneChangeDetection({ eventCoalescing: true }),
		provideRouter(routes),
		{
			provide: SUPPORTED_LOCALES_TOKEN,
			useValue: ['en-GB', 'de-DE', 'ar-EG'],
		},
	],
};
