import mongoose from "mongoose";

const medicineSchema=new mongoose.Schema({
    name:String,
    composition:String,
    packing:String,
    company:String,
    mrp:Number,
    rate:Number
});


medicineSchema.set('timestamps',true);
medicineSchema.pre('save',function(next){
    this.name=this.name.toLowerCase();
    this.composition=this.composition.toLowerCase();
    this.company=this.company.toLowerCase();
    next();
})
export default mongoose.model('medicine',medicineSchema);