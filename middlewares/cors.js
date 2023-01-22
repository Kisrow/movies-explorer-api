const allowedCors = [
  'http://kisrow.frontend.nomoredomains.rocks',
  'https://kisrow.frontend.nomoredomains.rocks',
  'http://localhost:3000',
  'http://192.168.1.2:3000',
];
module.exports = (req, res, next) => {
  const { origin } = req.headers;
  const { method } = req;

  const DEFAULT_ALLOWED_METHODS = 'GET, HEAD, PUT, PATCH, POST, DELETE';
  const requestHeaders = req.headers['access-control-request-headers'];

  // Проверим, есть ли источник запроса среди разрешённых
  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
    // С опцией credentials токен передает браузер, который сохраняется в куках
    res.header('Access-Control-Allow-Credentials', true);
  }

  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', requestHeaders);
    return res.end();
  }
  next();
};
