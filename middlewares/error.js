module.exports = (err, _req, res, _next) => {
  const status = err.status || 500;
  const message = err.message || 'Something went wrong! :(';
  res.status(status).json({ message });
};
