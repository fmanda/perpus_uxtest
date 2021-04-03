var config_file_name = 'config.json';
if (process.argv[2]) {
  if (process.argv[2] != null){
  	 config_file_name = process.argv[2];
   }
}


var cfg = require('./' + config_file_name);

// const puppeteer = require('puppeteer')
const puppeteer = require('puppeteer-extra')
const StealthPlugin = require('puppeteer-extra-plugin-stealth')
puppeteer.use(StealthPlugin())

const perpus = require('./module/perpus')
const utils = require('./module/utils')
var dateFormat = require('dateformat');

console.log('\x1b[30m');
console.log('\x1b[43m******************************************************');
console.log('*********** Sponsor : tokopedia.com/fmanda  **********');
console.log('******************************************************');
console.log('\x1b[0m');
console.log('Your Config.json : ');
console.log(JSON.stringify(cfg));

// var loop = 0;
//
const headcsv = [
  {id: 'startTime', title: 'startTime'},
  {id: 'iteration', title: 'iteration'},
  {id: 'sLanding', title: 'slanding'},
  {id: 'tLanding', title: 'tlanding'},
  {id: 'sLogin', title: 'slogin'},
  {id: 'tLogin', title: 'tlogin'},
  {id: 'sReturn', title: 'sReturn'},
  {id: 'tReturn', title: 'tReturn'},
  {id: 'sSearch', title: 'sSearch'},
  {id: 'tSearch', title: 'tSearch'},
  {id: 'sRead', title: 'sRead'},
  {id: 'tRead', title: 'tRead'},
  {id: 'tTotal', title: 'tTotal'},
];

const dataheadcsv = {
  startTime: 'startTime',
  iteration: 'iteration',
  sLanding: 'sLanding',
  tLanding: 'tLanding',
  sLogin: 'sLogin',
  tLogin: 'tLogin',
  sReturn: 'sReturn',
  tReturn: 'tReturn',
  sSearch: 'sSearch',
  tSearch: 'tSearch',
  sRead: 'sRead',
  tRead: 'tRead',
  tTotal: 'tTotal'
};

var logname = cfg.pc + '_' + cfg.user + '_' + dateFormat(new Date(), "yyyymmdd") +  '.csv';

const dt = new Date();
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const csvWriter = createCsvWriter({
  path:  logname,
  header: headcsv,
  append: true
});

//write header
csvWriter.writeRecords([dataheadcsv]).then(()=> utils.log('Header CSV Appended'));

const maxloop = cfg.maxloop;

(async () => {
  var loop = 0
  try{
    while (loop < maxloop){
      await loop++;
      await test(loop);
    }
  } catch(err){
    utils.error(err);
  }
})()



async function test(intloop){
  try {
  	// (async () => {
      const browser = await puppeteer.launch({
        headless: false,  /*userDataDir: newchromeprofile,*/
	executablePath: 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
        defaultViewport: null,
        args: ['--start-maximized']
        //,args:['--proxy-server=' + cfg.argproxy]
      })

      var data = {
        startTime : null,
        iteration : intloop,
        sLanding : 'failed',
        tLanding : null,
        sLogin : 'failed',
        tLogin : null,
        sReturn : 'failed',
        tReturn : null,
        sSearch : 'failed',
        tSearch : null,
        sRead : 'failed',
        tRead : null,
        tTotal : 0,
      }

      try{
        utils.infoheader('Starting Test #' + intloop.toString());

    		const page = await browser.newPage()
    		await page.setViewport({ width: 0, height: 0 });

        var tm = new Date();
        utils.log(cfg.baseurl + '/' + cfg.user);
        await page.goto( cfg.baseurl + '/' + cfg.user, { waitUntil: 'networkidle2' });
        data.sLanding = 'success';
        data.tLanding = (new Date) - tm;

        utils.log('Login with User : ' + cfg.user);
        tm = new Date();
        data.startTime = tm;

        await perpus.dologin(page, cfg);

        data.sLogin = 'success';
        data.tLogin = (new Date) - tm;


        // await page.goto( cfg.baseurl + '/pustaka' , { waitUntil: 'networkidle2' });

        tm = new Date();
        await perpus.doReturnAll(page, cfg.baseurl + '/buku/peminjaman_saya');
        data.sReturn = 'success';
        data.tReturn = (new Date) - tm;


        tm = new Date();
        for (var product of cfg.products){
          // reset baseurl
          try{
            utils.log('Searching Product : ' + product.keyword);
            await page.goto( cfg.baseurl + '/pustaka', { waitUntil: 'networkidle2' });
            await perpus.doSearch(page, product.keyword);
          } catch(err) {
            utils.error(err.message);
          }
        }
        data.sSearch = 'success';
        data.tSearch = ((new Date) - tm) / cfg.products.length;

        tm = new Date();
        //go to base url first, idk we can direct access coll url
        utils.log('Read 1st book from collection');
        await perpus.doReadCollection(page, cfg.baseurl + '/buku/peminjaman_saya');
        data.tRead = (new Date) - tm;

      } catch(err) {
        utils.error(err.message);
      } finally {
        utils.success('closing browser ' + intloop.toString());
        await browser.close();

        tm = new Date();
        // data.endTime = tm;
        data.tTotal = tm - data.startTime;

        //dateFormat
        data.startTime = dateFormat(data.startTime, "yyyy-mm-dd h:MM:ss");
        await csvWriter.writeRecords([data]).then(()=> utils.log('The CSV file was written successfully'));

      }
  	// })()
  } catch (err) {
  	console.error(err)
  }
}


function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
