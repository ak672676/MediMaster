import { StringUtil } from '../../utilities/string-util';
import User from "../../model/user-model";
import { generateJWT } from '../../services/auth-service';

export function index(req,res){
    const validation=validateIndex(req.body);
    if(!validation.isValid){
        return res.status(400).json({message:validation.message})
    }

    User.findOne({email:req.body.email},(error,user)=>{
        if(error){
            return res.status(500).json({message:"Internal Server Error"});
        }
        if(!user){
            return res.status(401).json({message:"Unauthorized client"});
        }

       const passwordsMatch=User.passwordMatches(req.body.password,user.password);
       if(!passwordsMatch){
           return res.status(401).json({message:"Password does not match"});
       }
       const token=generateJWT(user);
       return res.status(200).json({token:token});
    })

}

function validateIndex(body) {
    let errors = '';
 
    if (StringUtil.isEmpty(body.password)) {
        errors += 'Password is required. ';
    }
    if (StringUtil.isEmpty(body.email)) {
        errors += 'First name is required. ';
    }

    return {
        isValid: StringUtil.isEmpty(errors),
        message: errors
    }
}