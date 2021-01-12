const Sequelize = require('Sequelize')
const sequelize = new Sequelize('nome do banco', 'usuário', 'senha', {
    host:"localhost",
    dialect:"mysql"
})

sequelize.authenticate().then(function(){
    console.log("Database connected succesfully")
}).catch(function(erro){
    console.log("fail to conect on Database: " + erro)
})

module.exports={
    Sequelize: Sequelize,
    sequelize: sequelize
}
