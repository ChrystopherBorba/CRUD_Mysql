

const express = require('express')
const app = express()
const port = newFunction()
const bodyParser = require('body-parser')
const dal = require('C:/Users/chrys/OneDrive/Área de Trabalho/CRUD/model/dal.js')
const handlebars = require('express-handlebars')

//template engine
app.engine('handlebars', handlebars({defaultLayout: 'main'}))
app.set('views engine', 'handlebars')

//body parser 
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

// rotas

// index
app.get('/', function(req, res){
    res.render('C:/Users/chrys/OneDrive/Área de Trabalho/CRUD/views/index.handlebars');
})


// Create
app.get('/create', function(req, res){
    res.render("C:/Users/chrys/OneDrive/Área de Trabalho/CRUD/views/create.handlebars");
})
app.post('/create', function(req, res){

    var nome = req.body.nome;
    var email = req.body.email;
    var idade = req.body.idade;
    //res.send("{nome:"+ nome + ", email:"+ email + ", idade:"+ idade +"}");

    //var status = new dal.Criar(nome, email, idade)  
    dal.Criar(nome, email, idade) 
    //console.log(status)
    //if (status) {
        res.redirect('/read')
    //}else{
        //console.log("Não foi possível incluir o usuário : " + status)
    //}
    
})

// Read
app.get('/read', function(req, res){
    //res.render("C:/Users/chrys/OneDrive/Área de Trabalho/CRUD/views/read.handlebars");
    dal.LerTodos().then(function(readAll){
        res.render("C:/Users/chrys/OneDrive/Área de Trabalho/CRUD/views/read.handlebars", {dados1:readAll})
    })
})


// Read by name 
app.get('/search', function(req, res){
    res.render("C:/Users/chrys/OneDrive/Área de Trabalho/CRUD/views/search.handlebars")
})
app.post('/search', function(req, res){
    var LerNome = req.body.nome;
    res.redirect('/search/'+ LerNome)
})
app.get('/search/:LerNome', function(req, res){
    dal.LerPorNome(req.params.LerNome).then(function(readByName){
        res.render("C:/Users/chrys/OneDrive/Área de Trabalho/CRUD/views/search.handlebars", {dados2:readByName})
    })
})




// Update
app.get('/update/:id', function(req, res){
    dal.LerPorId(req.params.id).then(function(readById){
        res.render("C:/Users/chrys/OneDrive/Área de Trabalho/CRUD/views/update.handlebars", {dados3:readById, id: req.params.id})
    })
})
app.post('/update', function(req, res){

    var id = req.body.id;
    var nome = req.body.nome;
    var email = req.body.email;
    var idade = req.body.idade;
    
    dal.Update(id, nome, email, idade) 

    res.redirect('/read')
})


// Delete
app.get('/delete/:id', function(req, res){
    dal.Delete(req.params.id).then(function(){
        res.redirect('/read')
    })
})

////////////////////////////////////////////////////////////////////////////////////////////////
app.listen(port, () =>{
    console.log('server running on http://localhost:'+port)
    console.log(__dirname);
})

function newFunction() {
    return 8080;
}
