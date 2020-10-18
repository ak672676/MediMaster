<template>
    <div>
        <h1>Login</h1>
        <form class="custom-form" v-on:submit.prevent="onSubmit">
            <div v-if="error.length>0" class="alert alert-info" role="alert">
               <p v-for="(e,index) in error" v-bind:key="index">{{e}}</p>
            </div>
            <div class="form-group">
                <label for="email">Email</label>
                <input v-model="email" type="text" class="form-control" id="email" placeholder="Email">
                
            </div>
            <div class="form-group">
                <label for="password">Password</label>
                <input v-model="password" type="password" class="form-control" id="passeord" placeholder="Password">
            </div>
            <div class="form-group">
               <button type="submit" class="btn btn-secondary">Submit</button>
            </div>
            
        </form>
    </div>
</template>
<script>
import * as auth from "../../services/AuthService";

export default {
    name:'login',
    data:function(){
        return {
            email:'',
            password:'',
            error:[],
        }
    },
    methods:{
        onSubmit:async function(){
            this.error=[];
            const user={
               email:this.email,
               password:this.password,
           }
           this.loginValidity();
           if(this.error.length===0){
                await auth.login(user).then((response)=>{
                    console.log('RESPONSE');
                   
                    if(response.status==200){
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