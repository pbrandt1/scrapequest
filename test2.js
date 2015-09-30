var scrapequest = require('./scrapequest');
var url = 'https://en.wikipedia.org/wiki/Radioisotope_thermoelectric_generator';
scrapequest.scrape(url, function (err, $) {
  console.log($('h1').text())
});
