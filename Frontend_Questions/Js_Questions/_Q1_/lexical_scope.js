// lexical scope in js

let global = "hello! lexical"; // comment and run

function testing() {
  //    let global = "hello from testing function" // uncomment and run
  let name = "linux";

  function abc() {
    // let global = "hello from abc function" //un comment and run

    function testfn() {
      console.log("\n calling from testfn --> \n");
      console.log(global);

      function deep() {
        console.log();
        console.log(name);
      }
      deep();
    }

    testfn();
  }
  abc();
}

testing();

// now  jaise hamne dekha ki yeh apne local(function scope)/block scope mein current ko find krta hai in that case mera variable hai global, to ager use global mee abc function mein nhi mila! to usne uske parent function ko call kra or uske scope mein find kra milgiya to uski value print krdi nhi ho fir se uppar ki taraf us function k bhi grandparent ko call kra aur uske scope mein find kra..
// bs yeh ese he work krta hai jis scope main hai ager usmein find krta hai nhi us parents k scopes mein... 