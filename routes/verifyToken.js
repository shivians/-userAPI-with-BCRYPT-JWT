const jwt = require("jsonwebtoken");

// const verifyToken=(req,res,next)=>{
//     console.log("passed")
//     next();
// }

const verifyToken = (req, res, next) => {
  const Key = process.env.JWT_SECRET_KEY;

  try {
    const token = req.header("auth-token");
    console.log(req);
    if (!token) {
      return res.status(400).json({ msg: "!token" });
    }
    jwt.verify(token, Key, (err, user) => {
      if (err) {
        return res.status(400).json({ msg: "Invalid authentication" });
      }
      req.user = user;
      next();
    });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

module.exports = verifyToken;
