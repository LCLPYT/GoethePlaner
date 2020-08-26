const { parse: parseHtml } = require("node-html-parser");
require("@zxing/text-encoding/cjs/encoding-indexes")
require("@zxing/text-encoding");

/**
 * Represents a plan change.
 */
class TableEntry {

    constructor(classes, hour, absent, replacement, subject, room, type, extra) {
        this.classes = classes;
        this.hour = hour;
        this.absent = absent;
        this.replacement = replacement;
        this.subject = subject;
        this.room = room;
        this.type = type;
        this.extra = extra;
    }

    static parse(tds) {
        return new TableEntry(
            TableEntry.get(tds, 0),
            TableEntry.get(tds, 1),
            TableEntry.get(tds, 2),
            TableEntry.get(tds, 3),
            TableEntry.get(tds, 4),
            TableEntry.get(tds, 5),
            TableEntry.get(tds, 6),
            TableEntry.get(tds, 7)
        );
    }

    static get(tds, i) {
        if(i < 0 || i >= tds.length) return "";
        return tds[i].text;
    }

}

/**
 * Represents content of a day.
 */
class Content {

    constructor(date, news, entries) {
        this.date = date;
        this.news = news;
        this.entries = entries;
    }

}

function get(url) {
    return new Promise((accept, reject) => {
        var req = new XMLHttpRequest();
        req.open("GET", url, true);
        req.responseType = "arraybuffer";

        req.onload = event => {
            var resp = req.response;
            if(resp) accept(resp);
        };

        req.send(null);
    });
}

/**
 * Converts TimeTables to Content
 * @param {TimeTable} timetable 
 */
function parse(timetable, callback) {
    get(timetable.url).then(buffer => {
        let decoder = new TextDecoder("iso-8859-1");
        let text = decoder.decode(buffer);
        onRequestFinished(text, callback);
    });
}

function onRequestFinished(data, callback) {
    let date = null;
    let news = [];
    let entries = [];
    const root = parseHtml(data);

    let dateDiv = root.querySelectorAll("div.mon_title");
    if(dateDiv.length > 0) date = parseDate(dateDiv[0].childNodes[0].rawText);

    let tableInfo = root.querySelectorAll("table.info");
    if(tableInfo.length > 0) {
        tableInfo.forEach(ti => {
            let trs = ti.querySelectorAll("tr");
            for (let i = 1; i < trs.length; i++) {
                let t = trs[i].text;
                //t = unescape(encodeURIComponent(t));
                news.push(t.replace(/^\s+|\s+$/g, '')); // remove newlines before and after the text
            }
        });
    }

    let tables = root.querySelectorAll("table.mon_list");
    if(tables.length > 0) {
        tables.forEach(table => {
            let rows = table.querySelectorAll("tr");
            rows.forEach(row => {
                let tds = row.querySelectorAll("td");
                if(tds.length <= 0) return;

                let tableentry = TableEntry.parse(tds);
                if(tableentry != null) entries.push(tableentry);
            });
        });
    }

    callback(new Content(date, news, entries));
}

/**
 * @param {string} text Raw date text.
 * @returns {Date} The parsed date.
 */
function parseDate(text) {
    let words = text.split(/ /g);
    if(words.length < 2) return null;

    let split = words[0].split(/\./g);
    if(split.length < 3) return null;

    let d = new Date();
    d.setDate(Number(split[0]));
    d.setMonth(Number(split[1] - 1));
    d.setFullYear(Number(split[2]));

    return d;
}

exports.parse = parse;