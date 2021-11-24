import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';

@Pipe({
  name: 'kilograms'
})
export class KilogramsPipe implements PipeTransform {

  transform(value: number, ...args: unknown[]): unknown {
    return value * environment.conversionFactor;
  }

}
