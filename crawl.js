const { JSDOM } = require('jsdom');

async function crawlPage(currentURL) {
    console.log(`actively crawling ${currentURL}`);
    try {
        const resp = await fetch(currentURL);
        if (resp.status >= 400) {
            console.log(`error in fetch with status code: ${resp.status} on page: ${currentURL}`);
            return;
        }
        const contentType = resp.headers.get("content-type");
        if (!contentType.includes("text/html")) {
            console.log(`non html response, content type: ${contentType}, on page: ${currentURL}`);
            return;
        }

        console.log(await resp.text());
    }
    catch (err) {
        console.log(`error in fetch: ${err.message}, on page '${currentURL}'`);
    }

}

function getURLsFromHTML(htmlBody, baseURL) {
    const urls = [];
    const dom = new JSDOM(htmlBody);
    const linkElements = dom.window.document.querySelectorAll('a');
    for (const linkElement of linkElements) {
        if (linkElement.href.slice(0, 1) === '/') {
            // relative
            try {
                const urlObj = new URL(`${baseURL}${linkElement.href}`);
                urls.push(urlObj.href);
            }
            catch (err) {
                console.log(`error with relative url: ${err.message}`);
            }
        }
        else {
            // absolute
            try {
                const urlObj = new URL(`${linkElement.href}`);
                urls.push(urlObj.href);
            }
            catch (err) {
                console.log(`error with absolute url: ${err.message}`);
            }
        }

    }
    return urls;
}

function normalizeURL(urlString) {
    const urlObject = new URL(urlString);
    const hostPath = `${urlObject.hostname}${urlObject.pathname}`;
    const last = hostPath.length - 1;
    if (hostPath.length > 0 && hostPath[last] === '/') {
        return hostPath.slice(0, last);
    }
    return hostPath;
}

module.exports = {
    normalizeURL,
    getURLsFromHTML,
    crawlPage
};