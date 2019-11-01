exports.queryToString = function (query) {
    if(query){
        let params = []
        for (let key in query) {
            if (query[key] instanceof Array) {
                params.push(query[key].map(value => {
                    return `${key}=${value}`
                }).join('&'));
            }else{
                params.push(`${key}=${query[key]}`)
            }
        }    
        return `?${params.join('&')}`
    }
    return '';
}