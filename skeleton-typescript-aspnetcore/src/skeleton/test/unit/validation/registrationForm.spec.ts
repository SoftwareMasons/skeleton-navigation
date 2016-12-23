import { StageComponent, ComponentTester } from 'aurelia-testing';
import { RegistrationForm } from '../../../src/validation/registrationForm';
import { Container } from 'aurelia-dependency-injection';
import { BindingLanguage } from 'aurelia-templating';
import { TemplatingBindingLanguage } from 'aurelia-templating-binding';
import { ValidationControllerFactory, Validator, ValidateResult, ValidationRules, ValidationParser } from 'aurelia-validation';
import { Aurelia } from 'aurelia-framework';
import { bootstrap } from 'aurelia-bootstrapper';

describe('RegistrationForm', () => {
  let container: Container;
  let sut: RegistrationForm;
  let component: ComponentTester;
  let parser: ValidationParser;

  function configure(aurelia: Aurelia) {
    container = aurelia.container;

    aurelia.use
      .standardConfiguration()
      .plugin('aurelia-validation');
      // Including the view / view model to be tested as a global resource and then
      // referencing in the .inView of the ComponentTester creation appears to do
      // absolutely nothing.
      //.globalResources('../../../src/validation/registrationForm');

    return aurelia.start();
      // Configuring the ValidationRules by calling the ValidationRules.initialize
      // method after registering the TemplateBindingLanguage also appears to
      // to do absolutely nothing.
      //.then((aurelia) => {
      //container.registerInstance(BindingLanguage, container.get(TemplatingBindingLanguage));
      //parser = container.get(ValidationParser);
      //ValidationRules.initialize(parser);
      //});
  }

  beforeEach((done: () => void) => {
    component = StageComponent
      .withResources()
      .inView('<registration-form></registration-form')
      .boundTo({});
    component.bootstrap(configure);
    (<Promise<any>>component.create(<any>bootstrap)).then(() => {
      const controller = container.get(ValidationControllerFactory);
      const validator = container.get(Validator);
      sut = new RegistrationForm(controller, validator);
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

