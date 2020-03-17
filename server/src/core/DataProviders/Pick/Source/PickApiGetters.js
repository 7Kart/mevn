const needle = require('needle'),
    urlUtils = require('../../../urlUtils');
// https://api.pik.ru/v1/location

//get list location
exports.getPickLocation = () => {
    return needle('get', 'https://api.pik.ru/v1/location', null, { json: true });
}

//GET SHOW ROOMS(as project)
exports.getPickShowRoom = (queryParams) => {
    const queryString = urlUtils.queryToString(queryParams)
    return needle('get', `https://api.pik.ru/v1/showroom${queryString}`);
}

//GET PICK FLATS
//block_id!, bulk_id, layout_id, price_from, &price_to, floor_from, floor_from, floor_from, floor_to
//area_from, area_to, rooms, studio, penthouse, settlement, settlement_from, settlement_to
//isFurniture, finish, settlement_fact, monthly_payment, page, order, price_million, index_by=statistics
// &images=1, metadata=1, layouts=1, type=1,2
exports.getPickFlats = (queryParams) => {
    const queryString = urlUtils.queryToString(queryParams)
    return needle('get', `https://api.pik.ru/v2/flat${queryString}`);
}

//GET PICK FLAT INFO
//id, similar
//{"error":"ERR_FLAT_NOT_FOUND"} 
exports.getPickFlatById = (queryParams) => {
    const queryString = urlUtils.queryToString(queryParams)
    return needle('get', `https://api.pik.ru/v1/flat${queryString}`);
}

//GET PICK FLAT SALE STATUS
//id, 
//{"error":"ERR_FLAT_NOT_FOUND"} 
exports.GetSaleStatus = (flat) => {
    return new Promise((resolve, reject) => {
        try {
            needle.get(`https://api.pik.ru/v1/flat?id=${flat.idOrigin}`, (err, res) => {
                if (err) throw(err);                
                resolve({
                    status: (res.body && res.body.error === "ERR_FLAT_NOT_FOUND") ? true : false,
                    idFlat: flat._id,
                    href: flat.href
                });

            });
        } catch (err) {
            reject(err)
        }
    });
}


//GET PICK BLOKCS
//https://api.pik.ru/v1/block?
//types=1,2&metadata=1&statistics=1&images=1&locations=2,3&price_from=undefined
//&price_to=undefined&settlement=undefined&price_million=0&last_unfiltered=0
exports.getPickBlocks = (queryParams) => {
    const queryString = urlUtils.queryToString(queryParams)
    return needle('get', `https://api.pik.ru/v1/block${queryString}`);
}

//GET PICK BULK
//https://api.pik.ru/v1/bulk?block_id=130&type=1,2&metadata=1&images=1&sort=social
exports.getPickBulks = (queryParams) => {
    const queryString = urlUtils.queryToString(queryParams)
    return needle('get', `https://api.pik.ru/v1/bulk${queryString}`);
}