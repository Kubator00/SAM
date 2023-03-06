const express = require('express')

const app = express()

app.get('/', (req, res) => {
    const videoFiles = req.query.videoFiles;
    const audioFiles = req.query.audioFiles;
    if(videoFiles)
    	res.send(`<body> <input type="video" id="videoPlayer"/></body>`)
    else if(audioFiles)
    	res.send(`<body> <input type="audio" id="videoPlayer"/></body>`)
})

app.listen(4080)
