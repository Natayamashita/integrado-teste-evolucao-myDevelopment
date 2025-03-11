import UserModel from "../db-model/user.js";
import jwt from 'jsonwebtoken';
import authorizationMiddleware from "../middleware/authorizationMiddleware.js";
export default function (app) {
    app.post("/login", async (req,res) => {
        try {
            const existent_user = await UserModel.findOne({ email: req.body.email });
            if(existent_user) {
                const token = jwt.sign({email: existent_user.email, password: existent_user.password},'shhhhhh',{ expiresIn: '1h' });
                res.json({token: token});
            }
        } catch(err) {
            console.log(err)
            res.status(401).json({message: "Autenticação falhou! Usuário não cadastrado: ", err});
        }
    });
    app.post("/validateToken", async (req,res) => {
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
    });
} 