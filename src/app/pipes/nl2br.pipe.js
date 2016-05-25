var core_1 = require('angular2/core');
/*
 * Convert new line characters to br.
 * Usage:
 *   value | nl2br
 */
var NewLineToBrPipe = (function () {
    function NewLineToBrPipe() {
    }
    NewLineToBrPipe.prototype.transform = function (value) {
        return (value + '').replace(/\\n|\\r|\r\n|\n\r|\r|\n/g, '<br>');
    };
    NewLineToBrPipe = __decorate([
        core_1.Pipe({ name: 'nl2br' }), 
        __metadata('design:paramtypes', [])
    ], NewLineToBrPipe);
    return NewLineToBrPipe;
})();
exports.NewLineToBrPipe = NewLineToBrPipe;
//# sourceMappingURL=nl2br.pipe.js.map