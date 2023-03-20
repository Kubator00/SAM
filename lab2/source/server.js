const express = require('express')

const app = express()

app.get('/', (req, res) => {
	const videoFile = req.query.videoFile;
	const audioFile = req.query.audioFile;
	let page = `<!DOCTYPE HTML>
    <html>
    <head>
    <title>Hello World Player</title>
    </head>
    <body>
    `

	if (videoFile)
		page += `
			<video controls id="videoPlayer">
		<source src="${videoFile}" type="video/mp4">
		Twoja przeglądarka nie obsługuje odtwarzacza wideo.
		</video>`

	if (audioFile)
		page += `
    	<audio controls id="audioPlayer">
		<source src="${audioFile}" type="audio/mp3">
		Twoja przeglądarka nie obsługuje odtwarzacza audio.
		</audio>`


	page += `</body> </html>`
	res.send(page);

})

app.listen(4080)
