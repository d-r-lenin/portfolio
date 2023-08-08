const fs = require("fs");

async function checkAndCreateKeyFile(){
    if (!fs.existsSync("./key.json")) {
        console.log("Creating key.json file...");
        console.log(process.env.GOOGLE_SERVICE_ACCOUNT_KEY);
        fs.writeFileSync("./key.json", process.env.GOOGLE_SERVICE_ACCOUNT_KEY);
    }
}

module.exports = checkAndCreateKeyFile;