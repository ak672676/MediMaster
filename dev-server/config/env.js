import express from "express";
import morgan from "morgan";
import cors from "cors";
import bodyParser from "body-parser";

export function setEnvironment(app){
    console.log("111111111");
    console.log("kkkkkkkkkk");
    console.log(process.env.NODE_ENV);
    if (!process.env.NODE_ENV || process.env.NODE_ENV.toString().trim() !== 'production') {
        setDevEnv(app);
    } else {
        setProdEnv(app);
    }

}

function setDevEnv(app){
    console.log("Setting the development environment");
    process.env.NODE_ENV="development";
    process.env.DB_URL='mongodb+srv://amit:amit@cluster0.nhmu0.mongodb.net/medi?retryWrites=true&w=majority'
    process.env.TOKEN_SECRET='ramu';
    app.use(bodyParser.json());
    app.use(morgan('dev'));
    app.use(cors());
    console.log("Setting the devlopment environment");

}   

function setProdEnv(app){
    process.env.DB_URL='mongodb+srv://amit:amit@cluster0.nhmu0.mongodb.net/medi?retryWrites=true&w=majority'
    process.env.NODE_ENV="production";//checking purpose only
    process.env.TOKEN_SECRET='ramu';
    app.use(bodyParser.json());
    app.use(express.static(__dirname+'/../../dist'));
    console.log("Setting the production environment");

}