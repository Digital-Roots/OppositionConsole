const rp = require('request-promise');
const express = require('express');
const $ = require('cheerio');
const app = express();
const Url = require('url-parse');


app.get('/scrape', (req, res)=>{
  let url = req.query.q;
  let parseUrl = new Url(url);
  parseUrl = parseUrl.hostname;

  switch(parseUrl){
    case 'www.washingtonpost.com':
    rp(url)
    .then(function(html){
      let scrapeTitle = $('.topper-headline > h1', html).text();
      let scrapeAuthor = $('.author-byline', html).text();
      let scrapePublished = $('.author-timestamp', html).text();
      let scrapeBody = $('#main-content p', html).text();
      const output = {title: "", author: "", published: "", body: ""};
      output.title = scrapeTitle;
      output.published = scrapePublished;
      output.author = scrapeAuthor;
      output.body = scrapeBody;
      res.json(output);
    })
    .catch(function(err){
      console.log(err);
    });
    break;
    default:
    res.json({
      err: 'No template'
    });
  }
});
const port = process.env.PORT || 8080;

app.listen(port, function(){
  console.log('Express app listening on ', port);
})
