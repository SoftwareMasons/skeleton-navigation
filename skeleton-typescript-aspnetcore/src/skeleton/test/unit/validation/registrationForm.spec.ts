import { RegistrationForm } from '../../../src/validation/registrationForm';
import { Container } from 'aurelia-dependency-injection';
import { ValidationControllerFactory, Validator, ValidateResult } from 'aurelia-validation';
import { Aurelia } from 'aurelia-framework';
import { bootstrap } from 'aurelia-bootstrapper';

describe('RegistrationForm', () => {
  let container: Container;
  let sut: RegistrationForm;

  beforeEach((done: () => void) => {
    bootstrap((aurelia: Aurelia) => {
      container = aurelia.container;

      aurelia.use
        .standardConfiguration()
        .plugin('aurelia-validation');

      return aurelia.start();
    }).then(() => {
      let validationControllerFactory = container.get(ValidationControllerFactory);
      let validator = container.get(Validator);
      sut = new RegistrationForm(validationControllerFactory, validator);
      done();
    });
  });

  describe('firstName', () => {
    it('validation fails when blank', (done: () => void) => {
      sut.firstName = '';
      sut.validator.validateProperty(sut, 'firstName').then((results: ValidateResult[]) => {
        expect(results[0].message).toBe('First Name property is required.');
        done();
      });
    });

    it('validation passes when provided', ((done: () => void) => {
      sut.firstName = 'Valid first name';
      sut.validator.validateProperty(sut, 'firstName').then((results: ValidateResult[]) => {
        expect(results[0].valid).toBe(true);
        done();
      });
    }));
  });

  describe('lastName', () => {
    it('validation fails when blank', (done: () => void) => {
      sut.lastName = '';
      sut.validator.validateProperty(sut, 'lastName').then((results: ValidateResult[]) => {
        expect(results[0].message).toBe('Last Name property is required.');
        done();
      });
    });

    it('validation passes when provided', ((done: () => void) => {
      sut.lastName = 'Valid last name';
      sut.validator.validateProperty(sut, 'lastName').then((results: ValidateResult[]) => {
        expect(results[0].valid).toBe(true);
        done();
      });
    }));
  });
});

