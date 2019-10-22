exports.response = (response, res) => res.json(response);

exports.error = res =>
  res.json({
    status: 0,
    message: "Something went wrong! Please try again later"
  });

exports.noresult = res =>
  res.json({
    status: 0,
    message: "No records found"
  });

exports.notoken = res =>
  res.json({
    status: 0,
    message: "Invalid Token"
  });
