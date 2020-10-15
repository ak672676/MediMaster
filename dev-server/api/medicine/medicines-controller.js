import User from "../../model/user-model";
import Medicine from "../../model/medicine-model";
import * as auth from "../../services/auth-service";

export function index(req,res){
    Medicine.find({},(error,medicines)=>{
        if(error){
            return res.status(500).json();
        }
        return res.status(200).json({medicines:medicines});
    })
}

export function create(req,res){
    const id=auth.getUserId(req);
    User.findOne({_id:id},(error,user)=>{
        if(error && !user){
            return res.status(500).json();
        }

        const medicine  =new Medicine(req.body.medicine);
        medicine.save(error=>{
            if(error){
                return res.status(500).json();
            }
            return res.status(204).json();
        })
    })
}

export function update(req,res){
    const id=auth.getUserId(req);
 
    User.findOne({_id:id},(error,user)=>{
        if(error){
            return res.status(500).json();
        }
        if(!user){
            return res.status(404).json();
        }
        const medicine  =new Medicine(req.body.medicine);
        Medicine.findByIdAndUpdate({_id:medicine._id},medicine,error=>{
            console.log(error);
            if(error){
                return res.status(500).json();
            }
            console.log("bbbbbbbb");

            return res.status(204).json({message:medicine});
        })
    })
}

export function remove(req,res){
    const id=auth.getUserId(req);
    console.log("from delete---> ",id);
    User.findOne({_id:id},(error,user)=>{
        if(error){
            return res.status(500).json();
        }
        if(!user){
            return res.status(404).json();
        }

        if(!user.isAdmin){
            return res.status(403).json({message:"You are not allowed to delete a medicine"});
        }
        Medicine.deleteOne({_id:req.params.id},error=>{
            if(error){
                return res.status(500).json();
            }
            return res.status(204).json();
        })
    })
}

export function show(req,res){
    Medicine.findOne({_id:req.params.id},(error,medicine)=>{
        if(error){
            return res.status(500).json();
        }
        if(!medicine){
            return res.status(404).json();
        }
        return res.status(200).json({medicine:medicine});
    })
}

export function search(req,res){
    let medicines=[];
    // var flag=0;
    Medicine.find({"name":{$regex:req.params.keyword,$options:'i'}},(error,medicinesByName)=>{
        if(error){
            return res.status(500).json();
        }
        if(medicinesByName)
            medicines.push(...medicinesByName);
        Medicine.find({"composition":{$regex:req.params.keyword,$options:'i'}},(error,medicinesByComposition)=>{
            if(error){
                return res.status(500).json();
            }
            if(medicinesByComposition){
                // for(var med in medicinesByComposition){
                    
                //     for(var medi in medicinesByComposition){
                //         if(medi.name==med.name){
                //             flag;
                //         }
                //     }
                // }
                medicines.push(...medicinesByComposition);
            }
            return res.status(200).json({medicines:medicines});
        })
        // return res.status(200).json({medicines:medicines});
    })
}