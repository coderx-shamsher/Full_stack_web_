## Understanding Task Starvation:

*Now, imagine this: if micro tasks keep popping up without allowing other tasks a chance to run, what happens next? Well, in this scenario, the Callback Queue won’t get an opportunity to execute its tasks. This situation is what we call the starvation of tasks in the Callback Queue.*

> *ager ham micro task q mein ek loop mein tasks ko dalte rahe to macro task q ko moka nhi nilta run hone ka that is the starvation* 


```js 

// starvaion code examples

Promise.resolve().then(() => {
  Promise.resolve().then(() => {
    Promise.resolve().then(() => {
      Promise.resolve().then(() => {
        Promise.resolve().then(() => {
          Promise.resolve().then(() => {});
        });
      });
    });
  });
});


```

