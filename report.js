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

function sortPages(pages) {
    const pagesArr = Object.entries(pages);
    return pagesArr.sort((x, y) => {
        return y[1] - x[1];
    });
}

module.exports = {
    sortPages,
    printReport
}