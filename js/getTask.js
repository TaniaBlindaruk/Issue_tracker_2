
//function getTasks(self) {
//    var options = {
//        url: 'https://api.parse.com/1/classes/test/',
//        type: 'GET',
//        contentType: 'application/json',
//        beforeSend: function (request) {
//            request.setRequestHeader('X-Parse-Application-Id', 'JF1hR0742iYPfXL22m1hrwRhozF5wmKl9xuYT7z9');
//            request.setRequestHeader('X-Parse-REST-API-Key', 'QeU0djV32iUCzG2u5O8jv459lLk3y1EZP3ITav2O');
//        },
//        success: function (response) {
//            alert('ok.get');
//            if (response && response.results && response.results.length) {
//                alert("get");

//                var mappedTasks = [];
//                for (var i = 0; i < response.results.length; i++) {
//                    alert(response.results[i].title);
//                    mappedTasks.push(new Task(response.results[i].title))
//                }
//                console.log(mappedTasks);
//                self.tasks(mappedTasks);
//            }
//        },

//        error: function () {
//            alert('not ok');
//        }
//    };
//    $.ajax(options);
//};