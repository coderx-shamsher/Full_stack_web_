console.log("starting of script....");

setTimeout(() => {
  console.log("this is from task queue (settimeout)");
});

Promise.resolve().then(() => {
  console.log("this message from (micro task queue) (promise)");
});

console.log("end of script....");

// // starvaion code examples

// Promise.resolve().then(() => {
//   Promise.resolve().then(() => {
//     Promise.resolve().then(() => {
//       Promise.resolve().then(() => {
//         Promise.resolve().then(() => {
//           Promise.resolve().then(() => {});
//         });
//       });
//     });
//   });
// });
