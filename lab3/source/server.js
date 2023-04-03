const express = require('express')

const app = express()

const addVideoPlayer = (videoFile) => {
    let result = '';
    result += `
		<video controls id="videoPlayer">
		<source src="${videoFile}" type="video/mp4">
		Twoja przeglądarka nie obsługuje odtwarzacza wideo.
		</video><br/><br/>`
    result += `<button id="videoCancel" onClick="cancelVideo()">Anulowanie filmu</button>`;
    result += `<button id="videoAdd" onClick="addRow('Video')">Add video</button><br><br>`;
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
    result += `<button id="audioCancel" onClick="cancelAudio()">Anulowanie audio</button>`;
    result += `<button id="addAudio" onClick="addRow('Audio')">Add audio</button><br><br>`;
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
    result += `<button id="imgAdd" onClick="addRow('Image')">Add image</button><br><br>`;
    return result;
}

const addTable = (url, type) => {
    let result = `<table id='playlist_table'>`;
    result += `<tr><th>No.</th><th>URL</th><th>Type</th></tr>`;
    result += `</table>`
    result += `
    <script>
    let rowNumber = 1;
    function addRow(type) {
        let src;
        if (type == 'Video')
            src = document.getElementById('videoPlayer').getAttribute('src');
        else if (type == 'Audio')
            src = document.getElementById('audioPlayer').getAttribute('src');
        else if (type == 'Image')
            src = document.getElementById('posterImage').getAttribute('src');

        let table = document.getElementById('playlist_table');
        let newRow = table.insertRow(-1);
        let newRowNumber = newRow.insertCell(0);
        newRowNumber.innerText = rowNumber;
        let newRowSrc = newRow.insertCell(1);
        newRowSrc.innerText = src;
        let newRowType = newRow.insertCell(2);
        newRowType.innerText = type;
    
        rowNumber++;
    }
    </script>
    `
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
    <style>
    table, th, td {
        border: 1px solid black;
        border-collapse: collapse;
      }
    </style>
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
