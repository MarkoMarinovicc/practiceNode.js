const proizvodRouter = require("express").Router();
const Proizvod = require("../models/proizvod");
const { userExtractor } = require("../utils/middleware");

proizvodRouter.post(
  "/api/proizvod",
  userExtractor,
  async (request, response) => {
    const user = request.user;
    const body = request.body;
    try {
      const proizvod = new Proizvod({
        naziv:body.naziv,
        opis: body.opis,
        cijena: body.cijena,
        user: user.id,
      });
      const savedProizvod = await proizvod.save();
      response.status(200).json(savedProizvod);
    } catch (error) {
      return response.status(401).json({ error: "token missing" });
    }
  }
);
proizvodRouter.get("/api/proizvod",async (request, response)=>{
    const proizvod=await Proizvod.find({}).populate('user')
    response.status(200).json(proizvod)
})
module.exports = proizvodRouter;
