const rp = require('request-promise');
const express = require('express');
const $ = require('cheerio');
const app = express();
const Url = require('url-parse');
const snoopScrape = require('./snoopScrape');

app.get('/', (req, res)=>{
  const url = 'https://www.snopes.com/fact-check/';
  rp(url)
  .then(function(html){
    let count = $('div.list-group article a', html).length;
    const href = []
    for(let i = 0; i < count; i++){
      href.push($('div.list-group article a', html)[i].attribs.href);
    };
    return Promise.all(
      href.map(function(url){
        return snoopScrape(url);
      })
    );
  })
  .then(function(posts){
    res.json(posts);
  })
  .catch(function(err){
    console.log(err);
  })
});

module.exports = app;
