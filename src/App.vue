<template>
  <div id="app">
    <Navbar />
    <div id="app-container">
      <router-view />
    </div>
    <Footer />
  </div>
</template>


<script>
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// import store from "./store";
// console.log(11111);
// console.log(store);

export default {
  name:'app',
  components:{
    Navbar,Footer
  },
  beforeCreate:function(){

    // console.log("Before");
    // console.log(this.$store);
    this.$store.dispatch('authenticate');
  }
}
</script>
<style>

</style>
