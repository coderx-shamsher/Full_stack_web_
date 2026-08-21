// crud using fs with aync-await 

import fs from 'fs/promises'

// ager ham fs ko import krte hain to hame 
/// fs.promises.readdir() esa krna hota hai ! ager esea nhi krna then import fs/promises

async function readfolder(){
    try {
        let ls = await fs.readdir('./sh')
        console.log(ls)
    } catch (err) {
        console.log(err)
    }
}


// readfolder()



let readfilecontent = async () =>{
    try {
        let data = await fs.readFile('./bash/variables.bashss')
        console.log(data.toString())
    } catch (error) {
        console.log(" --------❌----------❌---------❌-------")
        console.log("Error",error.message)
    }
}


// readfilecontent()

// ese he ham baki methods bhi use kr skte hain with async-await+try-catch syntax , aur yeh bhot use hota hai 


