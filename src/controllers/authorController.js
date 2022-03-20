const AuthorModel= require('../models/authorModel')

const createAuthor= async function (req, res) {
      try {
        let data = req.body
        
        if (data) {
            let savedData = await AuthorModel.create(data)
            res.status(201).send({ status: true, msg: savedData })
        } else {
            res.status(400).send({ status: false, msg: "Mandatory body missing" })
        }
    } catch (err) {
        res.status(500).send({ status: false, msg: err.message })
    }
}



module.exports.createAuthor=createAuthor

