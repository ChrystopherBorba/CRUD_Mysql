
const db = require('./db') // chama o arquivo de conecta com o banco de dados 

// Cria uma tabela chamada "tabela" com: nome email e idade
const tabela = db.sequelize.define('tabela', {
    nome:{
        type: db.Sequelize.STRING
    },
    email:{
        type: db.Sequelize.STRING
    },
    idade:{
        type: db.Sequelize.INTEGER
    },
})

//tabela.sync({force:true}) // força a criação da tabela (executar só a primeira vez, depois deixar comentado)



// função create (INSERT)  
function Criar(nome, email, idade) {
    tabela.create({
        nome:nome,
        email: email,
        idade: idade
    })/*.then(function(){
        var status = true;
        return status
    }).catch(function(erro){
        var status = erro;
        return status;
    })*/
}

// função read (SELECT)

function LerTodos(){
    return tabela.findAll()
}

function LerPorNome(findName){
    return tabela.findAll({
        where:{
            nome:findName
        }
    })
}
function LerPorId(findId){
    return tabela.findAll({
        where:{
            id:findId
        }
    })
}

// função UPDATE by ID 

function Update(UpId, UpNome, UpEmail, UpIdade){
    return tabela.update({ nome: UpNome, email: UpEmail, idade: UpIdade }, {
        where: {
          id: UpId
        }
    })
}


// função DELETE by ID (DROP) 

function Delete(DelId){
    return tabela.destroy({
        where:{
            'id': DelId
        }
    })
}

// exportação de recursos para outros arquivos
module.exports={
    Criar,
    LerTodos,
    LerPorNome,
    LerPorId,
    Delete,
    Update
}
