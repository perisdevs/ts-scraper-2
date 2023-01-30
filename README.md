# ts-scraper-2
## Usage
Install the package using
`npm install ts-scraper-2`
The package will give you access to two Classes, `Scrape` and `Scraper`
## Scrape
#### `constructor(hostname: string, path: string, scrapingFunction: Function)`
- hostname - The hostname of the domain you want to request. Ex. 'github.com'
- path - The endpoint you want to request at the given hostname. Use '/' for the root.
- scrapingFunction(response) - The function you define that will process the response you got from your request, where your scraped data is created.
#### async scrape()
- Sends an https request to the given address (`hostname` + `path`) and calls the `scrapingFunction` using the https response as the input.
- Returns the result of the `scrapingFunction`
## Scraper
#### `queuedScrapes: Scrape[]`
- An Array of `Scrape`s that will be scraped in order when `scrapeAll()` is called.
#### `completedScrapes: any[]`
- An array of the results returned by `Scrape.scrape()` when `scrapeAll()` is called.
#### `intervalTime: number`
- Value representing milliseconds between requests when `scrapeAll()` is called. Used to prevent overwhelming clients with requests and using up resources. Default value = 1000ms or 1 second/request.
#### `addScrape(scrape: Scrape)`
- Add a `Scrape` Object to the `queuedScrapes`. You can also add an array of `Scrape`s using `addScrapes(scrapes: Scrape[])`
#### `scrapeAll()`
- Goes through the `queuedScrapes` and calls `Scrape.scrape()` based on the set `intervalTime`. Returned results are pushed into `completedScrapes`.