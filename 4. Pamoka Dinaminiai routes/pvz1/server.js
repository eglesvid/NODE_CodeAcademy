import express from "express";

const PORT = 3000;
const app = express();

//STATINIS - visalaik buna tokie patys, butent ta string'a, kur isimetem, turim rasyt i fetch'a, kai norim iskviest
app.get("/api", (req, res) => {
  res.send("Labas");
});
//DINAMINIS - gali skirtis, id dalis nebus visalaik ta pati. Ja pasiduodam
app.get("/api/:id", (req, res) => {
  res.send(`${req.params.id}`);
});

app.get("/api/users/:userId/posts/:postId", (req, res) => {
  res.send(`userId: ${req.params.userId} postId: ${req.params.postId}`);
}); //is kazkokio konkretaus user'io, kuri nusirodom pagal id, paima jo konkretu papostinta post, pagal postId

app.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});
