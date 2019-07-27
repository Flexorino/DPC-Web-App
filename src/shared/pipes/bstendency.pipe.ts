import { BSTendencyEnum } from './BSTendencyEnum';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'bSTendency'
})
export class BSTendencyPipe implements PipeTransform {

  transform(value: BSTendencyEnum, ...args: any[]): string {
    if (value === BSTendencyEnum.UP) {
      return "trending_up";
    } else if (value === BSTendencyEnum.DOWN) {
      return "trending_down";
    } else if (value === BSTendencyEnum.CONSITENT) {
      return "trending_flat";
    }
  }

}
