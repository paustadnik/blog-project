const express = require('express')
const bcrypt = require('bcrypt')
const User = require('./../models/user')
const { render } = require('express/lib/response')
const user = require('./../models/user')


// new router for the post feature
const router = express.Router()

router.get('/signin', (req, res) => {
    res.render('signin')
})

router.post('/signin', async (req, res) => {
    const user = new User()
    const hash = await bcrypt.hash(req.body.password, 10)
    user.email = req.body.email
    user.password = hash
    try {
        await user.save()
        res.redirect('/')

    } catch (error){
        res.redirect('/users/signin')
        console.log(error)
    }
})

//form  for log in in the user
router.get('/login' , (req, res) => {
    res.render('login')
})

//handling the authentication of the user
router.post('/login', async (req, res) => {
    const user = await User.findOne({ email: req.body.email })
    if (user) {
        const isPwCorrect = await bcrypt.compare(req.body.password, user.password)
        if (isPwCorrect) {
            res.redirect('/')

        } else {
            res.redirect(('/users/login'))
        }

    } else {
        res.redirect(('/users/login'))
    }
    console.log(user)
})

module.exports = router