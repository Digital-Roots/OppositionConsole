const rp = require('request-promise');
const $ = require('cheerio');
const Url = require('url-parse');

const snoopScrape = (url) =>{
  let parseUrl = new Url(url);
  parseUrl = parseUrl.pathname;
  return rp(url)
          .then(function(html){
            return {
              title: $('h1.card-title', html).text(),
              link: parseUrl,
              claim: $('p.claim', html).text(),
              verdict: $('span.rating-name', html).text() ,
              body: $('div.card-body p', html).text()
            };
          })
          .catch(function(err){
            console.log(err);
          })
};
module.exports = snoopScrape;
