import express from 'express';
import bcrypt from 'bcrypt-nodejs';
import cors from 'cors';
import knex from 'knex';


import {handleRegister} from './controllers/register.js';
import {handleSignin} from './controllers/signin.js';
import {handleProfileGet} from './controllers/prifile.js';
import {handleApiCall, handleImage} from './controllers/image.js';



 

const db = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'postgres',
      password : 'test',
      database : 'smartbrain'
    }
  });

const app = express();
app.use(express.json());
app.use(cors());

//REGISTER
app.post('/register' , (req,res) => { handleRegister(req, res, db, bcrypt)});

//SIGNIN
app.post('/signin' , (req,res) => { handleSignin(req, res, db, bcrypt)});

//UPDATE PROFILE
app.post('/profile/:id' , (req,res) => { handleProfileGet(req, res, db)});

  
//ENTRIES COUNTS
app.put('/image' , (req,res) => { handleImage(req, res, db)});

app.post('/imageurl' , (req,res) => { handleApiCall(req, res)});




app.listen(3000, ()=>{
    console.log('app is running at port 3000');
})

