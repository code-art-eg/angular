import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NumberPipeExampleComponent } from './number-pipe-example/number-pipe-example.component';
import { DatePipeExampleComponent } from './date-pipe-example/date-pipe-example.component';
import { MonthPipeExampleComponent } from './month-pipe-example/month-pipe-example.component';
import { DayPipeExampleComponent } from './day-pipe-example/day-pipe-example.component';
import { LanguagePipeExampleComponent } from './language-pipe-example/language-pipe-example.component';
import { CountryPipeExampleComponent } from './country-pipe-example/country-pipe-example.component';
import { DurationPipeExampleComponent } from './duration-pipe-example/duration-pipe-example.component';
import { BooleanPipeExampleComponent } from './boolean-pipe-example/boolean-pipe-example.component';
import { FormDirectivesExampleComponent } from './form-directives-example/form-directives-example.component';
import { DirectionExampleComponent } from './direction-example/direction-example.component';

export const routes: Routes = [
	{ path: '', redirectTo: '/home', pathMatch: 'full' },
	{ path: 'home', component: HomeComponent, title: 'Home' },
	{
		path: 'gnumber',
		component: NumberPipeExampleComponent,
		title: 'gnumber',
	},
	{
		path: 'gdate',
		component: DatePipeExampleComponent,
		title: 'gdate',
	},
	{
		path: 'gmonth',
		component: MonthPipeExampleComponent,
		title: 'gmonth',
	},
	{
		path: 'gday',
		component: DayPipeExampleComponent,
		title: 'gday',
	},
	{
		path: 'glanguage',
		component: LanguagePipeExampleComponent,
		title: 'glanguage',
	},
	{
		path: 'gcountry',
		component: CountryPipeExampleComponent,
		title: 'gcountry',
	},
	{
		path: 'gduration',
		component: DurationPipeExampleComponent,
		title: 'gduration',
	},
	{
		path: 'gbool',
		component: BooleanPipeExampleComponent,
		title: 'gbool',
	},
	{
		path: 'directives',
		component: FormDirectivesExampleComponent,
		title: 'directives',
	},
	{
		path: 'direction',
		component: DirectionExampleComponent,
		title: 'direction',
	},
];
