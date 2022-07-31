const PORT = process.env.PORT || 3000;
const express = require('express');

const app = express();

app.get('/', (req, res) => {
    res.send('hello this is server');
})

app.listen(PORT, () => {
    console.log(PORT);
})