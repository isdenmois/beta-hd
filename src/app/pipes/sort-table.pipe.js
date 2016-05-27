var core_1 = require("angular2/core");
var TaskListSorterPipe = (function () {
    function TaskListSorterPipe() {
    }
    TaskListSorterPipe.prototype.transform = function (collection, args) {
        var column = args[0], direction = args[1];
        if (column == '') {
            return collection;
        }
        collection.sort(function (t1, t2) {
            if (t1[column] > t2[column]) {
                return direction;
            }
            if (t1[column] < t2[column]) {
                return -1 * direction;
            }
            return 0;
        });
        return collection;
    };
    TaskListSorterPipe = __decorate([
        core_1.Pipe({ name: 'tasksort' }), 
        __metadata('design:paramtypes', [])
    ], TaskListSorterPipe);
    return TaskListSorterPipe;
})();
exports.TaskListSorterPipe = TaskListSorterPipe;
//# sourceMappingURL=sort-table.pipe.js.map