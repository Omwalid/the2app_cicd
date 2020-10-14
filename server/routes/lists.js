const express= require('express')
const router= express.Router()


const lists= require('../controllers/lists')

const isAuth = require('../middlewares/isAuth');

router.get('/list',isAuth,lists.listLists )
router.post('/add',isAuth,lists.addList )
router.delete('/delete/:list_id', isAuth, lists.deleteList)


module.exports = router