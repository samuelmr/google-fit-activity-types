const fs = require('fs');
const jsdom = require("jsdom");

const url = "https://developers.google.com/fit/rest/v1/reference/activity-types";
jsdom.env(
  url,
  ["http://code.jquery.com/jquery.js"],
  function (err, window) {
    let activityTypes = [];
    window.$("table > tbody  > tr").each(function() {
      $tr = window.$(this);
      let activity = '';
      $tr.children("td").each(function(i, td) {
        if (i == 0) {
          activity = window.$(td).text().replace(/\*/, '');
        }
        else {
          let index = parseInt(window.$(td).text())
          activityTypes[index] = activity;
        }
      });
    });
    let len = activityTypes.length;
    if (len > 0) {
      let str = 'module.exports = ' + JSON.stringify(activityTypes, null, 1);
      let fn = 'index.js';
      fs.writeFile(fn, str, function(err, success) {
        if (err) {
          throw err;
        }
        console.log('File', fn, 'created with', len, 'activity types.');
      });
    }
    else {
      console.error('No activity types found from ' + url);
    }
  }
);
