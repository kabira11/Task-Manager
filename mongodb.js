// CRUD operation

// One way of creating mongodb object below
// const mongodb = require('mongodb')
// const MongoClient = mongodb.MongoClient

//Alter way of creating mongodb object below using destructuring
const { MongoClient, ObjectID } = require('mongodb')

const connectionURL = "mongodb://127.0.0.1:27017"
const database = 'task-manager'

MongoClient.connect(connectionURL, {useNewUrlParser: true }, (err, client) => {
    if(err){
        console.log("Unable to connect to database.")
    } 

    const db = client.db(database)

    // db.collection('users').insertOne({
    //        name: "Ravi",
    //        age: 27 
    // }, function(err, res){
    //     if(err){
    //         console.log(err)
    //     } else {
    //         console.log(res)
    //         //res.ops for value whatever is inserted.
    //         console.log(res.ops)
    //     }
    // })

//     db.collection('users').insertMany([
//         {
//         name: "Ojha",
//         age: 27 
//          },
//          {
//             name: "Meenakshi",
//             age: 27 
//          }
//         ], function(err, res){
//      if(err){
//          console.log(err)
//      } else {
//         //  console.log(res)
//          //res.ops for value whatever is inserted.
//          console.log(res.ops)
//      }
//  })


// db.collection('tasks').insertMany([
//     {
//         description: 'Clean the house.',
//         completed: true
//      },
//      {
//         description: 'Renew inspections.',
//         completed: true
//      },
//      {
//         description: 'Pot plants.',
//         completed: false
//      }
//     ], function(err, res){
//  if(err){
//      console.log(err)
//  } else {
//     //  console.log(res)
//      //res.ops for value whatever is inserted.
//      console.log(res.ops)
//  }
// })

    // db.collection('users').findOne({name: "Ravi"}, function(err, res){
    //     if(err){
    //         console.log(err)
    //     } else { 
    //         console.log(res)
    //     }
    // })

    //finding data for age == 27
    // db.collection('users').find({age: 27}).toArray( (err, res) => {
    //     if(err){
    //         console.log(err)
    //     } else { 
    //         console.log(res)
    //     }
    // })

    //counting data
    // db.collection('users').find({age: 27}).count( (err, count) => {
    //     if(err){
    //         console.log(err)
    //     } else { 
    //         console.log(count)
    //     }
    // })


    //Update
    // db.collection('users').updateOne({
    //     _id : new ObjectID('5d70073bc14b8356f8ab89c8')
    // },{
    //     $set: {
    //         name: 'Kabir11'
    //     }
    // }).then((result) => {
    //     console.log(result)
    // }).catch((err) => {
    //     console.log(err)
    // })

    db.collection('users').deleteMany({
        age: 27
    }).then((result) => {
        console.log(result)
    }).catch((err) => {
        console.log(err)
    })

})