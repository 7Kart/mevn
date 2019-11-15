const CronJob = require('cron').CronJob;
const Jobs =  require('./jobs'); 

exports.initCronJobs = function(){
    console.log("job list is empty")
    Jobs.GetNewDevelopersProjects();
    // return new CronJob('* * * * * *', function () {
    //     console.log('You will see this message every second');
    // }, null, true, 'America/Los_Angeles');
}

