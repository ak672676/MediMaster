import store from "../store";
import {http} from "./HttpService";
import jwt from "jsonwebtoken";

export function isLoggedIn(){
    const token=localStorage.getItem('token');
    console.log("from AuthService==> ",token!= null);
    return token!= null;
}

export function login(user){
    return http().post("/auth",user)
    .then(res=>{
        if(res){
            console.log(res);
            setToken(res.data.token);
            return res;
        }
        
    }).catch(err=>{
        // console.log(err.response.data.message);
        // console.log(err.response.data.message);
        return err;
    });
    
}

export function logout(){
    localStorage.clear();
    store.dispatch('authenticate');
}

export function getToken(){
    return localStorage.getItem('token');
}
function setToken(token){
    localStorage.setItem('token',token);
    store.dispatch('authenticate');
}

export function getUsername(){
   const token=decodeToken();
   if(!token){
       return null;
   }
   return token.user.shopName;
}

export function getUserId(){
    const token=decodeToken();
    if(!token){
        return null;
    }
    return token.user.id;
}
export function getUseDiscount(){
    const token=decodeToken();
    if(!token){
        return null;
    }
    return token.user.discount;
}
export function checkUserIsAdmin(){
    const token=decodeToken();
    if(!token){
        return null;
    }
    return token.user.isAdmin;
}

export function registerUser(user){
    return http().post("/register",user).then(res=>{
        if(res){
            return res;
        }
        
    }).catch(err=>{
        return err;
    });
}

function decodeToken(){
    const token =getToken();
    if(!token){
        return null;
    }
    return jwt.decode(token);
}