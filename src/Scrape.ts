import https from 'https';
import { URL } from 'url';

type RequestOptions = {
    hostname: string;
    path: string;
    method: string;
}

function request(options: RequestOptions) {

    return new Promise((resolve, reject) => {

        const req = https.request(options, (res) => {
           
            let responseText = '';

            res.on('data', (d) => {
                responseText += d;
            });

            res.on('end', () => {
                resolve(responseText);
            });
        });
        
        req.on('error', (e) => {
            reject(e);
        });

        req.end();
    });
}

export class Scrape {
    hostname: string;
    path: string;
    scrapingFunction: Function;

    constructor(hostname: string, path: string, scrapingFunction: Function) {
        this.hostname = hostname;
        this.path = path;
        this.scrapingFunction = scrapingFunction;
    }

    async scrape() {
        const options: RequestOptions = {
            hostname: this.hostname,
            path: this.path,
            method: 'GET'
        };
        const response = await request(options);

        return this.scrapingFunction(response);
    }
}

export class Scraper {
    queuedScrapes: Scrape[] = [];
    completedScrapes: any[] = [];
    intervalTime: number = 1000;

    addScrape(scrape: Scrape) {
        this.queuedScrapes.push(scrape);
    }

    addScrapes(scrapes: Scrape[]) {
        scrapes.forEach((s: Scrape) => {
            this.queuedScrapes.push(s);
        });
    }

    scrapeAll() {
        let interval = setInterval(() => {
            console.log('Beginning scrape');
            const queuedScrape = this.queuedScrapes.shift();
            if (queuedScrape === undefined) {
                console.log('Scraping finished');
                clearInterval(interval);
            } else {
                this.completedScrapes.push(queuedScrape.scrape());
            }
        }, this.intervalTime);
    }

}