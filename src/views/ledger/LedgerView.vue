<template>
    <div class="fluid-container">
        <div v-if="shop">
            <div>
                <h2>{{shop.shopName.toUpperCase()}}</h2>
                <h5>{{shop.email}}</h5>

            </div>
            <hr>
            <div v-if="shop.ledger && shop.ledger.length>0" >
                <table class="table">
                    <thead class="thead-dark">
                        <tr>
                            <th scope="col">Remark</th>
                            <th scope="col">Date</th>
                            <th scope="col">Debit</th>
                            <th scope="col">Credit</th>
                            <th scope="col">Balance</th>  
                        </tr>
                    </thead>
                    <tbody>
                         <tr v-for="led in shop.ledger" v-bind:key="led._id">
                             <td>{{led.remark}}</td>
                             <td>{{led.date}}</td>
                             <td>{{led.debit}}</td>
                             <td>{{led.credit}}</td>
                             <td>{{led.total}}</td>

                         </tr>
                    </tbody>
                </table>
            </div>
            <hr>
        </div>
    </div>
</template>
<script>
import * as ledgerService from "../../services/LedgerService";

export default {
    name: 'ledger-view',
    data(){
        return {
            shop:null
        }
    },
    mounted(){
        ledgerService.getUser(this.$store.state.userId)
        .then(response=>{
            if(!response){
                this.$router.push({name:'ledger-search'});
            }else{
                
                this.shop=response.data.shop;
                console.log(this.shop);
            }
        })
    
    }
}
</script>