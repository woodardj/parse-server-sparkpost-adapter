'use strict';

// var SparkPost = ;

var SparkPost = require('sparkpost');

var SparkPostAdapter = function SparkPostAdapter(mailOptions) {
  if (!mailOptions || !mailOptions.apiKey) {
    throw 'SparkPostAdapter requires an apiKey';
  }
  if (!mailOptions.fromAddress) {
    throw 'SparkPostAdapter requires fromAddress';
  }

  var sparkpost = new SparkPost(mailOptions.apiKey);

  var sendMail = function sendMail(_ref) {
    var to = _ref.to;
    var subject = _ref.subject;
    var text = _ref.text;

    return new Promise(function (resolve, reject) {
      sparkpost.transmissions.send({
        transmissionBody: {
          content: {
            from: mailOptions.fromAddress,
            subject: subject,
            text: text
          },
          options: {
            open_tracking: false,
            click_tracking: false
          },
          recipients: [{ address: to }]
        }
      }, function (err, json) {
        if (err) {
          reject(err);
        }
        resolve(json);
      });
    });
  };

  return Object.freeze({
    sendMail: sendMail
  });
};

module.exports = SparkPostAdapter;