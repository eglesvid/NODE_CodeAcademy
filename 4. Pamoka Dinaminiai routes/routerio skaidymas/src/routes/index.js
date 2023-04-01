// 1. cia norim susiimportuoti visus routerius, kurie yra books, cars, movies folderiuose, ir juos apjungti i viena

import express from "express";

import booksRouter from "./v1/books/index.js";
import carsRouter from "./v1/cars/index.js";
import moviesRouter from "./v1/movies/index.js";

// isivaizduokim, kad turim antras versijas:
import booksRouter2 from "./v1/books/index.js";
import carsRouter2 from "./v1/cars/index.js";
import moviesRouter2 from "./v1/movies/index.js";

// 2. apjungti i viena router.use (booksRouter, carsRouter, moviesRouter);
// prie visu pradzios prisideda /api
// jei norim, kad veiktu ir sena versija ir nauja: /api/v1
const router = express.Router();

router.use("/api/v1", booksRouter, carsRouter, moviesRouter);
router.use("/api/v2", booksRouter2, carsRouter2, moviesRouter2);

// 3. dabar jau galim eksportuot
export default router;
