const needle = require('needle'),
    A101Parser = require("../js/A101Parser");

exports.homePage = function (req, res) {
    var URL = 'https://a101.ru/objects/filter/?complex=17&group=0';
    
    needle.get(URL, function (err, res) {
        if (err) throw err;
        A101Parser.getRoomsData(res.body.html);
    });

    res.send([{
        flat: "init start"
    }]);
}