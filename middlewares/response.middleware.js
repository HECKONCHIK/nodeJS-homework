const responseMiddleware = (req, res, next) => {
  if (res.err) {
    const statusCode = res.err.statusCode || 400;
    return res.status(statusCode).json({ error: true, message: res.err.message });
  }

  if (res.data) {
    return res.status(200).json(res.data);
  }

  if (!res.data && req.method === 'GET') {
    return res.status(404).json({ error: true, message: "Not found" });
  }

  next();
};

export { responseMiddleware };
