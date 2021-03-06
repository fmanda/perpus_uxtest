// const selector = '[data-testid="divSRPContentProducts"]';
// const selector_prodcut = '[data-testid="divProductWrapper"]';

const utils = require('./utils');


async function dologin(page, cfg){
  try {

    // utils.log(cfg.baseurl + '/' + cfg.user);
    // await page.goto( cfg.baseurl + '/' + cfg.user, { waitUntil: 'networkidle2' });
    // await utils.autoScroll(page);

    var dropdown = await page.waitForSelector('a.nav-link.icon.text-center', {timeout : 10000});
    await dropdown.click();
    await sleep(100);

    var login = await page.waitForXPath("//a[contains(., 'Login')]" ,{timeout : 3000})

		if (login) {
  		try{
        login.click();
        await sleep(100);

        await page.$eval('#username', (el, param) => el.value = param, cfg.user);
        await page.$eval('#password_ja', (el, param) => el.value = param, cfg.password);
        // await page.$eval('#formLogin', form => form.submit());

        // await page.waitFor(100);
        await sleep(100);
        await page.click('#btn_login');

        // var btn = await page.waitForSelector('#btn_login');
        // if (btn) btn.click();
        await page.waitForSelector('i.fe.fe-user');

  		}catch(err){
  			utils.error(err.message);
  		}
    }

  } catch (error) {
    utils.error(error.message);
  }
}

async function doReturnAll(page, url){
  try {
    //back to base url first
    // var borrow = await page.waitForXPath("//a[contains(., 'Peminjaman Saya')]" ,{timeout : 3000});
    // var href = await page.$eval("div.item-card2-icons >a", (elm) => elm.href);
    // await book.click();
    // await utils.log(href);
    await page.goto( url , { waitUntil: 'networkidle2' });
    await page.waitForXPath("//button[contains(., 'Kembalikan')]" ,{timeout : 10000});
    // await borrow.click();
    // await sleep(1000);
    var i = 0;
    while (i<10) {
      try{
        var btn = await page.waitForXPath("//button[contains(., 'Kembalikan')]" ,{timeout : 1000});
        if (!btn) break;
        // await sleep(2000);
        await btn.click();
        await sleep(500);

        var btn = await page.waitForXPath("//button[contains(., 'Ya')]" ,{timeout : 3000});
        await btn.click();
      }catch(err){
        console.log(err);
      }
      i++;
    }

  } catch (error) {
    utils.error(error.message);
  }
}

async function doSearch(page, keyword){
  try {
    //back to base url first
    utils.log('Searching : ' + keyword);

    // version 1, not working in testing domain
    // await page.$eval('#buku', (el, param) => el.value = param, keyword);
    // await page.$eval('#form_search', form => form.submit());
    // await sleep(1000)

    await page.$eval('#buku_cari', (el, param) => el.value = param, keyword);
    await sleep(500);
    await page.type('#buku_cari',String.fromCharCode(13));;

    // not working
    // var btn = await page.$eval("button.btn.ripple", (elm) => elm.href);
    // if (btn) btn.click();

    await sleep(5000);
    await page.waitForSelector('div.tab-content.Marketplace');
    // await utils.autoScroll(page);

    var href = await page.$eval("div.item-card2-icons >a", (elm) => elm.href);

    // await book.click();

    await utils.log(href);
    await page.goto( href , { waitUntil: 'networkidle2' });
    // await utils.autoScroll(page);
    // await sleep(1000)

    var borrow = await page.waitForXPath("//a[contains(., 'Pinjam Ebook')]" ,{timeout : 3000})
    await borrow.click();
    await sleep(1000);

    await page.waitForXPath("//h2[contains(., 'Sukses')]" ,{timeout : 3000});

  } catch (error) {
    utils.error(error.message);
  }
}


async function doReadCollection(page, collurl){
  try {
    //back to base url first
    utils.log('Read From Collection ' + collurl);

    await page.goto( collurl, { waitUntil: 'networkidle2' });

    await page.click('#button_peminjaman');

    var btnread = await page.waitForXPath("//button[contains(., 'Baca Buku')]" ,{timeout : 3000})
    if (btnread) await btnread.click();
    utils.log('Done');

    await sleep(5000);


  } catch (error) {
    utils.error(error.message);
  }
}


function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}


module.exports.dologin = dologin;
module.exports.doSearch = doSearch;
module.exports.doReturnAll = doReturnAll;
module.exports.doReadCollection = doReadCollection;
