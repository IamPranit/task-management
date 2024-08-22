export const errorHandler = (err, req, res, next) => {
  const errorStatusCode = err.status || 500;
  res.status(errorStatusCode).json({ success: false, msg: err.message });
};
