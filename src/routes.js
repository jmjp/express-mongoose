const {Router} = require('express');
const { route } = require('./app');
const routes = Router();
const AuthController = require('./controllers/AuthController');
 
routes.get('/',function(req,res){
    return res.json({
        ok:true
    })
})

routes.get('/teste',AuthController.index)
routes.post('/register', AuthController.register)
routes.post('/login',AuthController.login)

module.exports = routes;