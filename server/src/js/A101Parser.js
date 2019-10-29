cheerio = require("cheerio");

exports.getRoomsData = function(domHtml){
    var $ = cheerio.load(domHtml, {
        // normalizeWhitespace: true,
    });
    var rooms = [];
    var linksListDom = $('div[class="flat-table-row mob-container --shadow js-flat-list-new-table-item"]');
    
    linksListDom.each((ind, divRoom) => {        
        let room = {};
        const linkDom = $(divRoom).children('a')[0];               
        room.href = linkDom.attribs.href;
        
        let linksDivsInfo = $(linkDom).children();

        //в цикле пока частные случаи
        linksDivsInfo.each((ind, divDom)=>{
            if(ind == 0){
                let imgsDom = $(divDom).children("img");
                if(imgsDom.length > 0){
                    room.imgSrc = $(imgsDom[0]).attr('src')
                }                
            }else if(ind == 1){
                room.roomsCount = $(divDom).text().trim();
            }else if(ind == 2){
                room.district = $(divDom).text().trim();
            }else if(ind == 3){
                room.pavilion = $(divDom).text().trim();
            }else if(ind == 4){
                room.floor = $(divDom).text().replace(/(\r\n|\n|\r)/gm,"").trim();
            }else if(ind == 5){
                room.area = $(divDom).text().trim();
            }else if(ind == 6){
                room.dateFinished = $(divDom).text().trim();
            }else if(ind == 7){
                room.prisePerMeter = $(divDom).text().trim();
            }else if(ind == 8 ){
                room.coast = $(divDom).text().trim();
            }
        })

        rooms.push(room);
    });
    
}