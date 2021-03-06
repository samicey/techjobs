const { validationResult, matchedData} = require("express-validator");

const validateRequest = (req, res, next)=>{
  const errors = validationResult(req).array({
    onlyFirstError: true,
  });
  if (errors.length) {
    return res.status(422).send(errors);
  }
  const data = matchedData(req);
  res.locals.data = data;
  return next();
}

module.exports ={
  validateRequest
}