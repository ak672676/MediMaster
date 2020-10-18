import { createRouter,createWebHistory } from 'vue-router';
// import { createRouter,createWebHashHistory } from 'vue-router';


// import Vue from 'vue'
// import Router from 'vue-router'
// import VueRouter from 'vue-router';


import Home from '../views/Home.vue';
import Login from "../views/authentication/Login.vue";
import Register from "../views/authentication/Register.vue";
import MedicineCreate from "../views/medicines/MedicineCreate.vue";
import MedicinesAll from "../views/medicines/MedicinesAll";
import MedicineEdit from "../views/medicines/MedicineEdit.vue";
import MedicineSearch from "../views/medicines/MedicineSearch";
import LedgerSearch from "../views/ledger/LedgerSearch";
import LedgerDetail from "../views/ledger/LedgerDetail";
import LedgerView from "../views/ledger/LedgerView";


import * as auth from "../services/AuthService";

console.log("holaaaaaaaaaaaaaa");
console.log(auth.isLoggedIn());
const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path:"/medicine/new",
    name:'medicine-create',
    component:MedicineCreate,
    beforeEnter:(to,from,next)=>{
      if(auth.isLoggedIn()){
        next();
      }else{
        next("/login");
      }
    }
   },
   {
    path:"/medicines",
    name:'medicines-all',
    component:MedicinesAll,
    beforeEnter:(to,from,next)=>{
      if(auth.isLoggedIn()){
        next();
      }else{
        next("/login");
      }
    }
   },
   {
    path:"/medicine/:id",
    name:'medicine-edit',
    component:MedicineEdit,
    beforeEnter:(to,from,next)=>{
      if(auth.isLoggedIn()){
        next();
      }else{
        next("/login");
      }
    }
   },
   {
    path:"/medicine/search",
    name:'medicine-search',
    component:MedicineSearch,
    beforeEnter:(to,from,next)=>{
      if(auth.isLoggedIn()){
        next();
      }else{
        next("/login");
      }
    }
   },
   {
    path:"/ledger/search",
    name:'ledger-search',
    component:LedgerSearch,
    beforeEnter:(to,from,next)=>{
      if(auth.isLoggedIn()){
        next();
      }else{
        next("/login");
      }
    }
   },
   {
    path:"/ledger/:id",
    name:'ledger-detail',
    component:LedgerDetail,
    beforeEnter:(to,from,next)=>{
      if(auth.isLoggedIn()){
        next();
      }else{
        next("/login");
      }
    }
   },
   {
    path:"/ledger/view",
    name:'ledger-view',
    component:LedgerView,
    beforeEnter:(to,from,next)=>{
      if(auth.isLoggedIn()){
        next();
      }else{
        next("/login");
      }
    }
   },
   {
    path:"/register",
    name:'register',
    component:Register,
    beforeEnter:(to,from,next)=>{
      if(auth.isLoggedIn()){
        next();
      }else{
        next("/");
      }
    }
   },
   {
    path:"/login",
    name:'login',
    component:Login,
    beforeEnter:(to,from,next)=>{
      if(!auth.isLoggedIn()){
        next();
      }else{
        console.log(auth.isLoggedIn());
        console.log("Login Failed");
        next("/");
      }
    }
   },
   {
    path:'/:catchAll(.*)',
    redirect:'/'
   }
];
const routerHistory = createWebHistory();
const router = createRouter({
  routes,
  history: routerHistory, 
  linkActiveClass: 'active'
})
// const router = createRouter({
//   routes,
//   history: createWebHashHistory(), 
//   mode:'history',
//   linkActiveClass: 'active'
// })

// router.beforeEach((to,from,next)=>{
//   if(isLoggedIn){
//     next();
//   }else{
//     next("/login");
//   }
// })

export default router
