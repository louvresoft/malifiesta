import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'moneyConversion'
})
export class MoneyConversionPipe implements PipeTransform {

  public transform(value: number) {
    return (value / 100).toFixed(2);
  }

}
