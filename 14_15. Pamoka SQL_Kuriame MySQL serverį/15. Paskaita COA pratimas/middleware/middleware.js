export function checkLimit(req, res, next) {
  if (!req.query.limit) {
    res.json({ error: "limit is not defined" });
  } else {
    next();
  }
}

export function checkBody(req, res, next) {
  if (!req.body.title) {
    res.json({ error: "title is not defined" });
  } else {
    next();
  }
}

export async function checkForId(req, res, next) {
  if (!req.params.id) {
    res.json({ error: "id is not defined" });
  } else {
    next();
  }
}
