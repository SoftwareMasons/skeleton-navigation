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

    /*
      Defining validation rules to an instance in the constructor appears to
      work though it may not be the preferable method to define rules on a class.
    */
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
/*
  Defining validation rules to a class like done in the commented out code below
  breaks all tests. A "Did you forget to add the ".plugin('aurelia-validation')"
  to main.ts error is reported.
*/
//ValidationRules
//  .ensure((f: RegistrationForm) => f.firstName).required().withMessage('First Name property is required.')
//  .ensure(f => f.lastName).required().withMessage('Last Name property is required.')
//  .ensure(f => f.email).required().email()
//  .on(RegistrationForm);

