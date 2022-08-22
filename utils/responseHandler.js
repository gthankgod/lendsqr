const httpStatus = require('http-status')

function responseHandler(res, data = null, message, options) {
    let SuccessResponse = () => {
        res.status(httpStatus.CREATED);
        return res.json({ data, status: 'success', message});
    };
  
    let BadResponse = () => {
        res.status(httpStatus.BAD_REQUEST);
        return res.json({ data, status: 'error', message});
    };

    let ForbiddenResponse = () =>{
        res.status(httpStatus.FORBIDDEN);
        return res.json({ data, status: 'error', message});
    }
  
    let ServerResponse = () =>{
        res.status(httpStatus.BAD_GATEWAY);
        return res.json({ data, status: 'error', message});
    }
  
    let validCodes = {
      200: SuccessResponse,
      400: BadResponse,
      403: ForbiddenResponse,
      500: ServerResponse,
    };
  
    if (!validCodes[options?.code]) {
        res.status(httpStatus.UNPROCESSABLE_ENTITY);
        return res.json({ data, status: 'error', message});
    }

    return validCodes[options.code]();
  }
  
  module.exports = responseHandler;
  