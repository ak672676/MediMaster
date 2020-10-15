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
            <div>
                <form class="form-inline" v-on:submit.prevent="onSubmit">
                    <textarea v-model="newEntry.remark"  class="form-control mr-2 mb-1" placeholder="Remark" ></textarea>
                    <input v-model="newEntry.date" type="date" min="1000-01-01"
                        max="3000-12-31" class="form-control mr-2 mb-1">
                    <input v-model="newEntry.debit" type="number" class="form-control mr-2 mb-1" placeholder="Debit" >
                    <input v-model="newEntry.credit" type="number" class="form-control mr-2 mb-1" placeholder="Credit">
                     
                    <button type="submit" class="btn btn-info mr-2 mb-1">submit</button>

                </form>
                
            </div>
        </div>
    </div>
</template>
<script>
import * as ledgerService from "../../services/LedgerService";

export default {
    name: 'ledger-detail',
    data(){
        return {
            shop:null,
            newEntry:{
                remark:"",
                date:Date,
                debit:null,
                credit:null
            }
        }
    },
    mounted(){
        ledgerService.getUser(this.$route.params.id)
        .then(response=>{
            if(!response){
                this.$router.push({name:'ledger-search'});
            }else{
                
                this.shop=response.data.shop;
                console.log(this.shop);
            }
        })
    
    },
    methods:{
        onSubmit:async function(){

            const request={
              newEntry:this.newEntry,
              shopId:this.shop._id
            }
         
            await ledgerService.updateLedger(request);
            ///ADDING ON FRONTEND
            this.newEntry.total=0;
            if(this.shop.ledger.length==0){
                if(this.newEntry.credit){
                    this.newEntry.total=this.newEntry.credit;
                }else{
                    this.newEntry.total=this.newEntry.total-this.newEntry.debit;
                }
                this.shop.ledger.push(this.newEntry);
            }else{
                var lastEntry=this.shop.ledger[this.shop.ledger.length-1];
                if(this.newEntry.credit){
                    this.newEntry.total=Number(lastEntry.total)+Number(this.newEntry.credit);
                }else{
                    this.newEntry.total=Number(lastEntry.total)-Number(this.newEntry.debit);
                }
                this.shop.ledger.push(this.newEntry);
            }
            
            // this.$router.push({name:'medicines-all'});
            this.$router.push({name:'ledger-detail',params:{id:this.shop._id}});
        }
    }
}
</script>