const corn = require("node-cron");
const axios = require("axios");

const url = process.env.PINGER_URL || "https://pinger-pinger.richardlenin.com/ping";

const ping = async() => {
    try{
        await axios.get(url)
        console.log("ping ok");

    }catch(err){
        console.log(err);
    } finally{
        console.log("ping finally");
    }
};


// run every 10 seconds
corn.schedule("*/10 * * * * *", ping);