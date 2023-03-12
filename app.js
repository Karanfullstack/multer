const express = require('express');
const ejs = require('ejs');
const multer = require('multer');
const path = require('path');


const app = express();
const port  = process.env.PORT || 3000;

// storage...
var storage = multer.diskStorage({
    destination: function(req,res, cb){
        cb(null, './public/myuploads')
    },
    filename: function(req, file, cb){
        cb(null, `${file.originalname}`);

        // file.fieldname + '_' + Date.now() + path.extname(file.originalname)
    }
})

var upload = multer({storage: storage}).single('profilepic');

// setup for ejs 
app.set('view engine', 'ejs');
// static folder
app.use(express.static('./public'));

app.get('/', (req, res) => {
    res.render('index');
})

//desc

app.post('/upload', (req,res)=>{
    upload(req, res, (error)=>{
        if (error) {
            res.render('index', {
                message: error
            })
        } else{
            res.render('index', {
                message: 'something went wrong!',
                filename: `myuploads/${req.file.filename}`
                
            })

        }
    })
})

app.listen(port, () => console.log(`server is running at ${port}...`))