var core_1 = require("angular2/core");
/**
 * Filter task list with selected.
 */
var TaskListFilterPipe = (function () {
    function TaskListFilterPipe() {
    }
    TaskListFilterPipe.prototype.transform = function (value, args) {
        var selectedStatus = args[0], selectedType = args[1];
        selectedStatus = selectedStatus == "null" ? null : selectedStatus;
        selectedType = selectedType == "null" ? null : +selectedType;
        return value.filter(function (item) {
            if (selectedStatus && item.status != selectedStatus) {
                return false;
            }
            if (selectedType && item.type_id != selectedType) {
                return false;
            }
            return true;
        });
    };
    TaskListFilterPipe = __decorate([
        core_1.Pipe({ name: 'taskfilter' }), 
        __metadata('design:paramtypes', [])
    ], TaskListFilterPipe);
    return TaskListFilterPipe;
})();
exports.TaskListFilterPipe = TaskListFilterPipe;
//# sourceMappingURL=filter-task-list.pipe.js.map