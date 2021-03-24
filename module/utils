var Reset = '\x1b[0m'
var Bright = '\x1b[1m'
var Dim = '\x1b[2m'
var Underscore = '\x1b[4m'
var Blink = '\x1b[5m'
var Reverse = '\x1b[7m'
var Hidden = '\x1b[8m'

var FgBlack = '\x1b[30m'
var FgRed = '\x1b[31m'
var FgGreen = '\x1b[32m'
var FgYellow = '\x1b[33m'
var FgBlue = '\x1b[34m'
var FgMagenta = '\x1b[35m'
var FgCyan = '\x1b[36m'
var FgWhite = '\x1b[97m'
var FgGray = '\x1b[90m'

var BgBlack = '\x1b[40m'
var BgRed = '\x1b[41m'
var BgGreen = '\x1b[42m'
var BgYellow = '\x1b[43m'
var BgBlue = '\x1b[44m'
var BgMagenta = '\x1b[45m'
var BgCyan = '\x1b[46m'
var BgWhite = '\x1b[47m'



exports.error = function (msg) {
  msg = FgMagenta + '[' + new Date().toLocaleTimeString() + '] ' +  FgRed + msg + Reset;
  console.log(msg);
  console.log('');
}

exports.warning = function (msg) {
  msg = FgMagenta + '[' + new Date().toLocaleTimeString() + '] ' +  FgYellow + msg + Reset;
  console.log(msg);
  console.log('');
}

exports.success = function (msg) {
  msg = FgMagenta + '[' + new Date().toLocaleTimeString() + '] ' +  FgGreen + msg + Reset;
  console.log(msg);
  console.log('');
}

exports.infoheader = function (msg) {
  msg = FgMagenta + '[' + new Date().toLocaleTimeString() + '] ' +  FgYellow + Underscore + msg + Reset + '';
  console.log(msg);
  console.log('');
}

exports.log = function (msg) {
  msg = FgMagenta + '[' + new Date().toLocaleTimeString() + '] ' + Reset + msg ;
  console.log(msg);
  console.log('');
}


exports.showPrice = function (market, tag, name, price, link) {
  if (tag != '') tag = Reset + FgGreen + ' **' + tag;

  msg = FgMagenta + '[' + new Date().toLocaleTimeString() + '] '
    + FgCyan + name + ' ' + Reset
    + BgGreen + FgBlack +  market + Reset
    + BgYellow + FgBlack + ' '+ price + ' ' + Reset
    + tag
    + Reset;
  console.log(msg);

  msg = FgBlack + '[' + new Date().toLocaleTimeString() + '] ' + FgGray
    + link
    + Reset;
  console.log(msg);
  console.log('');
}

exports.showPrice2 = function (market, tag, name, price, link) {
  if (tag != '') tag = Reset + FgGreen + ' **' + tag;

  msg = FgMagenta + '[' + new Date().toLocaleTimeString() + '] '
    + FgCyan + name + ' ' + Reset
    + BgMagenta + FgBlack +  market + Reset
    + BgYellow + FgBlack + ' '+ price + ' ' + Reset
    + tag
    + Reset;
  console.log(msg);

  msg = FgBlack + '[' + new Date().toLocaleTimeString() + '] ' + FgGray
    + link
    + Reset;
  console.log(msg);
  console.log('');
}

exports.showNotFound = function (market, keyword, startprice, endprice) {
  msg = FgRed + '[' + new Date().toLocaleTimeString() + '] '
    + BgRed + FgWhite + ' NOT-FOUND '
    + Reset + ' ' + FgRed + keyword + ', price : '
    + startprice.toString() + '-' + endprice.toString() + ' '
    + BgRed + FgBlack + market
    + Reset;
  console.log(msg);
  console.log('');
}


async function doAutoScroll(page){
    await page.evaluate(async () => {
        await new Promise((resolve, reject) => {
            var totalHeight = 0;
            var distance = 500;
            var timer = setInterval(() => {
                var scrollHeight = document.body.scrollHeight;
                window.scrollBy(0, distance);
                totalHeight += distance;

                if(totalHeight >= scrollHeight){
                    clearInterval(timer);
                    resolve();
                }
            }, 100);
        });
    });
}


module.exports.autoScroll = doAutoScroll;
