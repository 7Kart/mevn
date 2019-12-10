const needle = require('needle'),
    cheerio = require("cheerio"),
    https = require('https'),
    Flat = require("../../DataModel/Flat"),
    urlUtils = require('../../../urlUtils');

const BASE_URL = "https://a101.ru"

exports.getRoomsData = ParseFlatsList;
exports.getFilterParams = getFilterParams;

//parse flats from list https://a101.ru/kvartiry/?group=0&complex=17
function ParseFlatsList(query) {
    return new Promise((resolve, reject) => {

        const params = urlUtils.queryToString(query);

        var URL = `${BASE_URL}/objects/filter/${params}`;

        // var URL = `www.sd.net/objects/filter/${params}`;
        needle.get(URL, {
            open_timeout: 10000
        }, (err, res) => {
            //bug (when slow internet and pages get async)           
            if (err) {
                reject(err);
            }
            var flats = [];

            let $ = null;
            try {
                $ = cheerio.load(res.body.html, {
                    normalizeWhitespace: true,
                });
            }
            catch (e) {                
                reject(e)
            }

            const linksListDom = $('.js-flat-list-new-table-item');

            linksListDom.each((ind, divRoom) => {
                let flat = new Flat();
                const linkDom = $(divRoom).children('a')[0];
                flat.href = linkDom.attribs.href;
                if (flat.href) {
                    flat.idOrigin = getNumbers(flat.href);
                }
                let linksDivsInfo = $(linkDom).children();             

                linksDivsInfo.each((ind, divDom) => {
                    if (ind == 0) {
                        let imgsDom = $(divDom).children("img");
                        if (imgsDom.length > 0) {
                            flat.imgSrc = `${BASE_URL}/${$(imgsDom[0]).attr('src')}`;
                        }
                    } else if (ind == 1) {
                        flat.roomsCount = $(divDom).text().trim();
                    } else if (ind == 2) {
                        flat.district = $(divDom).text().trim();
                    } else if (ind == 3) {
                        flat.pavilion = $(divDom).text().trim();
                    } else if (ind == 4) {
                        const floors = parceFloor($(divDom).text());
                        flat.floor = (floors) ? 1 * floors[0] : null;
                        flat.maxFloor = (floors) ? 1 * floors[1] : null;
                    } else if (ind == 5) {
                        flat.area = $(divDom).text().trim();
                    } else if (ind == 6) {
                        flat.dateFinished = convertDate($(divDom).text().trim());
                        flat.dateFinishedStr = $(divDom).text().trim();
                    } else if (ind == 7) {
                        flat.prisePerMeterStr = $(divDom).text().trim();
                        flat.prisePerMeter = getNumbers($(divDom).text().trim());
                    } else if (ind == 8) {
                        let oldPriseDiv = $(divDom).find(".old-price");
                        if (oldPriseDiv.length > 0) {
                            flat.oldCoastStr = $(oldPriseDiv).text();
                            flat.oldCoast = getNumbers(flat.oldCoastStr);
                        }
                        flat.coastStr = $(divDom).find(".flat-table-row__item-price-bold").text().trim();
                        flat.coast = getNumbers(flat.coastStr);
                    }
                });

                //features such as "mortgage-rshb", "business", "ignore", "design", "whitebox", "fursnishing"
                DomClassName.feature.forEach(className => {
                    let featureDiv = $(divRoom).find(`.${className}`);
                    if (featureDiv.length > 0) {
                        flat[className.replace('-', '')] = true;
                    } else {
                        flat[className.replace('-', '')] = false;
                    }
                });

                let blockEl = $(divRoom).find(`.flat-card__status`);
                //reservation flat 
                flat.block = blockEl.length > 0;
                
                flats.push(flat);
            });
            return resolve(flats);
        });
    })
}

//get all params value for https://a101.ru/objects query
function getFilterParams(query) {
    const params = urlUtils.queryToString(query);
    return new Promise((resolve, reject) => {
        https.get(`${BASE_URL}/objects/filter/facets/${params}`, (resp) => {
            let data = '';

            resp.on('data', (chunk) => {
                data += chunk;
            });

            resp.on('end', () => {
                let filterData = JSON.parse(data)
                var complexNameUrl = `${BASE_URL}/objects/filter/applied/?group=0`
                if (filterData) {
                    filterData.facets.complex.forEach(complexId => {
                        complexNameUrl += `&complex=${complexId}`
                    });

                    https.get(complexNameUrl, (resp) => {
                        let data = '';

                        resp.on('data', (chunk) => {
                            data += chunk;
                        });

                        resp.on('end', (req, res) => {
                            filterData.facets["complexNames"] = JSON.parse(data).complex ? JSON.parse(data).complex.split(", ") : JSON.parse(data).complex.split(", ")
                            
                            resolve(filterData);
                        })

                        resp.on('error', (err) => {
                            resolve(filterData);
                        });
                    })
                }
            });

            resp.on("error", (err) => {
                reject(err);
            });
        }).on("error", (err) => {
            reject(err);
        });
    });
}

//parse floor div
function parceFloor(textValue) {
    if (textValue) {
        let floorStr = textValue.replace(/[\n\r\s]/g, "");
        if (floorStr) {
            return floorStr.split("из");
        }
    }
    return null;
}

//convert dateformat 'mmmm YYYYY г.' в new Date()
function convertDate(textValue) {
    if (textValue) {
        let month = textValue.split(" ")[0];
        if (month) {
            let monthInd = monthDictionary[month.toLowerCase()];
            let year = textValue.split(" ")[1];
            return new Date(year, monthInd, 1);
        }
    }
    return null;
}

function getNumbers(textValue) {
    if (textValue) {
        return 1 * textValue.replace(/[\n\r\s]/g, "").match(/\d+/g)[0];
    }
    return null;
}

const DomClassName = {
    feature: ["mortgage-rshb", "business", "ignore", "design", "whitebox", "fursnishing"]
}

const monthDictionary = {
    "январь": 0,
    "февраль": 1,
    "март": 2,
    "апрель": 3,
    "май": 4,
    "июнь": 5,
    "июль": 6,
    "август": 7,
    "сентябрь": 8,
    "октябрь": 9,
    "ноябрь": 10,
    "декабрь": 11
};

