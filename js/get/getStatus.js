
function getStatus(self) {
    var options = {
        url: 'https://api.parse.com/1/classes/status/',
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
                    mappedTasks.push(new Status(a.active_tasks, a.name_status, a.objectId));
                }
                console.log(mappedTasks);

                self.arrayStatus(mappedTasks);
                console.log(self.arrayStatus());
            }
        },

        error: function () {
            $(".data_refreshing_overlay").css('display', 'none');
            $("div .spinner").css('display', 'none');
       
        }
    };
    $.ajax(options);
};