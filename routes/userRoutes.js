const Router = require('express').Router();
const userController = require('../controllers/userController');
const isAuth = require('../middlewares/authMiddleware');

//public routes
Router.post('/register', userController.register);
Router.post('/login', userController.login);
// private routes
Router.get('/me',isAuth, userController.me);

module.exports=Router;