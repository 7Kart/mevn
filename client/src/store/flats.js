import axios from 'axios';

export default {
    state: {
        flats: [{
            _id: "5de26d9d38ccce3a803bbe73",
            imgSrc: "https://a101.ru//media/2019/06/27/23-8.1-6%D0%BC.jpg",
            roomsCount: 1,
            district: "Скандинавия",
            pavilion: "8.1",
            maxFloor: 14,
            dateFinished: new Date(),
            dateFinishedStr: "Сентябрь 2021 г.",
            prisePerMeterStr: "137 774 ₽/м",
            prisePerMeter: 137774,
            oldCoastStr: null,
            coastStr: "5 001 211 ₽",
            oldCoast: null,
            coast: 5001211,
            whitebox: false,
            mortgagershb: true,
            ignore: false,
            idOrigin: 48154,
            href: "/kvartiry/48154/",
            fursnishing: false,
            floor: 3,
            design: false,
            business: true,
            projectId: "5e249bd51335fa000067e080",
            area: 36.3,
            block: false,
            dateInsert: new Date()
        }, {
            _id: "5de26d9d38ccce3a803bbe13",
            imgSrc: "https://a101.ru//media/2019/06/27/23-8.1-6%D0%BC.jpg",
            roomsCount: 3,
            district: "Скандинавия",
            pavilion: "8.1",
            maxFloor: 14,
            dateFinished: new Date(),
            dateFinishedStr: "Сентябрь 2021 г.",
            prisePerMeterStr: "137 774 ₽/м",
            prisePerMeter: 112324,
            oldCoastStr: null,
            coastStr: "5 001 211 ₽",
            oldCoast: null,
            coast: 4301211,
            whitebox: false,
            mortgagershb: true,
            ignore: false,
            idOrigin: 48154,
            href: "/kvartiry/48154/",
            fursnishing: false,
            floor: 3,
            design: false,
            business: true,
            projectId: "5e249bd51335fa000067e080",
            area: 60.3,
            block: false,
            dateInsert: new Date()
        }, {
            _id: "5de26d9d38ccce3a803bbe233",
            imgSrc: "https://a101.ru//media/2019/06/27/23-8.1-6%D0%BC.jpg",
            roomsCount: 2,
            district: "Скандинавия",
            pavilion: "8.1",
            maxFloor: 14,
            dateFinished: new Date(),
            dateFinishedStr: "Сентябрь 2021 г.",
            prisePerMeterStr: "137 774 ₽/м",
            prisePerMeter: 132234,
            oldCoastStr: null,
            coastStr: "5 001 211 ₽",
            oldCoast: null,
            coast: 8601211,
            whitebox: false,
            mortgagershb: true,
            ignore: false,
            idOrigin: 48154,
            href: "/kvartiry/48154/",
            fursnishing: false,
            floor: 2,
            design: false,
            business: true,
            projectId: "5e249bd51335fa000067e080",
            area: 40.3,
            block: false,
            dateInsert: new Date()
        }]
    },
    mutations: {

    },
    actions: {

    },
    getters: {
        getFlats: state => {
            return state.flats
        }
    }
}