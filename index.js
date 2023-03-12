const {buildResponse} = require('./dist/turn-form.js');


exports.handler = async function (event, context, callback) {
//   const base64 = event.rawPath.substring(1);
//   const baseUrl = 'https://' + event.headers.host + '/';
  callback(null, buildResponse(event));
};
