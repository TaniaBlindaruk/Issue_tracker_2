$(function () {

    function Task(title, description, estimation, status) {
        this.title = ko.observable(title + "T");
        this.description = ko.observable(description);
        this.estimation = ko.observable(estimation);
        this.type = 1;
        this.status = ko.observable(status);
        this.isEdit = ko.observable(false);

    }

    function Bug(title, description, estimation, status) {
        this.title = ko.observable(title + "B");
        this.description = ko.observable(description);
        this.estimation = ko.observable(estimation);
        this.type = 2;
        this.status = ko.observable(status);
        this.isEdit = ko.observable(false);
    }

    function Enhacement(title, description, estimation, status) {
        this.title = ko.observable(title + "E");
        this.description = ko.observable(description);
        this.estimation = ko.observable(estimation);
        this.type = 3;
        this.status = ko.observable(status);
        this.isEdit = ko.observable(false);
    }
    type = ko.observable("");


    function ViewModel() {
        var view = this;
        this.tasks = ko.observableArray();


        this.titleTask = ko.observable("");
        this.descriptionTask = ko.observable("");
        this.estimationTask = ko.observable("");
        this.statusTask = ko.observable("");

        //var titleBug = ko.observable("");
        //var descriptionBug = ko.observable("");
        //var estimationBug = ko.observable("");
        //var statusBug = ko.observable("");

        //var titleEnhancement = ko.observable("");
        //var descriptionEnhancement = ko.observable("");
        //var estimationEnhancement = ko.observable("");
        //var statusEnhancement = ko.observable("");

        view.type = ko.observable("");
        view.chosen = ko.observableArray([]);
        view.status = ko.observable("");
        view.what_show = ko.observable("all");


        view.all = function () {
            view.what_show("all");

        };
        view.only_task = function () {
            view.what_show("task");
        };
        view.only_bug = function () {
            view.what_show("bug");
        };
        view.only_enhancement = function () {
            view.what_show("enhancement");
        };


        view.typeTask = function () {
            view.type("Task");

        };
        view.typeBug = function () {
            view.type("Bug");

        };
        view.typeEnhancement = function () {
            view.type("Enhancement");
        };


        view.status_1 = function () {
            view.status("Not started");

        };
        view.status_2 = function () {
            view.status("In progres");
        };
        view.status_3 = function () {
            view.status("Done");
        };

        view.add = function () {
            var task;

            switch (this.type()) {
                case "Task":
                    task = new Task(this.titleTask(), this.descriptionTask(), 0, this.status());
                    break;
                case "Bug":
                    task = new Bug(this.titleTask(), this.descriptionTask(), 0, this.status());
                    break;
                case "Enhancement":
                    task = new Enhacement(this.titleTask(), this.descriptionTask(), 0, this.status());
                    break;
            }
            task.edit = function () {
                task.isEdit(true);
            };
            task.save = function () {
                task.isEdit(false);
            };
            view.tasks.push(task)
            view.newTask.title("");
            view.newTask.description("");

        }
        view.remove = function (task) {
            view.tasks.remove(task);
        }

        view.Not_started = ko.computed(function () {
            var result = [];

            for (var i = 0; i < view.tasks().length; i++) {
                if (view.tasks()[i].status() === "Not started") {
                    switch (view.what_show()) {
                        case "task":
                            if (view.tasks()[i].type === 1)
                                result.push(view.tasks()[i]);
                            break;
                        case "bug":
                            if (view.tasks()[i].type === 2)
                                result.push(view.tasks()[i]);
                            break;
                        case "enhancement":
                            if (view.tasks()[i].type === 3)
                                result.push(view.tasks()[i]);
                            break;
                        case "all":
                            result.push(view.tasks()[i]);
                            break;

                    }
                }
            }
            return result;
        });

        view.In_progress = ko.computed(function () {
            var result = [];

            for (var i = 0; i < view.tasks().length; i++) {
                if (view.tasks()[i].status() === "In progres") {
                    switch (view.what_show()) {
                        case "task":
                            if (view.tasks()[i].type === 1)
                                result.push(view.tasks()[i]);
                            break;
                        case "bug":
                            if (view.tasks()[i].type === 2)
                                result.push(view.tasks()[i]);
                            break;
                        case "enhancement":
                            if (view.tasks()[i].type === 3)
                                result.push(view.tasks()[i]);
                            break;
                        case "all":
                            result.push(view.tasks()[i]);
                            break;

                    }
                }
            }
            return result;
        });
        view.Done = ko.computed(function () {
            var result = [];
            for (var i = 0; i < view.tasks().length; i++) {
                if (view.tasks()[i].status() === "Done") {
                    switch (view.what_show()) {
                        case "task":
                            if (view.tasks()[i].type === 1)
                                result.push(view.tasks()[i]);
                            break;
                        case "bug":
                            if (view.tasks()[i].type === 2)
                                result.push(view.tasks()[i]);
                            break;
                        case "enhancement":
                            if (view.tasks()[i].type === 3)
                                result.push(view.tasks()[i]);
                            break;
                        case "all":
                            result.push(view.tasks()[i]);
                            break;

                    }
                }
            }
            return result;
        });


    };

    ko.applyBindings(new ViewModel());
    //$("#s_done")
    //  .change(function () {
    //      var str = "";
    //      $("#s_done option:selected").each(function () {
    //          str += $(this).text() + " ";
    //          ViewModel.chosen.push(str);
    //      });
    //      $("#11").text(str);
    //  });
    //$("#s_not")
    //  .change(function () {
    //      var str = "";
    //      $("#s_not option:selected").each(function () {
    //          str += $(this).text() + " ";
    //      });
    //      $("#33").text(str);
    //  });


});

//var ViewModel = function (first, last) {
//    this.firstName = ko.observable(first);
//    this.lastName = ko.observable(last);

//    this.fullName = ko.pureComputed(function () {
//        // Knockout tracks dependencies automatically. It knows that fullName depends on firstName and lastName, because these get called when evaluating fullName.
//        return this.firstName() + " " + this.lastName();
//    }, this);
//};

//ko.applyBindings(new ViewModel("Planet", "Earth"));

//function WebmailViewModel() {
//    // Data
//    var self = this;
//    self.folders = ['Inbox', 'Archive', 'Sent', 'Spam'];
//    self.chosenFolderId = ko.observable();
//    self.chosenFolderData = ko.observable();
//    self.chosenMailData = ko.observable();

//    // Behaviours
//    self.goToFolder = function (folder) {
//        self.chosenFolderId(folder);
//        self.chosenMailData(null); // Stop showing a mail
//        $.get("/mail", { folder: folder }, self.chosenFolderData);
//    };
//    self.goToFolder('Inbox');
//    self.goToMail = function (mail) {
//        self.chosenFolderId(mail.folder);
//        self.chosenFolderData(null); // Stop showing a folder
//        $.get("/mail", { mailId: mail.id }, self.chosenMailData);
//    };
//};

//ko.applyBindings(new WebmailViewModel());