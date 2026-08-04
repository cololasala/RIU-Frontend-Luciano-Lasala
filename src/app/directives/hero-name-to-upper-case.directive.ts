import { Directive } from '@angular/core';

@Directive({
  selector: '[appHeroNameToUpperCase]',
  host: {
    '(focus)': 'this.transformToUpperCase($event)',
    '(input)': 'this.transformToUpperCase($event)',
  },
})
export class HeroNameToUpperCase {
  transformToUpperCase = (event: Event) => {
    const inputElement = event.target as HTMLInputElement;
    inputElement.value =
      String(inputElement.value).charAt(0).toUpperCase() + String(inputElement.value).slice(1);
  };
}
