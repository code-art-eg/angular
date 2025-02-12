import { FormControl, FormGroup } from '@angular/forms';
import { getControlParameterizedErrors } from './get-control-parameterized-errors';
import { FORM_FIELD_CONTEXT, FORM_VALIDATION_CONTEXT } from '../constants';

describe('getControlParameterizedErrors', () => {
	it('should return empty array when control has no errors', () => {
		const ctl = new FormControl<string>('');
		const result = getControlParameterizedErrors(ctl);
		expect(result).toEqual([]);
	});

	it('should return 1 error with verbatim string value', () => {
		const ctl = new FormControl<string>('', () => ({
			required: 'This field is required',
		}));
		const result = getControlParameterizedErrors(ctl);
		expect(result).toEqual([
			{
				messageKey: 'This field is required',
				context: FORM_VALIDATION_CONTEXT,
				parameters: false,
			},
		]);
	});

	it('should return use control key', () => {
		const group = new FormGroup({
			key1: new FormControl<string>('', () => ({
				required: true,
			})),
		});
		const ctl = group.controls.key1;

		const result = getControlParameterizedErrors(ctl);
		expect(result).toEqual([
			{
				messageKey: 'required',
				context: FORM_VALIDATION_CONTEXT,
				parameters: {
					key: {
						messageKey: 'key1',
						context: FORM_FIELD_CONTEXT,
					},
				},
			},
		]);
	});

	it('should return use control key with prefix', () => {
		const group = new FormGroup({
			key1: new FormControl<string>('', () => ({
				required: true,
			})),
		});
		const ctl = group.controls.key1;

		const result = getControlParameterizedErrors(ctl, 'myPrefix');
		expect(result).toEqual([
			{
				messageKey: 'required',
				context: FORM_VALIDATION_CONTEXT,
				parameters: {
					key: {
						messageKey: 'myPrefix.key1',
						context: FORM_FIELD_CONTEXT,
					},
				},
			},
		]);
	});

	it('should return 1 error with format message', () => {
		const ctl = new FormControl<string>('', () => ({
			required: true,
		}));
		const result = getControlParameterizedErrors(ctl);
		expect(result).toEqual([
			{
				messageKey: 'required',
				context: FORM_VALIDATION_CONTEXT,
				parameters: {
					key: {
						messageKey: 'field',
						context: FORM_FIELD_CONTEXT,
					},
				},
			},
		]);
	});

	it('should return 1 error with format message and parameters', () => {
		const ctl = new FormControl<string>('', () => ({
			required: {
				otherKey: {
					messageKey: 'otherKey',
					context: FORM_FIELD_CONTEXT,
				},
			},
		}));
		const result = getControlParameterizedErrors(ctl);
		expect(result).toEqual([
			{
				messageKey: 'required',
				context: FORM_VALIDATION_CONTEXT,
				parameters: {
					key: {
						messageKey: 'field',
						context: FORM_FIELD_CONTEXT,
					},
					otherKey: {
						messageKey: 'otherKey',
						context: FORM_FIELD_CONTEXT,
					},
				},
			},
		]);
	});

	it('should return multiple error with format message and parameters', () => {
		const ctl = new FormControl<string>('', () => ({
			required: {
				otherKey: {
					messageKey: 'otherKey',
					context: FORM_FIELD_CONTEXT,
				},
			},
			minlength: {
				requiredLength: 5,
				actualLength: 3,
			},
		}));
		const result = getControlParameterizedErrors(ctl);
		expect(result).toEqual([
			{
				messageKey: 'required',
				context: FORM_VALIDATION_CONTEXT,
				parameters: {
					key: {
						messageKey: 'field',
						context: FORM_FIELD_CONTEXT,
					},
					otherKey: {
						messageKey: 'otherKey',
						context: FORM_FIELD_CONTEXT,
					},
				},
			},
			{
				messageKey: 'minlength',
				context: FORM_VALIDATION_CONTEXT,
				parameters: {
					key: {
						messageKey: 'field',
						context: FORM_FIELD_CONTEXT,
					},
					requiredLength: 5,
					actualLength: 3,
				},
			},
		]);
	});
});
