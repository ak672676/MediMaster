<template>
    <div>
        <h1>Edit Medicine</h1>
        <form class="custom-form" v-on:submit.prevent="onSubmit">
            <div class="form-group">
                <label for="name">Name</label>
                <input v-model="medicine.name" type="text" class="form-control" id="name" placeholder="Medicine Name">
                
            </div>
            <div class="form-group">
                <label for="composition">Composition</label>
                <input v-model="medicine.composition" type="text" class="form-control" id="composition" placeholder="Composition">
                
            </div>
            <div class="form-group">
                <label for="packing">Packing</label>
                <input v-model="medicine.packing" type="text" class="form-control" id="packing" placeholder="Packing">
                
            </div>
            <div class="form-group">
                <label for="company">Company</label>
                <input v-model="medicine.company" type="text" class="form-control" id="company" placeholder="Company">
                
            </div>
            <div class="form-group">
                <label for="mrp">MRP</label>
                <input v-model="medicine.mrp" type="number" step=".01" class="form-control" id="mrp" placeholder="MRP">
                
            </div>
            <div class="form-group">
                <label for="rate">Rate</label>
                <input v-model="medicine.rate" type="number" step=".01" class="form-control" id="rate" placeholder="Rate">
                
            </div>
            <div class="form-group">
               <button type="submit" class="btn btn-secondary">Update</button>
            </div>
            
        </form>
    </div>
</template>
<script>
import * as medicineService from "../../services/MedicineService";
// import {create} from "../../services/MedicineService";

export default {
    name:'medicine-edit',
    data:function(){
        return {
            medicine:{
                name:'',
                composition:"",
                packing:"",
                company:"",
                mrp:null,
                rate:null
            }
        }
    },
    methods:{
        onSubmit:async function(){
            console.log("amit");
            const request={
              medicine:this.medicine
           }
            await medicineService.updateMedicine(request);
                // await create(request);
           
            this.$router.push({name:'medicines-all'});
        }
    },
    mounted(){
        medicineService.getMedicineById(this.$route.params.id)
        .then(response=>{
            if(!response){
                this.$router.push({name:'medicines-all'});
            }else{
                console.log(response);
                this.medicine=response.data.medicine;
            }
        })
    
    }
}
</script>