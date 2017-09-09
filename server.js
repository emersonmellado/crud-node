const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const MongoClient = require('mongodb').MongoClient

var db

app.use(bodyParser.urlencoded({extended: true}))
app.set('view engine', 'ejs')

MongoClient.connect('mongodb://crud-ops:crud-ops@ds137360.mlab.com:37360/crud-ops', (err, database) => {
  if (err) return console.log(err)
    db = database
  app.listen(3000, function(){
    console.log('listening on 3000')
  })

  app.get('/', (req, res) => {
    db.collection('quotes').find().toArray((err, result) => {
      if (err) return console.log(err)
      // renders index.ejs
    res.render('index.ejs', {quotes: result})
  })
  })

  app.post('/quotes', (req, res) =>{
    db.collection('quotes').save(req.body, (err, result) => {
      if (err) return console.log(err)

        console.log('saved to database')
      res.redirect('/')
    })
  })
})
