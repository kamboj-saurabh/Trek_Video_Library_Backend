const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
const mongoose = require('mongoose')

const app = express();
app.use(bodyParser.json());
app.use(cors())

const PORT = process.env.PORT || 3000;

const categories_router = require('./router/category.router.js')
const video_router = require('./router/video.router.js')
const signup_router = require('./router/signup.router.js')
const login_router = require('./router/login.router.js')
const user_router = require('./router/user.router.js')
const  playlist_router = require('./router/playlist.router.js')
const watchlater_router = require('./router/watchlater.router.js')
const likedvideo_router = require('./router/likedvideo.router.js')

const{DBConnection} = require('./db/db.connection.js')
DBConnection();

app.use('/categories', categories_router)
app.use('/videos', video_router)
app.use('/signup',signup_router)
app.use('/login', login_router)
app.use('/user',user_router)
app.use('/playlist', playlist_router)
app.use('/watchlater', watchlater_router)
app.use('/likedvideo', likedvideo_router )



app.get('/', (req, res) => {
  res.send('Hello Express app!')
});

app.use((req, res) => {
  res.status(404).json({ success: false, message: "route not found on server, please check"})
})

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: "error occured, see the errorMessage key for more details", errorMessage: err.message})
})

app.listen(PORT, () => {
  console.log('server started');
});