/**
 * Define Task service.
 */
var core_1 = require('angular2/core');
var http_1 = require("angular2/http");
var AppService = (function () {
    function AppService(http) {
        this.http = http;
    }
    AppService.prototype.getAuthDetail = function () {
        return this.http.get('${serverPath}/?op=getAutherizedUserInfo')
            .map(function (response) { return response; });
    };
    AppService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], AppService);
    return AppService;
})();
exports.AppService = AppService;
//# sourceMappingURL=app.service.js.map