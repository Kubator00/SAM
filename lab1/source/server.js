const express = require('express')

const app = express()

app.get('/', (req, res) => {
    const videoFiles = req.query.videoFiles;
    const audioFiles = req.query.audioFiles;
    if(videoFiles)
    	res.send(`<body> <input type="video" id="videoPlayer" value="${videoFiles}"/></body>`)
    else if(audioFiles)
    	res.send(`<body> <input type="audio" id="audioPlayer" value="${audioFiles}"></body>`)
})

app.listen(4080)
