import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'iconPipe'
})
export class IconPipePipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    if(value==="Information")
    return "info";
    if(value==="Warning")
    return "error";
  }

}
