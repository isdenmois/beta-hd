import {Pipe, PipeTransform} from 'angular2/core';
/*
 * Convert new line characters to br.
 * Usage:
 *   value | nl2br
 */
@Pipe({name: 'nl2br'})
export class NewLineToBrPipe implements PipeTransform {
    transform(value: string) : string {
        return (value + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1<br>$2');
    }
}
