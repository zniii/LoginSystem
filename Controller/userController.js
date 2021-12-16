const express = require('express');
const User = require('../module/userModule');
const mongoose = require('mongoose');


const signUp = async(req,res)=>{
    const personInfo = req.body;
    console.log(req.body)

	//looking if every field are present
	if(!personInfo.email || !personInfo.username || !personInfo.password || !personInfo.passwordConf){
        res.status(400).send(error);
	} else {
		//checking password and re-confirm password
		if (personInfo.password == personInfo.passwordConf) {
			//checking if email already exists
            const value = await User.findOne({'email':req.body.email});
				if(!value){
					User.findOne({},function(err,data){
						//creating new object
						let newPerson = new User({
                            "_id": mongoose.Types.ObjectId(),
							"email":req.body.email,
							"username": req.body.username,
							"password": req.body.password,
							"passwordConf": req.body.passwordConf
						});

						//saving in database
						newPerson.save(function(err, Person){
							if(err){
								console.log(err);
							}
							else{
								console.log('Successfully registered');
							}
						});
					});
					res.send({"Success":"You are regestered,You can login now."});
				}else{
					res.send({"Success":"Email is already used."});
				}
		}else{
			res.send({"Success":"password is not matched"});
		}
	}
}

//log in controller
const logIn = async(req,res)=>{
	//checking email in database
    User.findOne({email:req.body.email},function(err,data){
		if(data){
			//authenticating password
			if(data.password==req.body.password){
				//creating session after successfull login
                req.session.isAuth = true;
				res.status(200).send({"Success":"Success!"});
				
			}else{
				res.status(400).send({"Success":"Wrong password!"});
			}
		}else{
			res.status(400).send({"Success":"This Email Is not regestered!"});
		}
	});
}

//logout controller
const logOut = async(req,res)=>{
	//destroying session from the database to prevent acessing the game data without loggin in
    req.session.destroy((err)=>{
        if(err){
            throw err;
        }else{
            res.redirect('/login');
        }
    })
}

module.exports = {
    signUp,
    logIn,
    logOut
}