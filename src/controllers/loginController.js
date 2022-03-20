const AuthorModel = require("../models/authorModel");
const jwt = require("jsonwebtoken");

const login = async function (req, res) {
  try {
    let userName = req.body.emailId;
    let password = req.body.password;

    let author = await AuthorModel.findOne({
      emailId: userName,
      password: password,
    });
    if (!author)
      return res.staus(400).send({
        status: false,
        msg: "username or the password is not corerct",
      });

    let token = jwt.sign(
      {
        authorId: author._id.toString(),
        batch: "thorium",
        organisation: "FUnctionUp",
      },
      "functionup-thorium"
    );
    res.setHeader("x-api-key", token);
    res.status(200).send({ status: true, data: token });
  } catch (error) {
    res.status(500).send({ status: false, error: error });
  }
};


module.exports.login = login;
