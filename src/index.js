var Tasks = /** @class */ (function () {
    function Tasks() {
        this.$description = document.querySelector('#description-js');
        this.$form = document.querySelector('#form-js');
        this.$tasksView = document.querySelector('#tasksView-js');
        this.$title = document.querySelector('#title');
        this.addEvents();
        this.getTasksLocalStorage();
    }
    Tasks.prototype.getTemplate = function (task) {
        var template = "<div class=\"card-body\">\n        <h2 class=\"card-title h4\">" + task.title + "</h2>\n        <p class=\"card-text\">" + task.description + "</p>\n        <button class=\"btn btn-danger btn-sm deleteTask-js\">Delete</button>\n    </div>";
        return template;
    };
    Tasks.prototype.saveLocalStorage = function (task) {
        if (!localStorage.getItem('tasks')) {
            var tasks = [];
            tasks.push(task);
            localStorage.setItem('tasks', JSON.stringify(tasks));
        }
        else {
            var tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
            tasks.push(task);
            localStorage.setItem('tasks', JSON.stringify(tasks));
        }
    };
    Tasks.prototype.addTask = function (event) {
        var _a, _b, _c, _d;
        event.preventDefault();
        var descriptionValue = (_a = this.$description) === null || _a === void 0 ? void 0 : _a.value;
        var titleValue = (_b = this.$title) === null || _b === void 0 ? void 0 : _b.value;
        var isVoid = descriptionValue !== '' && titleValue !== '';
        if (isVoid) {
            var task = {
                title: titleValue,
                description: descriptionValue
            };
            this.saveLocalStorage(task);
            var divElement = document.createElement('div');
            divElement.classList.add('card', 'mb-3');
            divElement.innerHTML = this.getTemplate(task);
            (_c = this.$tasksView) === null || _c === void 0 ? void 0 : _c.prepend(divElement);
            (_d = this.$form) === null || _d === void 0 ? void 0 : _d.reset();
        }
        else {
            alert('Necesitas agregar datos de la tarea!');
        }
    };
    Tasks.prototype.getTasksLocalStorage = function () {
        var tasks = JSON.parse(localStorage.getItem('tasks') || "[]");
        if (tasks.length) {
            if (!this.$tasksView) {
                throw new Error('Error');
            }
            this.$tasksView.innerHTML = '';
            for (var _i = 0, tasks_1 = tasks; _i < tasks_1.length; _i++) {
                var task = tasks_1[_i];
                var divElement = document.createElement('div');
                divElement.classList.add('card', 'mb-3');
                divElement.innerHTML = this.getTemplate(task);
                this.$tasksView.prepend(divElement);
            }
        }
        ;
    };
    Tasks.prototype.addEvents = function () {
        var _this = this;
        var _a, _b;
        //El evento submit va en el formulario
        (_a = this.$form) === null || _a === void 0 ? void 0 : _a.addEventListener('submit', function (event) { return _this.addTask(event); });
        (_b = this.$tasksView) === null || _b === void 0 ? void 0 : _b.addEventListener('click', function (event) { return _this.deleteTask(event); });
    };
    Tasks.prototype.deleteTask = function (_a) {
        var _b, _c;
        var target = _a.target;
        var isTask = target === null || target === void 0 ? void 0 : target.classList.contains('deleteTask-js');
        var template = "<div class=\"card mb-3\"><div class=\"card-body\"><h2 class=\"card-title\">Lorem, ipsum dolor.</h2><p class=\"card-text\">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab modi deserunt magnam. Perspiciatis quas in laboriosam iure aliquid pariatur possimus?</p><button class=\"btn btn-danger btn-sm deleteTask-js\">Eliminar</button></div></div><div class=\"card mb-3\"><div class=\"card-body\"><h2 class=\"card-title\">Lorem, ipsum dolor.</h2><p class=\"card-text\">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab modi deserunt magnam. Perspiciatis quas in laboriosam iure aliquid pariatur possimus?</p><button class=\"btn btn-danger btn-sm deleteTask-js\">Eliminar</button></div></div>";
        if (isTask) {
            var title = target.parentNode.childNodes[1].innerText;
            (_b = this.$tasksView) === null || _b === void 0 ? void 0 : _b.removeChild(target.parentNode.parentNode);
            this.deleteLocalStorage(title);
        }
        if (((_c = this.$tasksView) === null || _c === void 0 ? void 0 : _c.innerHTML) === '') {
            this.$tasksView.innerHTML = template;
        }
    };
    Tasks.prototype.deleteLocalStorage = function (title) {
        var tasks = JSON.parse(localStorage.getItem('tasks') || "[]");
        for (var i = 0; i < tasks.length; i++) {
            if (tasks[i].title == title) {
                tasks.splice(i, 1);
            }
        }
        localStorage.setItem('tasks', JSON.stringify(tasks));
    };
    return Tasks;
}());
var tasks1 = new Tasks();
