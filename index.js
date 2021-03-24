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

console.log('\x1b[30m');
console.log('\x1b[43m******************************************************');
console.log('*********** Sponsor : tokopedia.com/fmanda  **********');
console.log('******************************************************');
console.log('\x1b[0m');
console.log('Your Config.json : ');
console.log(JSON.stringify(cfg));


try {
	(async () => {
    console.log('Starting...');
    console.log('');

		const browser = await puppeteer.launch({
			headless: false,  /*userDataDir: newchromeprofile,executablePath: chromepath*/
      defaultViewport: null,
      args: ['--start-maximized']
      //,args:['--proxy-server=' + cfg.argproxy]
		})
		const page = await browser.newPage()
		await page.setViewport({ width: 0, height: 0 });

    await perpus.dologin(page, cfg);

    // await page.goto( cfg.baseurl + '/pustaka' , { waitUntil: 'networkidle2' });

    // await perpus.doReturnAll(page);

    for (var product of cfg.products){
      // reset baseurl
      // await page.goto( cfg.baseurl + '/pustaka', { waitUntil: 'networkidle2' });
      // await perpus.doSearch(page, product.keyword);
    }

    //go to base url first, idk we can direct access coll url    
    await perpus.doReadCollection(page, cfg.baseurl + '/buku/peminjaman_saya');
	})()
} catch (err) {
	console.error(err)
}


function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
