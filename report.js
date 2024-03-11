const fs = require("fs");
const { stringify } = require("csv-stringify");

function printReport(pages) {
    console.log("======");
    console.log("REPORT")
    console.log("======");
    const sortedPages = sortPages(pages);
    for (const page of sortedPages) {
        const url = page[0];
        const hits = page[1];
        console.log(`Found ${hits} links to page: ${url}`);
    }
    console.log("==========");
    console.log("END REPORT");
    console.log("==========");
}

function makeCSVFile(pages) {
    const filename = "report.csv";
    const writeableStream = fs.createWriteStream(filename);
    const columns = ["URLs", "Link-count"];
    const stringifier = stringify({ header: true, columns: columns })
    const sortedPages = sortPages(pages);
    for (const page of sortedPages) {
        stringifier.write(page);
    }
    stringifier.pipe(writeableStream);
    console.log(`Finished writing data to file '${filename}'.`);
}

function sortPages(pages) {
    const pagesArr = Object.entries(pages);
    return pagesArr.sort((x, y) => {
        return y[1] - x[1];
    });
}

module.exports = {
    sortPages,
    printReport,
    makeCSVFile
}