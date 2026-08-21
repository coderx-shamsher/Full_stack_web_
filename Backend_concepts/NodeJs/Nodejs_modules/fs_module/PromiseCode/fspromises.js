import fspromise from "fs/promises";

// read directory -> like ls

// fspromise
// .readdir('./sh')
// .then((data)=>console.log(data))
// .catch((err)=> console.log(err))

// fspromise
//   .readdir("./sh")
//   .then((data) => {
//     console.log();
//     console.log("--------------->");
//     console.log(data, typeof data);
//     console.log("--------------->");
//   })

//   .catch((err) => console.log(err));


let data = `
#!/bin/bash

echo "this is for testing variables in bash"

  #creating variables in bash 
   name="coder0x"


  ## how to access or print the values of variables 
  echo $name
  echo " "

`

// file create 
// fspromise.writeFile("./bash/variables.bash",data)
// .then(()=>{
//     console.log("File created successfuly")
// })
// .catch((err)=>{
//     console.log("ERROR : \n",err)
// })



// unlinking files -> (deleting files)
// fspromise.unlink('./bash/variables.bash')
// .then(()=>{
//     console.log("FIle unlinked...")
// })
// .catch((Err)=>{
//     console.log(Err)
// })

// file Content Reading 
fspromise.readFile('./bash/variables.bash')
.then((result) => {
    // console.log(result)    
    console.log(result.toString())    
}).catch((err) => {
    console.log(err)
});

// appendig new data into a file 

let updateddata = `
num=10
echo "this is num $num"
`
// fspromise.appendFile("./bash/variables.bash",updateddata)
// .then(() => {
//     console.log("data is appneded into a file.. ")
// }).catch((err) => {
//     console.log(err)
// });
