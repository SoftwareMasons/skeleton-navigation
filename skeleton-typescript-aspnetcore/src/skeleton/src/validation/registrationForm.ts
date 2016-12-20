import { inject } from 'aurelia-dependency-injection';
import { ValidationControllerFactory, ValidationController, ValidationRules, ControllerValidateResult, ValidateResult, Validator } from 'aurelia-validation';

@inject(ValidationControllerFactory)
export class RegistrationForm {
  heading: string = 'Registration';
  firstName: string = '';
  lastName: string = '';
  email: string = '';
  controller: ValidationController = null;
  errorMessage: string = '';
  validator: Validator = null;

  constructor(controllerFactory: ValidationControllerFactory, validator: Validator) {
    this.controller = controllerFactory.createForCurrentScope();
    this.validator = validator;

    ValidationRules
      .ensure('firstName').required().withMessage('First Name property is required.')
      .ensure('lastName').required().withMessage('Last Name property is required.')
      .ensure('email').required().email()
      .on(this);
 }

  submit() {
    this.controller.validate().then((result: ControllerValidateResult) => {
      if (result.valid) {
        this.errorMessage = '';
      } else {
        for (let item: number = 0; item < result.results.length; item++) {
          let validateResult: ValidateResult = result.results[item];
          if (!validateResult.valid) {
            this.errorMessage = validateResult.message;
          }
        }
      }
    });
  }
}
