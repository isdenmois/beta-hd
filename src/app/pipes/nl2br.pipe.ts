import {Pipe, PipeTransform} from 'angular2/core';
/*
 * Convert new line characters to br.
 * Usage:
 *   value | nl2br
 */
@Pipe({name: 'nl2br'})
export class NewLineToBrPipe implements PipeTransform {
    transform(value: string) : string {
        return (value + '').replace(/\\n|\\r|\r\n|\n\r|\r|\n/g, '<br>');
    }
}
