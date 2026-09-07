// handling promises using the async await

function promisehandler() {
  // fetch is promise based

  console.log("data is Fetching ..... please wait");
  fetch("https://jsonplaceholder.typicode.com/users")
    .then((res) => res.json())
    .then((data) => console.log(data))
    .catch((err) => {
      console.log(err);
    });
}

// promisehandler()

/// first way to handle api / and promises

// now using the async await

async function datafetch() {
  // first await for fetch, means jab tak sara data fetch nhi hota tab tak wait kro
  let res = await fetch("https://jsonplaceholder.typicode.com/users");
  // now dat a res variable mein store hoga

  const data = await res.json();
  // data parsing with json()

  console.log(data);
}

// datafetch()

// but maine error handling nhi kri to jab bhi async k sath kam krna hai make sure k ham try-catch se handle krein

// best way with async-await and try-catch

async function async_fn_promise_handler() {
  try {
    let res = await fetch("https://jsonplaceholder.typicode.com/userssahf");
    //   console.log(res) // this give me a api response but mere data nhi aya yeh to response hai

    let data = await res.json(); // wait kro jab tak data parse nhi hota human-readable format mein

    console.log(data);
  } catch (error) {
    console.log("Error:",error);
    // make sure k es line ko uncomment kr k error generate kr k try kro code... 
  }
}

async_fn_promise_handler();
