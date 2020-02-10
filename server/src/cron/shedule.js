const CronJob = require('cron').CronJob,
    Jobs = require('./jobs')


exports.initCronJobs = function () {
    console.log("job list is empty")
    new CronJob('0 00-23/3 * * *', function () {        
        Jobs.GetA101Flats();
    }, null, true, 'Europe/Moscow');

    new CronJob('0 01-23/4 * * *', function () {        
        Jobs.getNewPickFlats();
    }, null, true, 'Europe/Moscow');
}

// 0 00-23/3 * * *