function saveTask(task,self) {
  

    var obj = new Object();
    obj.active_tasks = task.active_tasks();
    obj.task_title = task.task_title();
    obj.task_description = task.task_description();
    obj.task_estimation = task.task_estimation();
    obj.task_status = task.task_status();
    var str = JSON.stringify(obj);

    var options = {
        url: 'https://api.parse.com/1/classes/task1/',
        type: 'POST',
        data: str,
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
          
          
            var a = response;
            task.id(a.objectId);
            task.createdAt (a.createdAt);
            self.arrayTask.push(task);
            //task.id(response.objectId);
            
        },
        error: function () {
            $(".data_refreshing_overlay").css('display', 'none');
            $("div .spinner").css('display', 'none');
        
        }
    };
    $.ajax(options);
}