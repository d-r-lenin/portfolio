const corn = require("node-cron");
const axios = require("axios");

const url = process.env.PINGER_URL || "pinger-pinger.richardlenin.com";

const ping = () => {
    axios.get(url).then((res) => {
        console.log("pinging...");
    });
};


corn.schedule("*/5 * * * *", ping);