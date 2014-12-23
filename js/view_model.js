function Task(active_tasks, task_title, task_description, task_estimation, task_status, boolTask, id) {
    self = this;
    self.id = ko.observable(id);
    self.active_tasks = ko.observable(active_tasks);
    self.task_title = ko.observable(task_title);
    self.task_description = ko.observable(task_description);
    self.task_estimation = ko.observable(task_estimation);
    self.task_status = ko.observable(task_status);
    self.boolTask = ko.observable(boolTask);
    self.createdAt = ko.observable();
    self.updatedAt = ko.observable();
}
function Status(active_tasks, name_status,id) {
    self = this;
    self.id = id;
    self.active_tasks = active_tasks;
    self.name_status = name_status;
}
function Tasks(tasks,id) {
    this.tasks = tasks;
    self.id = id;
}

function AppViewModel() {
    var self = this;
    /*Тип таска*/
    self.tasks = ko.observable("");
    /*це для того , що б визначити на сторінці якого таску на даний момент перебуває людина,
    * змінюється при натиску на якийсь Заголовок в типах таску*/
    self.active_tasks = ko.observable("");
    /*масив типів тасок*/
    self.arraTask = ko.observableArray([]);
    /*задає чи потрібно показувати вікно редагування чи просто задачу*/
    self.boolTask = ko.observable(true);
    /*Заголовок задачі*/
    self.task_title = ko.observable("");
    /*Опис задачі*/
    self.task_description = ko.observable("");
    /*Оцінка задачі*/
    self.task_estimation = ko.observable("");
    /*масив задач*/
    self.arrayTask = ko.observableArray([]);
    /*статус задачі*/
    self.task_status = ko.observable("");
    self.this_status = ko.observable("");

    self.arra = ko.observableArray(["111111wsqaedsaasd", 2, 3, 4]);
    /*спрацьовує при нажаті на заголовок типу таска, і змінює active_task*/
    getType(self);
    getStatus(self);
    getTasks(this);
    self.print_task = function (seat) {
        self.active_tasks(seat.tasks);
        self.boolTypeTasks(true);
    }
    /*додає тип таска*/
    self.addTask = function () {
        for (var i = 0; i < self.arraTask().length; ++i) {
            if (self.tasks() == self.arraTask()[i].tasks) {
                self.tasks(self.tasks() + "(1)");
                i = -1;
            }
        }
        /*а ось це додавання*/
        if (self.tasks() != 0) {

            saveType(new Tasks(self.tasks()), this);
            saveStatus(new Status(self.tasks(), "Not Started"), this);
            self.tasks("");

        }
        //
    }

    /*задає, що буде показуватись:
    * -типи тасків
    * -чи вже задачі*/
    self.boolTypeTasks = ko.observable(false);
    /*функція яка задає при нажаті на заголовок issue_tracker, те що будуть показуватись типи тасків*/
    self.true_bool = function () {
        self.boolTypeTasks(true);
    }

    /*Імья статуса*/
    self.name_status = ko.observable("");
    /*масив статусів, зберігає  активний тип таску, тобто тей тип при якому був створений статус
    * і назву статусу*/
    self.arrayStatus = ko.observableArray([]);
    /*додає статуси в маисв*/
    self.push_status = function () {
        debugger;
        for (var i = 0; i < self.arrayStatus().length; ++i) {
            if (self.active_tasks() === self.arrayStatus()[i].active_tasks && self.arrayStatus()[i].name_status === self.name_status()) {
                self.name_status(self.name_status() + "(1)");

                i = -1;

            }
        }
        saveStatus(new Status(self.active_tasks(), self.name_status()), this);
        self.name_status("");
    }
    self.hello =function(status){
        return status+"+Hello";
    }
    /*повертає вибірку статусів активного таску*/
    self.return_status_task = ko.computed(function () {
        var result = [];
        for (var i = 0; i < self.arrayStatus().length; i++) {
            if (self.arrayStatus()[i].active_tasks === self.active_tasks()) {
                result.push(self.arrayStatus()[i]);
            }
        }
        return result;
    });


    //////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////

    /*доає задачу в  масив задач*/
    self.push_Task = function () {
        //debugger;
        self.task_status($("#status_ltis :selected").text());
        var a = new Task(self.active_tasks(), self.task_title(), self.task_description(),
            self.task_estimation(), self.task_status(), 1);

        saveTask(a, self);
        self.task_title("");
        self.task_description("");
        self.task_estimation("");
        self.task_status("");
    }
    /*вибірка задач, за активним типом задачі*/
    self.return_task_some_status_tasks = ko.computed(function () {
        //debugger;
        var result = [];
        //debugger;
        for (var i = 0; i < self.arrayTask().length; i++) {
            if (self.arrayTask()[i].active_tasks() === self.active_tasks()) {
                result.push(self.arrayTask()[i]);
            }
        }
        return result;
    });
    /*тут ця переміна відповідає за те чи можна редагувати чи ні.... але вона не рообить =_=*/
    self.trueEdit = ko.observable(true);
    /* видаляє задачу*/
    self.remove_task = function (seat) {
        deleteTaskById(seat.id());
        self.arrayTask.remove(seat);

    }
    /*редагує
    * З.І: просто змінює стан self.boolTask = ko.observable(true);*/
    self.last_status = ko.observable("");
    self.edit_task = function (seat) {
        if (seat.boolTask() == 0) {
            updateTask(seat, self);
        };
        debugger;
        seat.boolTask(!seat.boolTask());

        self.trueEdit(false);


    };
    self.save_task = function (seat) {
        if (seat.boolTask() == 0) {
            updateTask(seat, self);
        };
        seat.boolTask(!seat.boolTask());
        seat.task_status(self.last_status());
        updateTask(seat,self);
        debugger;
        self.trueEdit(true);
    };
;

    self.same_task = function (status) {
        //debugger;
        var result = [];
        //debugger;
        for (var i = 0; i < self.arrayTask().length; i++) {
            if (self.arrayTask()[i].task_status() === status && self.arrayTask()[i].active_tasks() == self.active_tasks()) {
                result.push(self.arrayTask()[i]);
            }
        }
        return result;
    }
    /*видаляє тип задачу, параленьно з цим проходить по масиву статусів і видаляє всі статуси які були привязані до цього тпу задач
    * і видаляє задачі які були привязані до цього типу задач*/
    self.delete_tasks = function ()
    {

        for (var i = 0; i < self.arrayTask().length; ++i) {
            if (self.arrayTask()[i].active_tasks() == self.active_tasks()) {
                deleteTaskById(self.arrayTask()[i].id());
                self.arrayTask.remove(self.arrayTask()[i]);
                --i;
            }
        }
        for (var i = 0; i < self.arrayStatus().length; ++i) {
            if (self.arrayStatus()[i].active_tasks == self.active_tasks()) {
                deleteStatusById(self.arrayStatus()[i].id);
                self.arrayStatus.remove(self.arrayStatus()[i]);
                --i;
            }
        }
        for (var i = 0; i < self.arraTask().length; ++i) {
            if (self.arraTask()[i].tasks == self.active_tasks()) {
                deleteTypeById(self.arraTask()[i].id);
                self.arraTask.remove(self.arraTask()[i]);
                break;
            }
        }

        self.boolTypeTasks(false);
    }
    self.delete_status = function(seat){
        debugger;
        for (var i = 0; i < self.arrayTask().length; ++i) {
            if (self.arrayTask()[i].task_status() == seat.name_status && self.arrayTask()[i].active_tasks()==self.active_tasks()) {
                deleteTaskById(self.arrayTask()[i].id());
                self.arrayTask.remove(self.arrayTask()[i]);
                --i;
            }
        }

                deleteStatusById(seat.id);
                self.arrayStatus.remove(seat);

    }

}


// Activates knockout.js
$(document).ready(function () {
    //debugger;
    ko.applyBindings(new AppViewModel());
    $(window).resize(function () {
        $("#size").text($(window).width() + "  " + $(window).height());
    });
    $('#hide').on("click", function () {
        var a = $('.add_task');
        a.toggleClass("master1");
        if (a.hasClass("master1"))
            (a.animate(
                {
                    width: "toggle",
                    height: "toggle"
                }, 500))
        else
            (a.animate(
                {
                    width: "toggle",
                    height: "toggle"
                }, 500));
    })
});
