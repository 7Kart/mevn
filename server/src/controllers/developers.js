const Developer = require("../models/developer");

exports.GetAllDevelopers = async function(req, res){
    try{
        const developers = await Developer.find({},{
            "projects.name": true, 
            "projects.originId": true
        });
        res.send(developers);
    }catch(err){
        throw err;
    }
}