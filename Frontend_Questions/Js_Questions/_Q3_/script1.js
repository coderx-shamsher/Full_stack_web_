console.log("script is started....");

setTimeout(() => {
  console.log("this is from task queue (settimeout)");
}, 2000);

console.log("end of script....");

/** The output is -> 
 * 
 *    script is started....
      end of script....
      this is from task queue (settimeout)
 *   
       Question is why this settimeout at the last (yeh last mein keo ayi.??) ?? 
       
 */
