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
    normalizeURL
};