const pickAPI = require('../Source/PickApiGetters'),
    Developer = require("../../../../models/developer"),
    Flat = require("../../../../models/flat");

exports.getPickChanges = async () => {

    Developer.find()
    .populate('projects.flatIds')
    .exec((err,developers) => {
        console.log('developers', developers);
        developers[0].projects.forEach(element => {
            console.log('!',element );
        });
    })


}