<template>
    <div>
        <h1>Login</h1>
        <form class="custom-form" v-on:submit.prevent="onSubmit">
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
        }
    },
    methods:{
        onSubmit:async function(){
            const user={
               email:this.email,
               password:this.password,
           }
            await auth.login(user);
           
            this.$router.push({name:'home'});
        }
    }
}
</script>