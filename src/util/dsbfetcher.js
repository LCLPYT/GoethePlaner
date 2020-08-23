const uuid = require('react-native-uuid');
const { gzip, gunzip } = require('react-zlib-js');
const Buffer = require('buffer').Buffer;

/**
 * Represents an entry of content.
 */
class TimeTable {

    constructor(date, groupName, id, title, url) {
        this.date = date;
        this.groupName = groupName;
        this.id = id;
        this.title = title;
        this.url = url;
    }

}

/**
 * A function that is called, when the fetcher is finished.
 * 
 * @callback fetcherCallback
 * @param {TimeTable[]} results
 */

/**
 * Retrieves the latest contents from DSB.
 * 
 * @param {string} user The user name.
 * @param {string} password The password of the user.
 * @param {fetcherCallback} callback The fetcher callback.
 */
function encrypt(user, password, callback) {
    let date = new Date().toISOString();
    date = date.substring(0, date.length - 1);

    const input = JSON.stringify({
        "AppId": uuid.v4(),
        "PushId": "",
        "UserId": user,
        "UserPw": password,
        "AppVersion": "2.5.9",
        "Device": "WAS-L03T",
        "OsVersion": "28 9",
        "Language": "en",
        "Date": date,
        "LastUpdate": date,
        "BundleId": "de.heinekingmedia.dsbmobile"
    });

    gzip(input, (err, buffer) => {
        if (err) {
            console.error('An error occurred:', err);
            process.exitCode = 1;
        }
        makeRequest(buffer.toString('base64'), callback);
    });
}

function makeRequest(base64, callback) {
    fetch('https://app.dsbcontrol.de/JsonHandler.ashx/GetData', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=UTF-8'
        },
        body: JSON.stringify({
            req: {
                Data: base64,
                DataType: 1
            }
        })
    })
    .then(response => response.json())
    .then(data => onRequestFinished(data, callback));
}

function onRequestFinished(resp, callback) {
    const buffer = Buffer.from(resp.d, "base64");

    gunzip(buffer, (err, buffer) => {
        if (err) {
            console.log("An error occurred:", err);
            process.exitCode = 1;
        }
        evalResponse(JSON.parse(buffer.toString()), callback);
    });
}

function evalResponse(json, callback) {
    let timeTables = [];

    json.ResultMenuItems[0].Childs[0].Root.Childs.forEach(element => {
        let date = element.Date;
        let id = element.Id;
        let groupName = element.Title;

        element.Childs.forEach(dayElem => {
            let title = dayElem.Title;
            let url = dayElem.Detail;

            timeTables.push(new TimeTable(date, groupName, id, title, url));
        });
    });

    callback(timeTables);
}

exports.fetch = encrypt;
exports.TimeTable = TimeTable;