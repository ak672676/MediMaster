<template>
    <div>
        <h1 class="text-center">Register</h1>
        <form class="custom-form" v-on:submit.prevent="onSubmit">
            <div class="form-group">
                <label for="shopName">Shop Name</label>
                <input v-model="shopName" type="text" class="form-control" id="shopName" placeholder="Shop Name">
            </div>
            <div class="form-group">
                <label for="email">Email</label>
                <input v-model="email" type="text" class="form-control" id="email" placeholder="Email">
            </div>
            <div class="form-group">
                <label for="password">Password</label>
                <input v-model="password" type="password" class="form-control" id="password" placeholder="Password">
            </div>
            <div class="form-group">
                <label for="discount">Discount</label>
                <input v-model="discount" type="number"  step=".01" class="form-control" id="discount" placeholder="Discount">
            </div>
            <div class="form-check">
                <input v-model="isAdmin" type="checkbox" class="form-check-input" id="isAdmin">
                <label  class="form-check-label" for="isAdmin">Make Admin</label>
            </div>
            <div class="form-group">
               <button type="submit" class="btn btn-secondary">Register</button>
            </div>
            
        </form>
    </div>
</template>
<script>

import * as auth from "../../services/AuthService";

export default {
    name:'register',
    data:function(){
        return {
            shopName:'',
            email:'',
            password:'',
            discount:0,
            isAdmin:false
        }
    },
    methods:{
        onSubmit: async function(){
           
           const user={
               shopName:this.shopName,
               email:this.email,
               password:this.password,
               discount:this.discount,
               isAdmin:this.isAdmin
           }
           const registerPromise=auth.registerUser(user);
        //    const loginPromise=auth.login(user);
           await Promise.all([registerPromise]);
           this.$router.push({name:'home'});
        }
    }
}
</script>