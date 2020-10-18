<template>
    <div>
        <h1 class="text-center">Register</h1>
        <form class="custom-form" v-on:submit.prevent="onSubmit">
            <div v-if="error.length>0" class="alert alert-info" role="alert">
               <p v-for="(e,index) in error" v-bind:key="index">{{e}}</p>
            </div>
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
            isAdmin:false,
            error:[],
        }
    },
    methods:{
        onSubmit: async function(){
           this.error=[];
           const user={
               shopName:this.shopName,
               email:this.email,
               password:this.password,
               discount:this.discount,
               isAdmin:this.isAdmin
           }
           this.loginValidity();
            if(this.error.length===0){
                // const registerPromise=auth.registerUser(user);
                // await Promise.all([registerPromise]);
                // this.$router.push({name:'home'});
                await auth.registerUser(user).then((response)=>{
                    console.log('RESPONSE');
                   
                    if(response.status==201){
                        this.$router.push({name:'home'});
                        return;
                    }
                    this.error.push(response.response.data.message);
                  
                })
            }
           
        },
        loginValidity:function(){
            if(!this.email)
                this.error.push("Enter the Email");
            if(!this.shopName)
                this.error.push("Enter the Shop Name");
            if(!this.password)
                this.error.push("Enter the Password");
        }
    }
}
</script>
<style scoped>
p{
    color: red;
}
</style>