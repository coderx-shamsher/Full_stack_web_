## docker image layers 

- docker images  mein bhot sari layers hoti hai for now let break down the most important 

```txt 
 ## note > these layers all are read-only we cannot change it its immutable, we can only change the container layer jo ki ham kisi bhi new container ko create krna hota hai 



      container  -> 

         | 
         |

      layer 2 

         |
         |

      layer 1

         |
         |

      Base layer     -> this is linux based layer means (ek linux k upar baki multiple layer hoti hai but  
                          base is linux layer )

            


   