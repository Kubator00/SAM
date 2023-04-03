const express = require('express')

const app = express()

const addVideoPlayer = (videoFile) => {
    let result = '';
    result += `
		<video controls id="videoPlayer">
		<source src="${videoFile}" type="video/mp4">
		Twoja przeglądarka nie obsługuje odtwarzacza wideo.
		</video><br/><br/>`
    result += `<button id="videoCancel" onClick="cancelVideo()">Anulowanie filmu</button><br><br>`;
    result += `
    <script>
    function cancelVideo(){
        const videoPlayer = document.getElementById("videoPlayer");
        videoPlayer.setAttribute("src", "cancel.mp4");
    }
    </script>
    `
    return result;
}

const addAudioPlayer = (audioFile) => {
    let result = '';
    result += `
    	<audio controls id="audioPlayer">
		<source src="${audioFile}" type="audio/mp3">
		Twoja przeglądarka nie obsługuje odtwarzacza audio.
		</audio><br/><br/>`
    result += `<button id="audioCancel" onClick="cancelAudio()">Anulowanie audio</button><br><br>`;
    result += `<script>
    function cancelAudio(){
        const audioPlayer = document.getElementById("audioPlayer");
        audioPlayer.setAttribute("src", "cancel.mp3");
    }
    </script>
    `
    return result;
}

const addImage = (imgFile) => {
    let result = `<img src=${imgFile} id="posterImage"/>`;
    return result;
}


const addTable = () => {
    let result = `<table id='playlist_table'>`;
    result += `<tr><th>No.</th><th>URL</th><th>Type</th></tr>`;


    result += `</table>`
    return result;
}


app.get('/', (req, res) => {
    const videoFile = req.query.videoFile;
    const audioFile = req.query.audioFile;
    const imgFile = req.query.imgFile;

    res.write(`
    <!DOCTYPE HTML>
    <html>
    <head>
    <title>Hello World Player</title>
    </head>
    <body>
    `)

    if (videoFile)
        res.write(addVideoPlayer(videoFile));
    if (audioFile)
        res.write(addAudioPlayer(audioFile));
    if (imgFile)
        res.write(addImage(imgFile))

    res.write(addTable());
    
    if (!videoFile && !audioFile && !imgFile)
        res.write(`Nie przekazano parametru`)



    res.write(`</body> </html>`);
	res.end();
})

app.listen(4080)
