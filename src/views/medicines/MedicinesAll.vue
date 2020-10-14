<template>
    <div class="d-flex flex-column">
        <div class="mb-4">
            <h1>Medicines List</h1>
            <router-link to="/medicine/new" v-if="$store.state.isAdmin" class="btn btn-success ml-2" exact>Add Medicine</router-link>
        </div>
        <div v-if="medicines && medicines.length>0" class="d-flex flex-wrap justify-content-start mb-2 ml-2">
            <!-- <div v-for="medicine in medicines" v-bind:key="medicine._id" class="card" style="width: 18rem;">    
                <div class="card-body mr-5">
                    <div class="d-flex justify-content-between">
                        <h5 class="card-title">{{medicine.name}}</h5>
                        <span>{{medicine.mrp}}</span>
                    </div>
                    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                     <div class="d-flex justify-content-between" v-if="$store.state.isAdmin">
                        <router-link type="button" tag="button" class="card-link btn btn-primary" :to="{ name: 'medicine-edit', params: { id: medicine._id } }"
                            exact>Edit</router-link>
                        <a v-on:click.prevent="currentMedicineId= medicine._id;deleteMedicine()" class="card-link btn btn-danger" href="#">Delete</a>
                    </div>
                </div>
            </div> -->
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
            <!-- <div id="accordion">
                <div class="card" v-for="(medicine,index) in medicines" v-bind:key="medicine._id">
                    <div class="card-header" id="medicine._id">
                        <h5 class="mb-0">
                            <button class="btn btn-link" data-toggle="collapse" :data-target="'#'+index"  aria-expanded="true" aria-controls="medicine._id">
                                {{medicine.name}}
                            </button>
                        </h5>
                    </div>

                    <div :id="index" class="collapse show" aria-labelledby="medicine._id" data-parent="#accordion">
                        <div class="card-body">
                            Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute,
                        </div>
                    </div>
                </div>
            </div> -->
            <!-- <a v-on:click.prevent="currentMedicineId= medicine._id;deleteTask()" class="card-link btn btn-danger" href="#" v-b-modal.modal1>Delete</a> -->
            <!-- <div>
                <b-modal id="modal1" ref="modal" centered title="Delete Confirmation">
                    <p class="my-4">Are you sure you would like to delete this medicine?</p>
                    <div slot="modal-footer" class="w-100 text-right">
                        <b-btn slot="md" class="mr-1" variant="danger" @click="deleteTask">Delete</b-btn>
                        <b-btn slot="md" variant="secondary" @click="cancelModal">Cancel</b-btn>
                    </div>
                </b-modal>
            </div> -->
            <div v-if="medicines && medicines.length === 0" class="ml-2">
                <div class="alert alert-info">No medicines found.</div>
            </div>
        </div>
    </div>
</template>
<script>
import * as medicineService from "../../services/MedicineService";
export default {
    name:"medicines-all",
    data:function(){
        return {
            medicines:null,
            currentMedicineId:null
        }
    },
    // beforeRouteEnter(to,from,next){
    //     medicineService.getAllMedicines()
    //     .then(res=>{
    //         console.log(res);
    //         next();
    //     });
    // }
    mounted(){

        medicineService.getAllMedicines()
        .then(res=>{
            console.log(res);
            console.log(res.data.medicines);
            this.medicines=res.data.medicines;
        });
    },
    methods: {
            cancelModal: function() {
                this.$refs.modal.hide();
                this.currentMedicineId = null;
            },
            deleteMedicine: async function() {
                // this.$refs.modal.hide();
                await medicineService.deleteMedicine(this.currentMedicineId);
                const index = this.medicines.findIndex(medicine => medicine._id === this.currentMedicineId);
                this.medicines.splice(index, 1);
                this.currentMedicineId = null;
            }
        }
}
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