const fspromises=require('fs').promises
const path=require('path')
const {v4:uuid}=require('uuid')
const {format}=require('date-fns')
const genlogs=async(message,filename)=>{
    const dateTime=format(new Date(),'ddMMyyyy\thh:MM:ss')
    const uid=uuid()
    const llog=`${dateTime}---${uid}---${message}\n`
    try{
        await fspromises.appendFile(path.join(__dirname,filename),llog)
    }catch(err){
        console.error(err)
    }
}
module.exports=genlogs