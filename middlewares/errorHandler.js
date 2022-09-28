module.exports = (err, req, res, next) => {
    if(err.name === 'MongoError' && err.code === 11000)
        return res.status(500).json({msg:"Cet utilisateur existe déja"})

    return res.status(500).json({ msg:err.msg })
}