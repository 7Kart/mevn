const needle = require('needle')

// https://api.pik.ru/v1/location

exports.getPickLocation = () => {
    return needle('get', 'https://api.pik.ru/v1/location', null, { json: true });
}

exports.getPickShowRoom = (queryParams) => {
    console.log('query', queryParams);
    
    return needle('get', 'https://api.pik.ru/v1/showroom', queryParams, { json: true });
}