import { HeroNameToUpperCase } from './hero-name-to-upper-case.directive';

let directive: HeroNameToUpperCase;

describe('HeroNameToUpperCase', () => {
  directive = new HeroNameToUpperCase();

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });

  it('should transform the input value to uppercase, only first letter', () => {
    const inputElement = document.createElement('input');
    inputElement.value = 'superman';
    directive.transformToUpperCase({ target: inputElement } as unknown as Event);
    expect(inputElement.value).toBe('Superman');
  });
});
