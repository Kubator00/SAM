const express = require('express')

const app = express()

app.get('/', (req, res) => {
	const videoFile = req.query.videoFile;
	const audioFile = req.query.audioFile;
	const imgFile = req.query.imgFile;
	let page = `<!DOCTYPE HTML>
    <html>
    <head>
    <title>Hello World Player</title>
    </head>
    <body>
    `

	if (videoFile){
		page += `
			<video controls id="videoPlayer">
		<source src="${videoFile}" type="video/mp4">
		Twoja przeglądarka nie obsługuje odtwarzacza wideo.
		</video><br/><br/>`
		page += `<button id="videoCancel" onClick="cancelVideo()">Anulowanie filmu</button><br><br>`;
	}

	if (audioFile){
		page += `
    	<audio controls id="audioPlayer">
		<source src="${audioFile}" type="audio/mp3">
		Twoja przeglądarka nie obsługuje odtwarzacza audio.
		</audio><br/><br/>`
		page += `<button id="audioCancel" onClick="cancelAudio()">Anulowanie audio</button><br><br>`;
	}

	if (imgFile)
		page += `<img src=${imgFile} id="posterImage"/>`
	


	page += `<script>
		function cancelVideo(){
			const videoPlayer = document.getElementById("videoPlayer");
			videoPlayer.setAttribute("src", "cancel.mp4");
		}
	</script>
	`

	page += `<script>
		function cancelAudio(){
			const audioPlayer = document.getElementById("audioPlayer");
			audioPlayer.setAttribute("src", "cancel.mp3");
		}
	</script>
	`
	
	if (!videoFile && !audioFile && !imgFile)
		page += `Nie przekazano parametru`

	page += `</body> </html>`
	res.send(page);

})

app.listen(4080)
