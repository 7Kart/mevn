const PickAPI = require("../core/DataProviders/Pick/Source/PickApiGetters"),
    pickRepository = require("../core/DataProviders/Pick/Repository/index"),
    Developer = require("../models/developer")
//get all Pick's locations
exports.GetPickLocation = (req, res) => {
    PickAPI.getPickLocation()
        .then((locations) => {
            res.send(locations.body)
        })
        .catch((err) => {
            res.send(err);
        })
}

//get all showRooms
exports.GetPickShowRoom = (req, res) => {
    PickAPI.getPickShowRoom(req.query)
        .then((showRooms) => {
            res.send(showRooms.body);
        })
        .catch((err) => {
            res.send(err);
        })
}

//GET ALL PIKC ROOMS 
exports.GetPickFlats = (req, res) => {
    PickAPI.getPickFlats(req.query)
        .then((flats) => {
            res.send(flats.body);
        })
        .catch((err) => {
            res.send(err);
        });
}

//GET PICK BLOCKS
exports.GetPickBlocks = (req, res) => {
    PickAPI.getPickBlocks(req.query)
        .then((bloks) => {
            res.send(bloks.body);
        })
        .catch((err) => {
            res.send(err);
        });
}

//GET PICK BULKS
exports.GetPickBulks = (req, res) => {
    PickAPI.getPickBulks(req.query)
        .then((bloks) => {
            res.send(bloks.body);
        })
        .catch((err) => {
            res.send(err);
        });
}

exports.GetPickChanges = (req, res) => {
    pickRepository.getPickChanges().then(data => {
        res.send({
            data: data,
            status: 200
        });
    });
}

exports.GetNewPickProjects = (req, res) => {
    pickRepository.findNewProjects().then((data) => {
        res.send({
            status: 200,
            data: data
        });
    }).catch((err) => {
        res.send({
            status: 500,
            data: err
        })
    })
}

exports.GetNewPickFlats = (req, res) => {
    pickRepository.getNewPickFlats()
        .then((result) => {
            console.log('result', result);
            // res.send({
            //     status:200
            // })
        })
        .catch((err) => {
            console.log('err', err);
        })
    res.send({
        status: 200
    })
}


exports.changePickLinks = async (req, res) => {
    const dbProjectQuery = await Developer.getDevelopersProjects(["5e1b6e441c9d44000012a99b"]);
    const blocks = await PickAPI.getPickBlocks()

    for (let project of dbProjectQuery[0].projects) {

        const originBlock = blocks.body.find(block => {
            return block.id == project.idOrigin;
        });

        if(originBlock != undefined && originBlock.url != null){
            
        }
        
    }

    res.send({
        status: 200
    })
}