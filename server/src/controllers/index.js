const needle = require('needle'),
    cheerio = require("cheerio");


exports.homePage = function (req, res) {
    var URL = 'https://a101.ru/kvartiry/?complex=17&group=0';

    needle.get(URL, function (err, res) {
        if (err) throw err;
        var $ = cheerio.load(res.body);
        var links = $('.flat-table-row').attr('href')
        console.log(links);
        console.log(res.statusCode);
    });

    res.send([{
        flat: "init start"
    }]);
}