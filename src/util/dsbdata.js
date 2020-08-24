const { fetch } = require("./dsbfetcher");
const { parse } = require("./dsbparser");

/**
 * Fetches and parses the latest DSB data, then calls the consumer.
 * 
 * @param {string} user Username
 * @param {string} password Password
 */
function getLatestData(user, password) {
    return new Promise((resolve, reject) => {
        fetch(user, password, results => {
            let contents = [];
            results.forEach(result => {
                parse(result, parsed => {
                    if(parsed == null) {
                        reject();
                        return;
                    }
                    contents.push(parsed);
                    if(contents.length >= results.length) {
                        // TODO merge contents
                        contents.sort((a, b) => a.date.getDate() - b.date.getDate()); // Sort by date
                        resolve(contents);
                    }
                });
            });
        });
    });
}

exports.getLatestData = getLatestData;