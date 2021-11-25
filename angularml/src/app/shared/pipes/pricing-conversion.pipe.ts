import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pricingConversion'
})
export class PricingConversionPipe implements PipeTransform {

  public transform(value: number) {
    if (value === -1) {
      return 'Ilimitados';
    } else if (value === 0) {
      return 'No';
    } else {
      return value;
    }
  }

}
