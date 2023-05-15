const express = require('express')

const app = express()

app.get('/', (req, res) => {

    const videoFile = req.query.videoFile;
    const audioFile = req.query.audioFile;
    const imgFile = req.query.imgFile;

    res.write(`<!DOCTYPE HTML> <html> ${addHeadSection()} <body>`);

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

const addHeadSection = () => {
    return (` <head>
    <title>Hello World Player</title>
    ${addCss()}
    </head>`)

}

const addCss = () => {
    return `<style>
    table, th, td {
        border: 1px solid black;
        border-collapse: collapse;
      }
    </style>`

}

const addVideoPlayer = (videoFile) => {
    let result = '';

    result += `
		<video controls id="videoPlayer" src="${videoFile}">
		Twoja przeglądarka nie obsługuje odtwarzacza wideo.
		</video><br/><br/>`

    result += `<button id="videoCancel" onClick="document.getElementById('videoPlayer').src='cancel.mp4'">Cancel video</button>`;
    result += `<button id="videoAdd" onClick="addRow('Video')">Add video</button><br><br>`;

    return result;

}

const addAudioPlayer = (audioFile) => {
    let result = '';
    result += `
    	<audio controls id="audioPlayer" src="${audioFile}">
		Twoja przeglądarka nie obsługuje odtwarzacza audio.
		</audio><br/><br/>`

    result += `<button id="audioCancel" onClick="document.getElementById('audioPlayer').src='cancel.mp3';">Cancel audio</button>`;
    result += `<button id="audioAdd" onClick="addRow('Audio')">Add audio</button><br><br>`;
    return result;

}

const addImage = (imgFile) => {
    let result = `<img src=${imgFile} id="posterImage"/><br>`;
    result += `<button id="imgAdd" onClick="addRow('Image')">Add image</button><br><br>`;

    return result;
}

const addTable = (url, type) => {

    let result = `<table id='playlist_table'>`;
    result += `<tr><th>No.</th><th>URL</th><th>Type</th><th>Action</th></tr>`;
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
        let newRowAction = newRow.insertCell(3);
        let newButton = document.createElement('button');
        newButton.classList.add('removeRowButton');
        newButton.textContent = 'Delete';
        newButton.addEventListener('click', (event) => {
            let button = event.target;
            let rowToDelete = button.parentNode.parentNode;
            rowToDelete.parentNode.removeChild(rowToDelete);
            for (let i = 1; i < table.rows.length; i++) {
                let rowNumberCell = table.rows[i].cells[0];
                rowNumberCell.innerText = i;
                rowNumber = i+1;
            }
            if(table.rows.length <= 1)
                rowNumber = 1;
        });
        newRowAction.appendChild(newButton);

        let downButton = document.createElement('button');
        downButton.classList.add('moveRowDownButton');
        downButton.textContent = 'Down';
        newRowAction.appendChild(downButton);

        let upButton = document.createElement('button');
        upButton.classList.add('moveRowUpButton');
        upButton.textContent = 'Up';
        newRowAction.appendChild(upButton);
        upButton.addEventListener('click', (event) => {
            let button = event.target;
            let rowToMove = button.parentNode.parentNode;
            rowToMove.parentNode.removeChild(rowToMove);
            console.log(rowToMove);
        });

        rowNumber++;
    }
    </script>
    `

    return result;

}

app.listen(4080)



