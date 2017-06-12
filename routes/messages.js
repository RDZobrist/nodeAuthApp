var express = require('express');
var router = express.Router();

// Get Messages Page
router.get('/messages', ensureAuthenticated, function(req, res){
	res.render('messages');
});

function ensureAuthenticated(req, res, next){
	if(req.isAuthenticated()){
		return next();
	} else {
		//req.flash('error_msg','You are not logged in');
		res.redirect('/users/login');
	}
};

var accountSid = 'AC956c63785ee39b3f5598ea8999b4b088'; // Your Account SID from www.twilio.com/console
var authToken = '133bf3c4ba8daa85b596b93d35fe5727'; // Your Auth Token from www.twilio.com/console
var messageButton = document.getElementById('schedule-msg-button');

var twilio = require('twilio');
var client = new twilio(accountSid, authToken);

// var mongoose   = require('mongoose');
// mongoose.connect('mongodb://node:node@novus.modulusmongo.net:27017/Iganiq8o');

//phone numbers for testing

// var Drew = '+14803109306'
// var Rob = '+14805289474'


//if chron iformation is left out of the route then it will execute the message every minute on the minute
router.get('/remind/:number/:message', function(req, res) {
     var j = schedule.scheduleJob('0 * * * * *', function() {
          var destination = '*' + req.params.number;
          var message = String(req.params.message);
          console.log("this is what was sent " + message + " and this is who it was sent to: " + destination);

          client.messages.create({
               body: message,
               to: destination, //  Text this number
               from: '+14803729323' // From a valid Twilio number
          })
     })
});

//provide phone numberto be sent to message and chron fields
router.get('/remind/:number/:message/:chrS/:chrM/:chrH/:chrD/:chrMo/:chrDoW', function(req, res) {
     var j = schedule.scheduleJob('' + req.params.chrS + ' ' + //chron second value
          req.params.chrM + ' ' + //chron minute value
          req.params.chrH + ' ' + //chron Hour value
          req.params.chrD + ' ' + //chron Day value
          req.params.chrMo + ' ' + //chron month value
          req.params.chrDoW + '',
          function() { //chron day of week value (doesnt work as of now i believe)
               var destination = '*' + req.params.number;
               var message = String(req.params.message);
               console.log("this is what was sent " + message + " and this is who it was sent to: " + destination);

               client.messages.create({
                    body: message,
                    to: destination, //  Text this number
                    from: '+14803729323' // From a valid Twilio number
               })
          })
});

var setPhone = function(pNumber) {
     localStorage.clear();
     localStorage.setItem("phone", pNumber);
};
messageButton.addEventListener('click', e =>{ 
    
        alert("Data: " + data + "\nStatus: " + status);
        event.preventDefault();
        var smsMessage = $("#message-input").val();
                    var dateMonth = $("#date-input").val().split("-");
                    var cTime = $("#time-input").val().split(":");      
                    var date = dateMonth[2];
                    var month = dateMonth[1];
                    var min = cTime[1];
                    var hour = cTime[0];                    
                    queryURL = "http://localhost:8080/api/remind/"+phone+"/" + smsMessage + "/0/" + min + "/" + hour + "/" + date + "/" + month + "/*"
    
    // $.post(queryURL);

    $.ajax({

         url: queryURL,
         // data: myData,
         type: 'POST',
         crossDomain: true,
         dataType: 'jsonp'
         
         
          });
// clear message panel input fields
    $('#message-input').val('');
    $('#time-input').val('');
    $('#date-input').val('');

  });
module.exports = router;