<template>
    <div>
        <h1>Search Medicine</h1>
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
            <div v-if="medicines && medicines.length>0" class="d-flex flex-wrap justify-content-start mb-2 ml-2">
                <div v-for="medicine in medicines" v-bind:key="medicine._id"> 
                    <div class="card" style="margin:2px">
                        <div class="card-header">
                            {{medicine.name.toUpperCase()}}
                        </div>
                        <div class="card-body">
                            <p class="card-text"><span style="font-size:18px;font-weight: bold;">Composition: </span>{{medicine.composition}}</p>
                            <p class="card-text"><span style="font-size:18px;font-weight: bold;">Pack:</span> {{medicine.packing}}</p>
                            <p class="card-text"><span style="font-size:18px;font-weight: bold;">Company : </span>{{medicine.company}}</p>

                            <a href="#" style="font-size:15px;margin-bottom:2px;" class="badge badge-success">Rate {{medicine.rate}}</a>
                            <br /><a href="#" style="font-size:15px;margin-bottom:5px;" class="badge badge-warning">MRP {{medicine.mrp}}</a>
                            <div class="d-flex justify-content-between" v-if="$store.state.isAdmin">
                                <router-link type="button" tag="button" class="card-link btn btn-primary" :to="{ name: 'medicine-edit', params: { id: medicine._id } }"
                                    exact>Edit</router-link>
                                <a v-on:click.prevent="currentMedicineId= medicine._id;deleteMedicine()" class="card-link btn btn-danger" href="#">Delete</a>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-if="medicines && medicines.length === 0" class="ml-2">
                    <div class="alert alert-info">No medicines found.</div>
                </div>
            </div>
        </div> 
    </div>
</template>
<script>
import * as medicineService from "../../services/MedicineService";

export default {
name: 'medicine-search',
data() {
    return {
        search: '',
        medicines:null
    };
},
methods: {
    onChange() {
        if(this.search){
            medicineService.searchMedicine(this.search)
            .then(res=>{
                console.log(res.data.medicines);
                this.medicines=res.data.medicines;
            });
        }
    }
}
};
</script>
<style  scoped>
.card-body{
    color: black;
    background-color: rgba(91, 91, 99, 0.877);
}
.card-header{
    color: black;
    font-size: 20px;
    font-weight: bold;
    padding-top: 3px;
    padding-bottom: 3px;
    
}
</style>