function saveType(type, self) {


    var obj = new Object();
    obj.tasks = type.tasks;
    
    //debugger;
    var str = JSON.stringify(obj);
   
    var options = {
        url: 'https://api.parse.com/1/classes/type/',
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
           
            //debugger;
            var a = response;
            type.id=a.objectId;
            type.createdAt=a.createdAt;
            self.arraTask.push(type);
            //task.id(response.objectId);

        },
        error: function () {
            $(".data_refreshing_overlay").css('display', 'none');
            $("div .spinner").css('display', 'none');
            
        }
    };
    $.ajax(options);
}