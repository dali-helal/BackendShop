const Watch=require('../Models/Watch.js')
const mongoose=require('mongoose')

const GetAllWatchFilter= async (req,res)=>{
   let { FilterColor,FilterGender,FilterPrice,FilterMark}=req.body
   console.log(FilterColor,FilterGender,FilterPrice,FilterMark)
   if(FilterColor.length==0){
    FilterColor=["Black","Gold","Silver","Brown","Blue","Blanc"]
   }
   if(FilterGender.length==0){
    FilterGender=["men","women"]
   }
   if(FilterMark.length==0){
    FilterMark=["Swatch","Festina","Toms","Q&Q","Tissot","Rinnady","Ferro","Migeer","Ck"]
   }
   if(FilterPrice.length==0){
    FilterPrice=[0,1500]
   }
  try{
         let watches= await Watch.find()
         .where("color")
         .in(FilterColor)
         .where("marque")
         .in(FilterMark)
         .where("gender")
         .in(FilterGender)
         watches=watches.filter((item)=> item.price>=FilterPrice[0] && item.price <= FilterPrice[1])
         res.status(200).json(watches)
  }catch(err){
    console.log(err)
  }
}
const GetAllWatch= async (req,res)=>{
  try{
   const watches=await Watch.find({}).sort({createdAt :1})
   res.status(200).json(watches)
  }catch(err){
    console.log(err)
  }
 
}
const GetFeaturedProducts=async (req,res)=>{
  const watches=await Watch.find({}).limit(8).sort({createdAt :1})
  res.status(200).json(watches)
}

// get a single watch 
const GetWatch=async(req,res)=>{
    const {id}=req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such watch'})
    }

    const watch=await Watch.findById(id)
     
    if(!watch){
        return res.status(404).json({error : "No such watch"})
    }
    res.status(200).json(watch)
}

// create a watch 
const createWatch =async (req,res)=>{
  const {title,color,marque,price,picture,gender,quantity}=req.body

  try{
   const watch=await Watch.create({title,color,marque,price,picture,gender,quantity})
   res.status(200).json(watch)
  }
  catch(error){
    res.status(400).json({error : error.message})
  }
}
const updateWatch = async (req, res) => {
    const { id } = req.params
  
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({error: 'No such watch'})
    }
  
    const watch = await Watch.findOneAndUpdate({_id: id}, {
      ...req.body
    })
  
    if (!watch) {
      return res.status(400).json({error: 'No such watch'})
    }
  
    res.status(200).json(watch)
  }
module.exports={
    GetAllWatch,
    GetWatch,
    createWatch,
    updateWatch,
    GetFeaturedProducts,
    GetAllWatchFilter
}