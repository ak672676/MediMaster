import express from "express";
const app = express();
import {registerRoutes} from './routes';
import {setEnvironment} from "./config/env";
import  {connectToDB} from "./config/db";

console.log("Node Server Started");
setEnvironment(app);
connectToDB();
registerRoutes(app);

app.get('/', (req, res) => {
  // if(process.env.NODE_ENV!=='production'){
  if (!process.env.NODE_ENV || process.env.NODE_ENV.toString().trim() !== 'production') {
    console.log("kkkkkkkkkk");
    console.log(process.env.NODE_ENV);
      return res.send('Running Server in development mode');
  }else{
      return res.sendFile('index.html',{root:__dirname+"/../dist/"})
  }
})

console.log("Testing the changes");

console.log(process.env.PORT);
const port = process.env.PORT || 8080;
console.log("Testing the changes");


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port} `+process.env.NODE_ENV +" mode")
})