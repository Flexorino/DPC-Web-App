import { BSEvaluationEnum } from './BSEvaluationEnum';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'bSEvaluationPipe'
})
export class BSEvaluationPipePipe implements PipeTransform {

  transform(value: BSEvaluationEnum, ...args: any[]): any {
    if (value === BSEvaluationEnum.HYPER) {
      return "Hyperglykämie";
    } else if (value === BSEvaluationEnum.TOOHIGH) {
      return 'über Obergenze';
    } else if (value === BSEvaluationEnum.TARGETAREA) {
      return 'im Zielbereich';
    } else if (value === BSEvaluationEnum.TOOLOW) {
      return 'unter Untergrene';
    } else if (value === BSEvaluationEnum.HYPO) {
      return 'Hypoglykämie';
    }
  }


}
