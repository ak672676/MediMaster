<template>
  <div>
    <h1>This is Ledger Search</h1>
    <div>
        <form>
            <div class="form-group">
                <input
                    class="form-control"
                    type="text"
                    v-model="search"
                    @input="onChange"
                    placeholder="Search"
                />
            </div>  
        </form>   
    </div>
    <div>
        <div v-if="shops && shops.length>0" class="d-flex flex-wrap justify-content-start mb-2 ml-2">
            <div v-for="shop in shops" v-bind:key="shop._id"> 
                <!-- <p></p> -->
                <div class="card" @click="navigate(shop._id)">
                    <!-- <a :href="'/ledger/' + shop._id"> -->
                        <div class="card-body">
                        {{shop.shopName}}
                        </div>
                    <!-- </a> -->
                </div>
            </div>
        </div>
    </div>
  </div>
</template>
<script>
import * as ledgerService from "../../services/LedgerService";

export default {
name: 'ledger-search',
data() {
    return {
        search: '',
        shops:null
    };
},
methods: {
    onChange() {
        if(this.search){
            ledgerService.searchLedger(this.search)
            .then(res=>{
                console.log(res.data);
                console.log(res.data.shops);
                this.shops=res.data.shops;
            });
        }
    },
    navigate(id){
        console.log(id);
        this.$router.push({name:'ledger-detail',params:{id:id}});

    }
}
};
</script>
<style scoped>
.card-body{
    color: white;
    background-color: rgba(91, 91, 99, 0.877);
}
.card-header{
    color: black;
    font-size: 20px;
    font-weight: bold;
    padding-top: 3px;
    padding-bottom: 3px;
    
}
/* .a:hover{
    text-decoration: none;
} */
</style>