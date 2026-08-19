/// == (equal to operator) (loose equality)
// Converts types if they are different, then compares.
// Can give surprising results.
// yeh operator compare two values , ager values same hai to true milta hai

function valuecheckout(value1, value2) {
  if (value1 == value2) {
    console.log();
    console.log(`values are same --> ${value1} == ${value2}`);
  } else {
    console.log();
    console.log(`values are not same --> ${value1} == ${value2}`);
  }
}

// valuecheckout(2,10)
// valuecheckout(2, "2");
 // true output mila, but meri values to diff types ki hai ?
// yeh operator values ka type convert krta hai (one or both) fir compare krta hai

// valuecheckout(2, "3");
// iska matlab yeh hai ki yeh type and values dono ko check krta hai ager type same nhi hai to type convert krta hai then check krta hai

// valuecheckout(0,false);
// valuecheckout(1,true);
// valuecheckout(0, " ");  // also true 
// valuecheckout(null, undefined); // this is special rule , yeh true he milta hai 



// ----> === (Strict equality) 
// No type conversion; if types differ, result is false.
// Safer and more predictable.

function type_and_value(value1, value2) {
  if (value1 === value2) {
    console.log();
    console.log(`values are same --> ${value1} === ${value2}`);
  } else {
    console.log();
    console.log(`values are not same --> ${value1} === ${value2}`);
  }
}


// type_and_value(2,'2') 
// but yeh to error de raha hai ? keoki yeh type and value dono ko check krta hai ager dono same hai type and value to he true milta hai 
type_and_value(2,3)
type_and_value(0,false)
type_and_value(1, true)
type_and_value(0,'')
type_and_value(null,undefined)

// NOTE -> yeh strictly checkout krta hia type and value same honi chaahie eseliye ese bhot jiyada use kiya jata hai == (loss equality operator) ki jagah par.. 
type_and_value("hello", "hello")



