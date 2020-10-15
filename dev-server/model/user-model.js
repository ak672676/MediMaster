import mongoose from "mongoose";
const bcrypt = require("bcryptjs");
const userSchema=new mongoose.Schema({
   shopName:String,
   email:String,
   password:String,
   discount:Number,
   ledger:[{
       debit:Number,
       credit:Number,
       total:Number,
       remark:String,
       date:Date
   }],
   isAdmin:{type:Boolean,default:false}
});
userSchema.set('timestamps',true);

userSchema.statics.passwordMatches=function(password,encryptedPassword){
    // bcrypt.compare(password, encryptedPassword, function (err, result) {
    //     if (result == true) {
    //         return true;
    //     } else {
    //         return false;
    //     }
    //     })
    if (bcrypt.compareSync(password, encryptedPassword)) {
        return true;
    }else{
        return false;
    }
}

userSchema.pre('save', function(next){
   
    this.shopName=this.shopName.toLowerCase();
    // bcrypt.hash(this.password, 10, (err, encrypted) => {
    //     this.password = encrypted;
    //     console.log(this.password);
    //     next();
    // });
    // var salt = bcrypt.genSaltSync(10);
    // this.password  = bcrypt.hashSync(this.password, salt);
    // next();
    let hash = bcrypt.hashSync(this.password, 10);
    this.password=hash;
    next();
})
export default mongoose.model('user',userSchema);