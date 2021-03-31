const baseurl = 'https://www.tokopedia.com/';
// const selector = '[data-testid="divSRPContentProducts"]';
// const selector_prodcut = '[data-testid="divProductWrapper"]';

const utils = require('./utils');


exports.getURL = function () {
  return baseurl;
};

function searchURL(keyword, startprice, endprice, condition, powermerchant){
  var url = baseurl + 'search?';
  if (condition > 0){
    url = url + 'condition=' + condition + '&';
  }
  if (powermerchant == true){
    url = url + 'goldmerchant=true&';
  }
  url = url + 'navsource=home&';
  url = url + 'ob=9&';
  url = url + 'pmax='+endprice+'&pmin='+startprice+'&';  //keyword
  return url + 'st=product&q=' + keyword;
}


async function doSearch(page, product){
  var condition = 2; //second

  if (product.condition != null){
    condition = product.condition;
  }

  try {
    var url = searchURL(product.keyword, product.startprice, product.endprice, condition);
    await page.goto( url, { waitUntil: 'networkidle2' });
    await utils.autoScroll(page);
    utils.infoheader(url);

  } catch (error) {
    utils.error(error.message);
  }


  try {
    // await page.waitForSelector(selector, { timeout: 3000 })
    // let content = await page.evaluate(({selector}) => document.querySelector(selector), {selector} );
    let data = await page.evaluate(() => {
        var result = []
        let doc = document.querySelector('[data-testid="divSRPContentProducts"]');
        let details = doc.querySelectorAll('[data-testid="divProductWrapper"]');


        for (var detail of details){
            var _isnew = detail.textContent.includes('Produk Terbaru');
            var item = {
              name : detail.querySelector('[data-testid="spnSRPProdName"]').innerText,
              price : detail.querySelector('[data-testid="spnSRPProdPrice"]').innerText ,
              link : detail.querySelector('a').href ,
              isnew : _isnew
            };

            if (item.link.includes('tokopedia.com/promo/v1/clicks'))  item.link = '** promo/topads **'
            result.push(item);
        }

        return result
      }
    );

    for (var d of data){
        var tag = '';
        if (d.isnew) tag = 'New';
        utils.showPrice('Toped', tag, d.name, d.price, d.link);
        // await new Promise(r => setTimeout(r, 10000));
        // await sleep(500);

        await page.waitForTimeout(2000);
    }


    // ...
  } catch (error) {
    utils.showNotFound('Toped', product.keyword, product.startprice, product.endprice);
  }

}


module.exports.doSearch = doSearch;
