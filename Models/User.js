const mongoose=require('mongoose');
const bcrypt=require('bcryptjs');

const userSchema= new mongoose.Schema({
    email :{
        type :String , 
        required : [true, 'Please enter an email'],
        unique :true ,
    },
    password : {
        type : String ,
        required: [true, 'Please enter a password'],
        minlength: [6, 'Minimum password length is 6 characters'],
    },
    name :{
        type : String ,
        required :true 
    },
    phone : {
        type : String ,
        required :true 
    }

})
userSchema.pre('save',async function(next){
    const salt=await bcrypt.genSalt()
    this.password=await bcrypt.hash(this.password,salt)
    next()
})

userSchema.statics.login=async function(email,password){
    const user=await this.findOne({email})
    if(user){
    const auth =await bcrypt.compare(password,user.password)
    if(auth){
        return user
    }
    throw Error ('password incorrect')
    }
    throw Error('email incorrect')
}

const User = mongoose.model('User',userSchema)
module.exports=User