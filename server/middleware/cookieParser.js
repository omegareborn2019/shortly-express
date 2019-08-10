const parseCookies = (req, res, next) => {
  var header = req.headers;

  if (!header) {
    req.cookies = {};
  } else if (header) {
    // console.log("WTF IS THIS header", header)
    // console.log("WTF IS THIS header.cookie", header.cookie)
    // console.log("WTF IS THIS header.Cookie", header.Cookie)
    if (Object.keys(header).length === 0 && header.constructor === Object) {
      req.cookies = {};
    } else if (header.cookie.indexOf(';') < 0) {
      var key = header.cookie.split('=')[0];
      var val = header.cookie.split('=')[1];
      req.cookies[key] = val;
    } else {
      var parsedCookie = req.headers.cookie.split('; ').reduce( (obj, item) => {
        obj[item.split('=')[0]] = item.split('=')[1];
        return obj;
      }, {});
      req.cookies = parsedCookie;
    }
  }
  res.send();
  next();
};


module.exports = parseCookies;