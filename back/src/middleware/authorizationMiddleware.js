import jwt from "jsonwebtoken";

export default function authorizationMiddleware() {
  return (req, res, next) => {
    console.log("Authorization Middleware");

    const token = req.headers["authorization"];
    try {
      console.log("Validate token");
      console.log(req.body)
      const jwt_verification = jwt.verify(req.body.token,'shhhhhh');
      console.log(jwt_verification)
      if(jwt_verification) {
          return res.status(200).json({message: true})
      } else {
          return res.status(401).json({message: false});
      }
    } catch(err) {
        res.status(401).json({message: false});
    }
    next();
  };
}

