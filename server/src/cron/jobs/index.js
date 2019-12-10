const A101Repository = require('../../core/DataProviders/A101/Repository'),
    path = require('path'),
    moment = require('moment'),
    fs = require('fs');

exports.GetNewDevelopersProjects = function () {
    let newProjects = [];
    const promises = [A101Repository.getNewDevelopersProject()]
    Promise.all(promises)
        .then(developersProjects => {
            developersProjects.forEach(deveolperProjects => {
                newProjects.push(...deveolperProjects);
                console.log('newProjects', newProjects);
            });
        })
        .catch(err => {
            //todo ~~~ error handler for job 
            console.log(`error in job ${err}`)
        })
}

//get new flats and changes
exports.GetA101Flats = function () {
    const statrtTime = new Date();
    let logDirectoryPath = path.resolve('__dirname', '../logs/jobs/newA101Flats.txt');
    let logString = "";
    A101Repository.findNewFlats()
        .then((stats) => {
            const endJobTime = new Date();
            logString = `job start at ${moment(statrtTime).format('MMMM Do YYYY, hh:mm:ss')} complete ${moment(endJobTime).format('MMMM Do YYYY, hh:mm:ss')}, update:${stats.update}, add:${stats.add}`;
        })
        .catch(e => {
            logString = "errwhen get new flat" + e;
        })
        .finally(() => {
            fs.appendFile(logDirectoryPath, `${logString}\n`, 'utf8', function (err) {
                if (!err)
                    console.log("file has been saved.");
            });
        })
}

