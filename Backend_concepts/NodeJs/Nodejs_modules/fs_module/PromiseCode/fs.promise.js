// promises based fs module operations 



// with fs 
import fspromise from 'fs'


fspromise.promises
.readdir('./')
.then((data)=>{
    console.log(data)// this will give me 
})
.catch((err)=>{
    console.log(err)
})
