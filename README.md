# scrapequest
because scraping is always an adventure

`npm install scrapequest`

```javascript
var scrapequest = require('scrapequest');
var url = 'https://en.wikipedia.org/wiki/Radioisotope_thermoelectric_generator';
scrapequest.scrape(url, function (err, $) {
  console.log($('h1').text())
});
```

It's a queue and it protects you from scraping too hard with the `interval` option,
which is the number of milliseconds it waits between scraping urls.
Default is 1000 ms.

```javascript
scrapequest.interval = 0; // superfast!
// or
scrapequest.interval = 60*1000; // one url per minute
```

You can also specify any request.js option, like headers

```javascript
scrapequest.requestOptions = {
  headers: {
    'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/43.0.2357.130 Safari/537.36'
  }
}
```

So one other interesting thing is that scrapequest caches the pages you scrape in
a file called scrapequest.db (it's a dirtydb file).  I realize this might take up
a lot of space on your system if you are scraping a lot.  If performance becomes
an issue for you, just submit an issue and I'll see if I can do something to help.

**bonus!**

here's a picture of matt damon pondering the wisdom of putting a stick of plutonium down his pants to keep warm.

[regret](https://github.com/pbrandt1/scrapequest/raw/master/martian-matt-regret.jpg "what have i done")

### license
Code is licensed under the WTFPL version 2.
