//PVZ SU MIDDLEWARE.
//next - f-ija, kuri jeigu ja iskviesim, eisim prie kitos f-ijos
//dazniausiai naudojami patikrinti data
export function middlewareTest(req, res, next) {
  // console.log(req.query);
  if (!req.query.page || !req.query.size) {
    res.json({ error: "page or size not provided" }); //tada sitoj vietoj stabdom req vykdyma, reiskia galim iskart siust res
  } else {
    next(); //sitoj vietoj sakom sustok ir sok i kita f-ija
  }
}
//daznai naudojama patikrinti, ar user yra prisiregistraves:
export function checkIfAuthenticated(req, res, next) {
  if (req.isAuthenticated) {
    next();
  } else {
    res.status(300).json({ error: "user not authenticated" });
  }
}
