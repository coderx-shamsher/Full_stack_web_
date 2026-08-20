## introduction to REPL (Read-eval-print Loop)
- *it stands for Read-eval-print loop or read, evaluate, print and loop, its an iteractive programming environement that allows you to execute js code on statement at a time.* 

## working of repl
- Read : the repl reads the user's input (a single line or multiple lines of code ) and parses it into a data structure that the js engine can understand.

- Eval : the parsed input is evaluated (executed) by the js engine. if the input is a valid expression, the REPL computes the result. 

- Print : the result of the evaluated expression is printed back to the console so that user can see the output. 

- Loop : the process then loops back, waiting for the next input, and continues unless exit the REPL env. 


![Repl terminal exmaple ](../images/repl.jpg)

```sh 

# type 
node 

## repl is opened.. 


``` 

- so jab bhi terminal mein "node" type krte hain to hame REPL env milta hai for testing normal or light js codes.

---
*** 

## CLI in nodejs 
*command line interface : is a way to execute predefined js files or run commands for tasks like installing packages, running scripts, or starting application / backend servers etc.*  -> ham jo bhi terminal use krte hain vo cli he hai yeh nhi hai k cli node k sath he koi pre-built somethink kuch hai nhi yeh ek concept hai ek tareeka hai system ko handle krne ka aur han cli mein bhot kuch kr skte hain if you have used linux before.. 


```sh 

## here is some cli commands to use 

## mkdir to create folder 
mkdir testjs


## touch for creating files 
touch testfile.js

## cd and cd .. 
cd  ## for changing path , like jumping folder to another folder 

cd ..  ## to go back from any folder 

## use it try....

```
