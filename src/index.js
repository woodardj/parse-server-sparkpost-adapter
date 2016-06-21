import SparkPost from 'sparkpost';

let SparkPostAdapter = mailOptions => {
  if (!mailOptions || (!mailOptions.apiKey && !mailOptions.username && !mailOptions.password)){
    throw 'SparkPostAdapter requires an apiKey or username / password';
  }
  if (!mailOptions.fromAddress){
    throw 'SparkPostAdapter requires fromAddress';
  }
  let sparkpost = (mailOptions.apiKey ? SparkPost(mailOptions.apiKey) : SparkPost(mailOptions.username, mailOptions.password));

  let sendMail = ({to, subject, text}) => {
    return new Promise((resolve, reject) => {
      sparkpost.transmissions.send({
        transmissionBody: {
          content: {
            from: mailOptions.fromAddress,
            subject: subject,
            html:text
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
