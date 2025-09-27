import { Pipe, PipeTransform } from '@angular/core';
import { Experiment } from './model/experiment.type';

@Pipe({
  name: 'statusCount',
  standalone: true,
})
export class StatusCountPipe implements PipeTransform {

  transform(experiments: Experiment[], status: string): number {
    if(!experiments) return 0;
    return experiments.filter(exp => exp.status === status).length;
  }

}
