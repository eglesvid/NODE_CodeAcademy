import express from "express"; //kitas budas express importuot
import routes from "./src/routes/index.js";
const PORT = 4000;
const app = express();

app.use(express.json());
app.use(routes);

app.listen(PORT, (req, res) => {
  console.log(`App listening on port ${PORT}`);
});
