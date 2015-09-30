var scrapequest = require('./scrapequest');
var urls = [
  'https://en.wikipedia.org/wiki/Radioisotope_thermoelectric_generator',
  'https://en.wikipedia.org/wiki/Radioisotope_thermoelectric_generator',
  'https://en.wikipedia.org/wiki/Thermoelectric_effect#Seebeck_effect'
];

urls.map(function(url) {
  scrapequest.scrape(url, function(e, $) {
    console.log($('#firstHeading').text());
  })
})
