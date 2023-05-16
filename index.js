const express = require('express');
const app = express();
const path = require('path')
app.use(express.json())
const connectDB = require('./connectMongo');
const bookModel = require('./models/book.model');
const bodyParser = require('body-parser');
const { debug } = require('console');

app.use(bodyParser.urlencoded({ extended: false }));

app.set("view engine", "ejs");

connectDB();


app.set('views', path.join(__dirname, 'views'));


// app.get('/', (req, res) => {
//     // res.sendFile(path.join(__dirname,'/templates/index'))
  
//     //res.render('index')

// })


app.get('/', function(req, res) {
    //db.collection('your-collection-name') // Replace with your collection name
    bookModel.find().toArray(function(err, data) {
        if (err) {
          console.log('Error fetching data from MongoDB:', err);
        } else {
          res.render('list', { data: item });
        }
      });
  });

// get all data

app.get('/api/v1/books', async (req, res) => {

    try{
        const data = await bookModel.find();
        return res.status(200).json({
            msg: 'Ok',
            data
        })
    } catch (error) {
        return res.status(500).json({
            msg: 'error message',
            data
        })
    }

}) 

//End get all data

//find by id
app.get('/api/v1/books/:id', async (req, res) => {

    try{
        const data = await bookModel.findById(req.params.id);
        return res.status(200).json({
            msg: 'Ok',
            data
           

        })
    

    } catch (error) {
        return res.status(500).json({
            msg: 'error message',
            data

        })
    }

})   
//End find by id


//post data

app.post('/api/v1/books', async (req, res) => {
    try{ const {name, author, price, description  } =  req.body
        const book  = new bookModel({ name, author, price, description})
        console.log(name)
        const data = await book.save();
        return res.status(200).json({msg: 'Ok',data})
    } catch (error) {
        return res.status(500).json({
            msg: 'error message'})}}) 
//end post data

//Edit data
app.put('/api/v1/books/:id', async (req, res) => {

    try{
        const {name, author, price, description } =  req.body
        const { id } =  req.params
        const data = await bookModel.findByIdAndUpdate(id,
            { name, author, price, description}, 
            {new: true})

        return res.status(200).json({
            msg: 'Ok',
            data
                
        })
    } catch (error) {
        return res.status(500).json({
            msg: 'error message'
        })
        }
    }) 

//End edit data

//Delete data

app.delete('/api/v1/books/:id', async (req, res) => {

    try{
         await bookModel.findByIdAndDelete(req.params.id);
        return res.status(200).json({
            msg: 'Ok',
        
        })
    

    } catch (error) {
        return res.status(500).json({
            msg: 'error message',
            data

        })
    }

})   

// End delete data

app.listen(3000,() => {
    console.log("server is running on port 3000");
})