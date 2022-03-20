const jwt = require("jsonwebtoken");

const authentication = function (req, res, next) {
    try {
        let token = req.headers["x-api-Key"];
        if (!token) token = req.headers["x-api-key"];

        if (!token) return res.status(404).send({ status: false, msg: "token must be present." });
        let decodedToken = jwt.verify(token, "functionup-thorium");
        //   console.log(decodedToken);
        if (!decodedToken)
            return res.status(404).send({ status: false, msg: "token is invalid." });
        next();
    }
    catch (error) {
        res.status(500).send({ status: false, msg: error.message });
    }
}





const authorisation = (req, res, next) =>{
    try {
      let modified = req.params.authorid;
  
      let token = req.headers["x-api-key"];
      if (!token)
        return res.status(404).send({ status: false, message: "Token is not present" });
  
      let decodedToken = jwt.verify(token, "functionup-thorium");
      if (!decodedToken)
        return res.status(400).send({ status: false, message: "Invalid token" });
      let loginAuthor = decodedToken.authorid;
  
      if (modified != loginAuthor) 
        return res.send({
          status: false,
          msg: "you are not authorised",
        });
  
      next();
    } catch (error) {
      res.status(500).send({ status: false, error: error.message });
    }
  };




module.exports.authentication = authentication;
module.exports.authorisation = authorisation;