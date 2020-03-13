const Flat = require("../../../models/flat"),
    Developer = require("../../../models/developer");
    const to = require('await-to-js').default;

exports.checkSoldFlats = () => {
    return new Promise(async (resolve, reject) => {
        let err, count;
        try{
            [err, count] = await to(Developer.count());
            console.log(`err`,err , count);
            
        }catch(e){
            reject(e);
        }

        // console.log('test', developersCount)

        // var test = 0;
        // let developer = [];
        // while (true){
        //     developer = await Developer.find().skip(test).limit(1);
        //     if(developer.length == 0) break;
        //     console.log(`developer`, developer);

        //     test++;
        // }
        // resolve('test');



        // try catch good practice
        // const handle = (promise) => {
        //     return promise
        //       .then(data => ([data, undefined]))
        //       .catch(error => Promise.resolve([undefined, error]));
        //   }
          
        //   async function userProfile() {
        //     let [user, userErr] = await handle(getUser());
          
        //     if(userErr) throw new Error('Could not fetch user details');
          
        //     let [friendsOfUser, friendErr] = await handle(
        //       getFriendsOfUser(userId)
        //     );
          
        //     if(friendErr) throw new Error('Could not fetch user\'s friends');
          
        //     let [posts, postErr] = await handle(getUsersPosts(userId));
          
        //     if(postErr) throw new Error('Could not fetch user\'s posts');
          
        //     showUserProfilePage(user, friendsOfUser, posts);
        //   }

    });
}