export function validatePost(req, res, next) {
  const { name, email, address } = req.body;

  if (
    typeof name === "string" &&
    typeof email === "string" &&
    typeof address === "string"
  ) {
    if (name.length > 2 && email.includes("@")) {
      next();
      return;
    }
  }
  res.status(500).json({ error: "Invalid data" });
}
