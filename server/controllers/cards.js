const con = require('../connect_db');
const util = require('util');

const query = util.promisify(con.query).bind(con);

exports.addCard= async(req,res)=>{

    var newCard = {
        card_content: req.body.card_content,
        list_id: req.body.list_id
    }
    try{
    var adding = await query('INSERT INTO cards SET ?', newCard)
    res.status(201).json({card_added:true})
    }
    catch(e){res.status(500).json({card_added:false})}
}

exports.deleteCard = async (req, res) => {
    try {
        var cardDelete = await query("delete from cards where card_id=?;",req.params.card_id)
        if (cardDelete.affectedRows === 0) {
            return res.status(409).json({ deleted: false });
        }
        res.status(200).json({ deleted: true });
    } catch (e) {
        res.status(500).end()
        throw (e)
    }
}