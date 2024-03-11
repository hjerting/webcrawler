const { crawlPage } = require('./crawl.js');
const { printReport } = require('./report.js');

async function main() {
    if (process.argv.length < 3) {
        console.log("no website provided");
        process.exit(1);
    }
    if (process.argv.length > 3) {
        console.log("too many command line args");
        process.exit(1);
    }

    let baseURL = process.argv[2];
    const last = baseURL.length - 1;
    if (baseURL[last] === '/') {
        baseURL = baseURL.slice(0, last);
    }
    console.log(baseURL);
    console.log(`starting crawl of ${baseURL}`);
    const pages = await crawlPage(baseURL, baseURL, {});
    printReport(pages);
}

main();