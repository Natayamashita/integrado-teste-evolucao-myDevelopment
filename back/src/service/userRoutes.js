import UserModel from "../db-model/user.js";
import authorizationMiddlewaree from "../middleware/authorizationMiddleware.js";

export default function (app) {

  app.post("/users",authorizationMiddlewaree(), async (req, res) => {
    
    const user = new UserModel(req.body);
    console.log(user,"USER")
    await user
      .save()
      .then((result) => {
        console.log(result);
        res.send({ message: "Usuário cadastrado com sucesso!" });
      })
      .catch((err) => {
        console.error(err);
        res.send({ message: "Erro na hora de cadastrar o usuário" });
      });
  });
}
