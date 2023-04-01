export async function validatePassword(req, res, next) {
  const { password } = req.headers;

  if (password !== "123123") {
    res.status(400).json({ message: "Incorrect password" });
  } else {
    next();
  }
}
