const express = require('express')

const app = express()

app.get('/', (req, res) => {
    const videoFiles = req.query.videoFile;
    const audioFiles = req.query.audioFile;
    if(videoFiles && audioFiles)
       	res.send(`
       	<body> 
       	<input type="audio" id="audioPlayer" value="${audioFiles}">
       	<input type="video" id="videoPlayer" value="${videoFiles}"/>
       	</body>`)
    else if(videoFiles)
    	res.send(`<body> <input type="video" id="videoPlayer" value="${videoFiles}"/></body>`)
    else if(audioFiles)
    	res.send(`<body> <input type="audio" id="audioPlayer" value="${audioFiles}"></body>`)
    else
    	res.send(`Hello`);
})

app.listen(4080)
