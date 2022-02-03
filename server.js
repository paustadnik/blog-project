const express = require('express')
const mongoose = require('mongoose')
const methodOverride = require('method-override')
var expressLayouts = require('express-ejs-layouts')

const Post = require('./models/post')
const postRouter = require('./routes/post')
const commentRouter = require('./routes/comment')
const userRouter = require('./routes/user')

// connection to mongodb
mongoose.connect('mongodb://localhost/blog')

// create and express app
const app = express()
// set the templating engin
app.set('view engine', 'ejs')
// enable ejs layouts in express
app.use(expressLayouts)
// middleware for getting the data passed from a form
app.use(express.urlencoded({ extended: false }))
// middle ware for using more http verbs in the html
app.use(methodOverride('_method'))
// tell express app about the public folder
app.use(express.static('public'))

// root route
app.get('/', async (req, res) => {
  const posts = await Post.find().populate('comments')
  res.render('allPosts', { posts })
})

// post routes
app.use('/posts', postRouter)

// comment routes
app.use('/comments', commentRouter)

// user routes
app.use('/users', userRouter)

// listening to requests
app.listen(3000)
