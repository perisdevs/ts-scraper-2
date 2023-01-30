import { Scrape } from "./Scrape";

const testingScrapeFunction = function(response: any) {
    console.log(response);
}

const testingScrape = new Scrape('mhrise.kiranico.com',
    '/data/weapons?view=0', testingScrapeFunction);

const response = testingScrape.scrape();

console.log(response);