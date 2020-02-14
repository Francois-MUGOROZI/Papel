const errorHandle = (res, error) => {
  if (error.routine === 'string_to_uuid') {
    res.status(404).json({
      status: res.statusCode,
      error: 'Not Found!'
    });
  }
  if (Object.keys(error).length === 0) {
    res.status(404).json({
      status: res.statusCode,
      error: 'Not Found!'
    });
  }
  if (error.routine === '_bt_check_unique') {
    res.status(409).json({
      status: res.statusCode,
      error: 'Already exists!'
    });
  }

  res.status(500).json({
    status: res.statusCode,
    error: error.message
  });
};

export default errorHandle;