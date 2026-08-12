// 1) step is to setup dotenv , keoki hamein env variables bhi load krne honge usi time par jab mera server load hoga  and first hame use setup krna hoga

import "dotenv/config";

import ConnectDB from "./db/connection.js";

// calling function
ConnectDB()
    .then(() => {
        // connect port of app in this with app sever connection success message
        
        const Listen_port = process.env.Port || 4080;

        app.listen(Listen_port, () => {
            console.log(` ♾️  Server is Running at localhost:${Listen_port}`);
        });
    })
    .catch((err) => {
        console.error("\n Error : MongoDB DB connection failed !!! ‼️ ");
    });
