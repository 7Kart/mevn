const A101Repository = require('../../core/DataProviders/A101/Repository');

exports.GetNewDevelopersProjects = function(){
    let newProjects = [];
    const promises = [A101Repository.getNewDevelopersProject()]
    Promise.all(promises)
        .then(developersProjects => {
            developersProjects.forEach(deveolperProjects=>{
                newProjects.push(...deveolperProjects);
                console.log('newProjects', newProjects);
            });           
        })
        .catch(err=>{
            //todo ~~~ error handler for job 
            console.log(`error in job ${err}`)
        })
}

