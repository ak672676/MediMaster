<template>
  <div class="jumbotron custom-bg-dark">
    <h1 class="display-4" v-if="!$store.state.username">Hii,</h1>
    <h1 class="display-4" v-if="$store.state.username">Hii,{{$store.state.username.toUpperCase()}}</h1>
    <p class="lead">Always laugh when you can, it is cheap medicine.</p>
    <hr class="my-4">
    <p>Have a wonderful day ahead</p>
    <!-- <p class="lead">
      <a class="btn btn-primary btn-lg" href="#" role="button">Learn more</a>
    </p> -->
  </div>
</template>

<script>

export default {
  name: 'HelloWorld',
  props: {
    msg: String
  }
}
</script>


<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
