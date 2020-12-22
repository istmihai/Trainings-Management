import { Pipe, PipeTransform } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Pipe({
  name: 'trainingName'
})
export class TrainingNamePipe implements PipeTransform {
  constructor(private db :AngularFirestore){}
  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
