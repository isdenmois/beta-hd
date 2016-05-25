/**
 * Define Task service.
 */
import {Injectable} from 'angular2/core';
import {Http} from "angular2/http";
import {serverPath} from '../constants/server';

@Injectable()
export class AppService {

    constructor(private http:Http) {
    }

    getAuthDetail():any {
        return this.http.get('${serverPath}/?op=getAutherizedUserInfo')
            .map(response => response);
    }
}
