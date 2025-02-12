import { ControlStyleOptions } from './types';

export const VALIDATION_ERROR_CSS_CLASS = 'invalid-feedback';
export const VALIDATION_SUMMARY_CONTAINER_CSS_CLASS = 'alert alert-danger';
export const VALIDATION_SUMMARY_HEADER_CSS_CLASS = 'alert-heading';
export const VALIDATION_SUMMARY_LIST_CSS_CLASS = 'list-unstyled';

export const FORM_CONTROL_CSS_CLASS = 'form-control';
export const FORM_CONTROL_CHECK_CSS_CLASS = 'form-check';
export const FORM_CONTROL_CHECK_LABEL_CSS_CLASS = 'form-check-label';
export const FORM_CONTROL_VALID_CSS_CLASS = 'is-valid';
export const FORM_CONTROL_INVALID_CSS_CLASS = 'is-invalid';
export const FORM_LABEL_CSS_CLASS = 'form-label';
export const FORM_GROUP_CSS_CLASS = 'form-group';

export const DEFAULT_CONTROL_STYLE_OPTIONS: ControlStyleOptions = {
	validationErrorCssClass: VALIDATION_ERROR_CSS_CLASS,
	validationSummaryContainerCssClass: VALIDATION_SUMMARY_CONTAINER_CSS_CLASS,
	validationSummaryHeaderCssClass: VALIDATION_SUMMARY_HEADER_CSS_CLASS,
	validationSummaryListCssClass: VALIDATION_SUMMARY_LIST_CSS_CLASS,
	formControlCssClass: FORM_CONTROL_CSS_CLASS,
	formControlCheckCssClass: FORM_CONTROL_CHECK_CSS_CLASS,
	formControlCheckLabelCssClass: FORM_CONTROL_CHECK_LABEL_CSS_CLASS,
	formControlValidCssClass: FORM_CONTROL_VALID_CSS_CLASS,
	formControlInvalidCssClass: FORM_CONTROL_INVALID_CSS_CLASS,
	formLabelCssClass: FORM_LABEL_CSS_CLASS,
	formGroupCssClass: FORM_GROUP_CSS_CLASS,
};
