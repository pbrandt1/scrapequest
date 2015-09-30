var scrapequest = require('./scrapequest');
var sync = require('synchronize');

sync(scrapequest, 'scrape');

var urls = [
  'https://en.wikipedia.org/wiki/Radioisotope_thermoelectric_generator',
  'https://en.wikipedia.org/wiki/Radioisotope_thermoelectric_generator',
  'https://en.wikipedia.org/wiki/Thermoelectric_effect#Seebeck_effect'
];

sync.fiber(function() {
  urls.map(function(url) {
    var $ = scrapequest.scrape(url);
    console.log($('#firstHeading').text());
  })
});
