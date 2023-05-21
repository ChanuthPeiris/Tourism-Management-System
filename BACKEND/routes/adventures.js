const router = require ("express").Router();
const { response } = require("express");
let adventure = require("../models/adventure");  
 

router.route("/add").post((req,res)=>{
    const userName = req.body.userName;
    const email =req.body.email;
    const telephone =Number(req.body.telephone);
    const place=req.body.place;
    const [dateString1, timeString1] = req.body.date_and_time.split('T');
    const [year1, month1, day1] = dateString1.split('-');
    const [hours1, minutes1, seconds1] = timeString1.split(':');
    const date_and_time= new Date(year1, month1-1, day1, hours1, minutes1);
    const countOFmembers=Number(req.body.countOFmembers);


    const newadventure = new adventure({
        userName,
        email,
        telephone,
        place,
        date_and_time,
        countOFmembers
        
    })
     newadventure.save().then(()=>{
        res.json("Booked successfully")
     }).catch((err)=>{
        console.log(err);

     })
 })
     router.route("/").get((req,res)=>{
        
        adventure.find().then((adventures)=>{
            res.json(adventures)
        }).catch((err)=>{
            console.log(err)
        })
})
 
    router.put('/update/:id',(req,res)=>{
        adventure.findByIdAndUpdate(
            req.params.id,
            {
                $set:req.body
            },
            (err,post)=>{
                if(err){
                    return res.status(400).json({error:err});
                }
    
                return res.status(200).json({
                    success:"Updated Successfully"
                    
                });
            }
        );
    });


 

    router.delete("/delete/:id",(req,res) =>{
        adventure.findByIdAndRemove(req.params.id).exec((err,deletePost) =>{
    
            if(err) return res.status(400).json({
                message:"Delete Unsuccessfull",err
            });
    
            return res.json({
                message:"Delete Successfull",deletePost
            });
        });
    });



     router.route("/get/:id").get(async(req,res)=>{
        let userId = req.params.id;
        const user = await adventure.findById(userId)
        .then((adventure)=>{
            res.status(200).send({status:"user fetched",adventure})
        }).catch((err)=>{
            console.log(err.message);
            res.status(500).send({status:"error with get user",error:err.message});
        })
            
        })
      

     module.exports=router;


