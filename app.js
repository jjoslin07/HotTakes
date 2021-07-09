const express = require('express');

const app = express();

app.use((req, res) => {
    res.json({
        message: 'Your request was successful!'
    });
});

module.exports = app;