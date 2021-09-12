const srcResponse = (res, statusCode, meta, data, error, message) => {
  const dataResponse = {
    status: message || 'Success',
    statusCode: statusCode || 200,
    meta: meta,
    data: data,
    error: error || null,
  };
  res.status(statusCode).json(dataResponse);
};

module.exports = srcResponse;
