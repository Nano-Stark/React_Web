///CREATING DATA
//run node server/test.js in terminal

var models = require('./server.js').models;

/*
models.profile.create({name: "Sammy"}, (err, profile) => {
    console.log("data?", err, profile);
})
*/
//find and update an existing model data or insert new model data (instance)
//check robomongo for changes
/*
models.profile.upsert({id: "6036e9399ccfb41fb8f01908", name: "Nick_updated"}, (err, profile) => {
    console.log("data?", err, profile);
})
*/

/*
models.profile.findOrCreate({name: "Sam2"}, (err, profile) => {
    if(err){//updating data
    console.log("data?", err, profile);
    }else if (profile){
        /*profile.updateAttributes({
            email: "samo@gmail.com"
        }, (updateError, updated) => {
            console.log("Save?", updateError, updated);
        });*//*
        profile.email = "samoo@gmail.com"
        profile.save((ue, updated) => {
            console.log("Udated?", updated);
        });
    }
})
*/



/*//comment after creating data
var toSave = [
    {name: 'Sam0', email: 'sam0@gmail.com'},
    {name: 'Sam1', email: 'sam1@gmail.com'},
    {name: 'Sam2', email: 'sam2@gmail.com'},
    {name: 'Sam3', email: 'sam3@gmail.com'},
    {name: 'Sam4', email: 'sam4@gmail.com'},
    {name: 'Sam5', email: 'sam5@gmail.com'},
    {name: 'Sam6', email: 'sam6@gmail.com'},
    {name: 'Sam7', email: 'sam7@gmail.com'},
    {name: 'Sam8', email: 'sam8@gmail.com'},
    {name: 'Sam9', email: 'sam9@gmail.com'},
    {name: 'Sam10', email: 'sam10@gmail.com'}
];

toSave.map(obj => {
    models.profile.create(obj, (err, created) => {
        console.log("Created?", created);
    })
})

*/

//FINDING DATA

//object in models.profile.findOne
var filter = {
    
    //used code
    where: {
        name: {like: 'Sam'},
        /*postCount: {gte: 10}*/
    }, //more like Mysql clause
    order: 'id ASC', //order by: field direction
    limit: 10, //instance limit
    skip: 0,
    fields: {
        email: true
    }


    /*include: {
        relations: 'Posts',
        scope: {
            limit: 5,
            order: 'date DESC',
            include: {
                relation: 'Image',
                limit: 1,
                where: {type: 'thumbnail'}
            }
        }
    }*/
}

//returns profile.Posts.Image

//where needs to matches exactly to find
/*
models.profile.findOne({where: {name: 'Sam0'}, order: 'id DESC'}, (err, found) => {
    console.log('Found?', err, found);
})

models.profile.find(filter, (err, found) => {
    console.log('Found?', err, found);
})

models.profile.findById("6036f1101b0c5e08086a6bc5", (err, found) => {
    console.log('Found?', err, found);
})

models.profile.findById("6036f1101b0c5e08086a6bc5", filter, (err, found) => {
    console.log('Found?', err, found);
})
*/


///////////////////////////////////////////

///DELETING DATA
//the below has been deleted
/*
models.profile.findById("6036f1101b0c5e08086a6bc5", filter, (err, found) => {
    console.log('Found?', err, found);
    found.destroy();
})
*/
/*
models.profile.destroyAll(filter.where, (err, found) => {
    console.log('Found?', err, found);
})
*/


models.profile.destroyById("6036e9399ccfb41fb8f01908", (err, found) => {
    console.log('Found?', err, found);
})
