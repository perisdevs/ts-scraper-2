import { Scrape } from "./Scrape";

const testingScrapeFunction = function(response: any) {
    console.log(response);
}

const testingScrape = new Scrape('github.com',
    '/perisdevs/ts-scraper-2', testingScrapeFunction);

const response = testingScrape.scrape();