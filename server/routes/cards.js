const express= require('express')
const router= express.Router()


const cards= require('../controllers/cards')

const isAuth = require('../middlewares/isAuth');

router.post('/add',isAuth,cards.addCard )
router.delete('/delete/:card_id', isAuth, cards.deleteCard)



module.exports = router