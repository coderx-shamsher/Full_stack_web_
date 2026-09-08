# Handling Files and Directories in Linux In Detail 
> First lets see how to create files and folders ! -> 


  ## **Folder Creation ->** 
   - **mkdir — make directory**
     - *Technical definition: mkdir creates one or more directories.*

```sh 

pwd 

ls 

## or
ls -l 

## or ll 

ll ## same work as ls -ls or -l 

mkdir myfoldername 

cd myfoldername 

pwd 

ls 


```
![mkdir -> ](first%20mkdir%20.jpg)

------ 

  ## Create multiple folders
 
```sh 

mkdir Html-code Css-code Js-code 


```
![mkdir multiple folders  ](./multiple%20folders.jpg)
    
-------

  ## Create Nested multiple folders 

```sh 

mkdir -p Project01/Frontend/src


## list every nested folders 
ll Project01/ -R 




```
![mkdir nested folders-> ](./nested%20mkdir%20.jpg)

 > The -p option creates parent folders automatically and does not fail when an existing directory is encountered


-------- 
 
  ## how to complex folder structure using mkdir 

```sh 

mkdir -p Project02/{Frontend/src/Html-code,Css-code,Js-code,/Backend/src/server,app}


```
- comma se seprate kro or jis folder k ander nesting krni hai 
> This is a Bash feature called brace expansion. It creates this structure quickly. 

![-p with brace expansion ](./nested%20mkdir%20complex%20folders%20.jpg)
---------- 

 ## **File creating**
   ## *touch - create an empty file* 
   - Technical definition: touch updates a file’s access/modification timestamps. If the file does not exist, it normally creates an empty file.


![first touch -> ](./touch%20first.jpg)

---------- 

 ## **Create multiple Files** 

```sh 

touch variables.bash condition.bash loops.bash functions.bash

```

![multiple touch files  ](./multiple%20touch%20files.jpg)

> Important: If the file already exists, touch does not erase its contents. It only updates its modification time.

-------

 ## echo -- create a file with content 
  - touch creates an empty file. Use echo when you want to write a line into a new file.

![echo files ](./echo%20files.jpg)  

 ## check content of file 
   - cat - command to read file content 

```sh 

echo "Hello bash !!"  > first.bash

cat first.bash

## if i do again 

echo "its second line" > first.bash 

cat first.bash 


```

![ echo overwrite !! ](./echo%20overwrite%20content.jpg)

>  ">" means overwrite. Existing content will be replaced.


> ">>" means append. The new line is added at the end without deleting old content.

```sh 

echo "this line added" >> first.bash 

cat first.bash 

```

 - Rule to remember:

```text
>   = replace old content
>>  = add new content at the end

```

-----------

  ## nano — create and edit text files
  - For beginners, nano is one of the simplest terminal editors.

```sh 

nano first.bash 

```

```text
Inside Nano:

Write your text normally.

Press Ctrl + O to save.

Press Enter to confirm filename.

Press Ctrl + X to exit.

```

![nano filename ](./nano%20commdn.jpg)

-------- 

![nano interface ](./nano%20text%20editor.jpg)

------ 

> that's the basic file and folder handling make sure to practice and keep exploring...



