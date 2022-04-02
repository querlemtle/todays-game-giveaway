const cheerio = require('cheerio');
const fetch = require("node-fetch");

const url = 'https://isthereanydeal.com/specials/';

// Fetch data
const main = async () => {
  const res = await fetch(url);
  const body = await res.text();

  const $ = cheerio.load(body);
  const games = $("#games").children()
  .map(function(i, el) {
      if($(this).find('.bundle-tag').text() === "giveaway"){
        return {
          title: getGametitle($(this).find('.lg').text()),
          link: $(this).find('.lg').attr('href') || null,
          expiration: $(this).find('.bundle-time').text(), 
        };
      }  
  })
  .toArray();

  function getGametitle(string) {
    const title = string.substring(0, string.indexOf('-')).trim();
    return title;
  }
  
  console.log(games);
};

main();