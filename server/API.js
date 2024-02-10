const { sendAndReceive } = require('./sendIPC');
const express = require('express');



const app = express();
const port = 6000;

app.get('/apiYTDL/:id', (req, res) => {
    const id = req.params.id;
    sendAndReceive(`ytdlId=${id}`)
        .then(response => {
            res.send(response);
        })
        .catch(error => {
            res.status(500).send(error);
        });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
