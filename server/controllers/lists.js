const con = require('../connect_db');
const util = require('util');

const query = util.promisify(con.query).bind(con);


exports.listLists= async(req,res)=>{
try {
  var dataToSend=[]
  var n=0
  const lists = await query("SELECT list_id,list_name FROM lists WHERE user_id=? ORDER BY creation_date DESC;", res.locals.user_id)
 
  const results= await Promise.all(lists.map(async(list)=>{
    var listInfos={}
    var cardsToSend=[]
    var m=0
    var cards= await query("SELECT card_id,card_content FROM cards WHERE list_id=? ORDER BY creation_date DESC;", list.list_id)

    cards.map((card)=>{
        cardsToSend[m]={
            id: card.card_id,
            text: card.card_content
        }
        m+=1
    })
    var listInfos={
        id: list.list_id,
        title: list.list_name,
        cards: JSON.parse(JSON.stringify(cardsToSend))
    }
    dataToSend[n]= listInfos
    n+=1
  }))

  res.status(200).json({lists: JSON.parse(JSON.stringify(dataToSend))})

}
catch(e){throw e}

}


exports.addList= async(req,res)=>{

    var newList = {
        list_name: req.body.list_name,
        user_id: res.locals.user_id
    }
    try{
    var adding = await query('INSERT INTO lists SET ?', newList)
    res.status(201).json({list_added:true})
    }
    catch(e){res.status(500).json({server_added:false})}
}

exports.deleteList = async (req, res) => {
    try {
        var listDelete = await query("delete lists,cards from lists left join cards on lists.list_id=cards.list_id where lists.list_id=?;",req.params.list_id)
        if (listDelete.affectedRows === 0) {
            return res.status(409).json({ deleted: false });
        }
        res.status(200).json({ deleted: true });
    } catch (e) {
        res.status(500).end()
        throw (e)
    }
}