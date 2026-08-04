import { Directive } from '@angular/core';

@Directive({
  selector: '[appHeroNameToUpperCase]',
  host: {
    '(input)': 'this.transformToUpperCase($event)',
  },
})
export class HeroNameToUpperCase {
  transformToUpperCase = (event: Event) => {
    const inputElement = event.target as HTMLInputElement;
    inputElement.value = inputElement.value.toUpperCase();
  };
}
