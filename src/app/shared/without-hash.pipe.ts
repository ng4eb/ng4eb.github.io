import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'withoutHash'
})
export class WithoutHashPipe implements PipeTransform {

  transform(value: string | null, ...args: unknown[]): string {
    if (!value) return '';
    return value.split('#')[0];
  }

}
