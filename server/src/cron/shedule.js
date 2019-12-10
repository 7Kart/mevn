const CronJob = require('cron').CronJob,
    Jobs = require('./jobs')



exports.initCronJobs = function () {
    console.log("job list is empty")
    new CronJob('0 00-23/1 * * *', function () {        
        Jobs.GetA101Flats();
    }, null, true, 'Europe/Moscow');
}

// 0 00-23/3 * * *