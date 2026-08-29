# Authentication with examples 

> **Authentication = "Tum kaun ho?" verify karna.** 
Example : Tum Instagram open karte ho aur login karte ho: 
    username : test 
    password  : test123 


> *But ager hamara koi account nhi hai insta par to kiya hota hia ?* -> *hame account Create krna pardata hai to vo hai signup* now signup mein kiya hota hai or login mein kiya hota hai lets see one by one ----> 


---- 


## User Register / signup 

 - **1) User apni details fill krta hai or submit krta hai** *yeh ek request hai jo ki client ne kri hai kisi website ko lets say insta !..* 

 - #### How signup process is done , yeh just simple case hai 

 ![Request flow ](./images/resigter%20user%20flow%20.jpg)

 ****** 
 
  ## Step 1 -> user Request for signup to website ( server )
 ![User req to server for signup](./images/request%20of%20signup.jpg)
 
 _____ 
 
  ## Step 2  -> Response of the website ( server )
     
   -  ### i) first case 
      ![signup case 1 ](./images/signup%20%20case%201.jpg)

   -  ### i) second case 
      ![signup case 2 ](./images/case%202%20of%20signup.jpg) 



---

> NOTE -> tokens sirf signup par he nhi but login par bhi create hote hai esa esliye hai keoki tokens k expiry time hota hai jiske bad dubara token generate hota hai ham ese dekhte hain next .... but for now its the signup process flow....





