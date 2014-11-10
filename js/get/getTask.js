
function getTasks(self) {
    var options = {
        url: 'https://api.parse.com/1/classes/task1/',
        type: 'GET',
        contentType: 'application/json',
        beforeSend: function (request) {
            $(".data_refreshing_overlay").css('display', 'block');
            $("div .spinner").css('display', 'block');
            request.setRequestHeader('X-Parse-Application-Id', 'JF1hR0742iYPfXL22m1hrwRhozF5wmKl9xuYT7z9');
            request.setRequestHeader('X-Parse-REST-API-Key', 'QeU0djV32iUCzG2u5O8jv459lLk3y1EZP3ITav2O');
        },
        success: function (response) {
            $(".data_refreshing_overlay").css('display', 'none');
            $("div .spinner").css('display', 'none');
     
            if (response && response.results && response.results.length) {
         
                var mappedTasks = [];
                for (var i = 0; i < response.results.length; i++) {
                    var a = response.results[i];
                    var b = new Task(a.active_tasks, a.task_title, a.task_description, a.task_estimation, a.task_status, 1, a.objectId);
                    b.createdAt(a.createdAt);
                    b.updatedAt(a.updatedAt);
                    mappedTasks.push(b);
               
                }
                console.log(mappedTasks);
                self.arrayTask(mappedTasks);
            }
        },

        error: function () {
            $(".data_refreshing_overlay").css('display', 'none');
            $("div .spinner").css('display', 'none');
          
        }
    };
    $.ajax(options);
};