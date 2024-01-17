
var express = require('express')
var app = express()

var database = require('./database')
var mongodb = require('mongodb')
var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
var cors = require('cors')
app.use(cors())

app.get('/', (req, ress) => {
    ress.json('hii node and react')
})



app.post('/todo', (req, ress) => {
    var dodata = {
        dothis: req.body.dothis,
        date:req.body.date,
        status:0
    }

    database.then((data) => {
        data.collection('ToDoList').insertOne(dodata).then((res) => {
    ress.json('sucess')

        })
    })

})

// app.get('/todoview', (req, res) => {
//     database.then((listdata) => {
//         listdata.collection('ToDoList').find({}).toArray().then((result) => {
//             res.json(result)

//         })
//     })
// })

app.get('/todoview', (req, res) => {
    database.then((listdata) => {
        listdata.collection('ToDoList')
            .find({})
            .sort({ date: 1 }) 
            .toArray()
            .then((result) => {
                res.json(result);
            })
            
    });
});




app.post('/todoelete', (req, res) => {
    let dodel = req.body.id;
    database.then((db) => {
        db.collection('ToDoList').deleteOne({ _id: new mongodb.ObjectId(dodel) })
            .then((result) =>
                res.json("result"))
    })
})


app.post('/todoedit', (req, res) => {
    let dodo = req.body.id
    database.then((dbdb) => {
        dbdb.collection('ToDoList').findOne({ _id: new mongodb.ObjectId(dodo) }).then((doid) => {
            res.json(doid)
        })
    })
})


app.post('/todovalue', (req, res) => {
    let Udata = {

        dothis: req.body.dothis,
        date:req.body.date
      
    }
    let dovalue = req.body.id
    database.then((db) => {
        db.collection('ToDoList').updateOne({ _id: new mongodb.ObjectId(dovalue) }
            , { $set: Udata }).then((res) => {
                console.log(res);

            })
    })
})


app.post('/updateStatus', (req, res) => {
    let sttusdata = {

        status: 1      
    }
    let dovalue = req.body.id
    database.then((db) => {
        db.collection('ToDoList').updateOne({ _id: new mongodb.ObjectId(dovalue) }
            , { $set: sttusdata }).then((result) => {
                console.log(result);
                res.json(result)

            })
    })
})


















































app.listen(4001, () => {
    console.log('app is working')
})



