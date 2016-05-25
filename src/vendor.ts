// For vendors for example jQuery, Lodash, angular2-jwt just import them here unless you plan on
// chunking vendors files for async loading. You would need to import the async loaded vendors
// at the entry point of the async loaded file. Also see custom-typings.d.ts as you also need to
// run `typings install x` where `x` is your module

// Angular 2
import '@angular/platform-browser';
import '@angular/platform-browser-dynamic';
import '@angular/core';
import '@angular/common';
import '@angular/http';
import '@angular/router-deprecated';

// RxJS
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';

// Bootstrap
import 'jquery';
import 'bootstrap/dist/js/bootstrap.js';
import 'admin-lte/dist/js/app.js';

import 'bootstrap/dist/css/bootstrap.css';
import 'admin-lte/dist/css/AdminLTE.css';
import 'admin-lte/dist/css/skins/skin-blue.css';
import 'admin-lte/plugins/datatables/dataTables.bootstrap.css';
import './assets/css/styles.css';

// Font-awesome
import 'font-awesome/css/font-awesome.css';

import 'roboto-font/css/fonts.css';

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

if ('production' === ENV) {
  // Production


} else {
  // Development

}
