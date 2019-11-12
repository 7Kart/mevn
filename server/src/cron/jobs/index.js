const A101Repository = require('../../core/DataProviders/A101/Repository');

exports.GetNewDevelopersProjects = function(){
    let projects = [];
    const promises = [A101Repository.getNewDevelopersProject()]
    Promise.all(promises)
        .then(newProjects => {
            console.log(`new project was found ${newProjects}`);
            newProjects.forEach(projectGroup=>{
                projects.push(...projectGroup)
            })
            console.log("job result", newProjects)
        })
        .catch(err=>{
            //todo ~~~ error handler for job 
            console.log(`error in job ${err}`)
        })
}

