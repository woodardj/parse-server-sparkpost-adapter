'use strict';

var _sparkpost = require('sparkpost');

var _sparkpost2 = _interopRequireDefault(_sparkpost);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SparkPostAdapter = function SparkPostAdapter(mailOptions) {
  if (!mailOptions || !mailOptions.apiKey && !mailOptions.username && !mailOptions.password) {
    throw 'SparkPostAdapter requires an apiKey or username / password';
  }
  if (!mailOptions.fromAddress) {
    throw 'SparkPostAdapter requires fromAddress';
  }
  var sparkpost = mailOptions.apiKey ? new _sparkpost2.default(mailOptions.apiKey) : new _sparkpost2.default(mailOptions.username, mailOptions.password);

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
            html: text
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