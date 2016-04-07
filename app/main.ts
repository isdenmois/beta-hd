import {bootstrap}    from 'angular2/platform/browser';
import {AppComponent} from './components/app.component';

Date.prototype.toString = function () {
    let day = this.getDate();
    if (day < 10) {
        day = '0' + day;
    }
    let month = this.getMonth() + 1;
    if (month < 10) {
        month = '0' + month;
    }
    let year = this.getFullYear();
    return `${day}.${month}.${year}`;
};

bootstrap(AppComponent);
