// var SparkPost = ;

var SparkPost = require('sparkpost');

var SparkPostAdapter = mailOptions => {
  if (!mailOptions || !mailOptions.apiKey){
    throw 'SparkPostAdapter requires an apiKey';
  }
  if (!mailOptions.fromAddress){
    throw 'SparkPostAdapter requires fromAddress';
  }

  var sparkpost = new SparkPost(mailOptions.apiKey);

  var sendMail = ({to, subject, text}) => {
    return new Promise((resolve, reject) => {
      sparkpost.transmissions.send({
        transmissionBody: {
          content: {
            from: mailOptions.fromAddress,
            subject: subject,
            text:text
          },
          options: {
            open_tracking: false,
            click_tracking: false,
          },
          recipients: [
            {address: to}
          ]
        }
      }, function(err, json) {
        if (err) {
           reject(err);
        }
        resolve(json);
      });
    });
  }

  return Object.freeze({
      sendMail: sendMail
  });
}

module.exports = SparkPostAdapter
