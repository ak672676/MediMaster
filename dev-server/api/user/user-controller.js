import User from "../../model/user-model";

export function index(req,res){
  
    return res.json({message:'Helloss World'})
}

export function getShopById(req,res){

    User.findOne({_id:req.params.id},(error,shop)=>{
        if(error){
            return res.status(500).json();
        }
        if(!shop){
            return res.status(404).json({message:"AMIT"});
        }
        return res.status(200).json({shop:shop});
    })
}

export function search(req,res){
    // let shops=[];
    User.find({"shopName":{$regex:req.params.keyword,$options:'i'}},(error,shops)=>{
        if(error){
            return res.status(500).json();
        }
        return res.status(200).json({shops:shops});
    })

}

export function updateLedger(req,res){
    const shopId=req.body.shopId;
    var newEntry=req.body.newEntry;
    User.findOne({_id:shopId},(error,shop)=>{
        if(error){
            return res.status(500).json();
        }
        console.log("BEFORE SAVE");
        console.log(shop);
        var ledger=shop.ledger;
        newEntry.total=0;
        if(ledger.length==0){
            if(newEntry.credit){
                newEntry.total=newEntry.credit;
            }else{
                newEntry.total=newEntry.total-newEntry.debit;
            }
            shop.ledger.push(newEntry);
        }else{
            var lastEntry=ledger[ledger.length-1];
            if(newEntry.credit){
                newEntry.total=Number(lastEntry.total)+Number(newEntry.credit);
            }else{
                newEntry.total=Number(lastEntry.total)-Number(newEntry.debit);
            }
            shop.ledger.push(newEntry);
        }

        shop.save((error,cus)=>{
            if(error){
                console.log("Error");
                return res.status(500).json();
            }
            console.log("AFTER SAVE");
            console.log(cus);
            return res.status(204).json({message:"All Good"});
        });
    })

    
}