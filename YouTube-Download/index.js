const express = require('express');
const ytdl = require('ytdl-core');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(cors());
app.set('view engine', 'pug');
app.set('views', __dirname + '/view');

app.set('view engine', 'pug');
app.set('views', __dirname + '/view');



app.listen(3000, function(){
  console.log('Server Running on port 3000');
});

app.get('/', (req, res)=>{
  res.render('index');
});

app.post('/download', (req, res)=>{
  let video = req.body.URL;
  let name = req.body.name;
  video = ytdl(video);
  res.header('Content-Disposition', `attachment; filename=${name}.mp4`);
  video.pipe(res);
});
