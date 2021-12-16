const express = require('express');
const app = express.Router();
const controller = require('../Controller/userController');


/**
 * @swagger
 *  tags:
 *      name: User
 *      description: User API.
*/


//creating a middleware
const isAuth = (req, res, next)=>{
    if(req.session.isAuth){
        next();
    }else{
        res.send(`<a href="/login">Login First</a>`);
    }
}

app.use(express.json());

/**
 * @swagger
 * /signup:
 *  post:
 *      summary: Register new user
 *      tags: [User]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/User'
 *                  example:
 *                      username: asd
 *                      email: golshanjimee@gmail.com
 *                      password: asd
 *                      passwordConf: asd
 *      responses:
 *          200:
 *              description: User registration successful
 *              content:
 *                   application/json:
 *                         schema:
 *                             $ref: '#/components/schemas/User'
 *          400:
 *              description: Error
 */



//sign up routes
app.get('/signup', async (req, res)=> {
	return res.render('signup.ejs');
});

app.post('/signup', controller.signUp);

//login routes
app.get('/login', async (req, res)=> {
	return res.render('login.ejs');
});

/**
 * @swagger
 * /login:
 *  post:
 *      summary: Login to play game
 *      tags: [User]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/User'
 *                  example:
 *                      email: golshanjimee@gmail.com
 *                      password: asd
 *      responses:
 *          200:
 *              description: Successfully logged in
 *              content:
 *                   application/json:
 *                         schema:
 *                             $ref: '#/components/schemas/User'
 *          400:
 *              description: Error
 */
app.post('/login', controller.logIn);

//game route
app.get('/game',isAuth, async (req, res)=> {
    try{
        res.render('game.ejs');
    }catch(error){
        res.send(error);
    }
});

//logout route
app.post('/logout', controller.logOut);

module.exports = app;