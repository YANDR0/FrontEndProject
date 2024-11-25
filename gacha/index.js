const express = require('express');
const path = require('path')
const app = express();
const port = process.env.PORT | 3000;

app.use('', express.static(path.join(__dirname, '..', 'dist', 'browser')))

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'dist', 'browser', 'index.html'))
})

app.listen(port, () => {
    console.log(`Puerto ${port}`)
})

