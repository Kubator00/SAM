const express = require('express')

const app = express()

app.get('/', (req, res) => {
    res.send(`<body>

<form method="get">

<input type="video" id="audioPlayer"/>
<input type="audio" id="videoPlayer"/>
</form>


</body>

<script>

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

const videoFiles = urlParams.get('videoFile')

</script>`)
})

app.listen(4080)
