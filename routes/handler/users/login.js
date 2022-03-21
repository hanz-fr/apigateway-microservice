const apiAdapter = require('../../apiAdapter');
const jwt = require('jsonwebtoken');

const {
  URL_SERVICE_USER,
  JWT_SECRET,
  JWT_SECRET_REFRESH_TOKEN,
  JWT_ACCESS_TOKEN_EXPIRED,
  JWT_REFRESH_TOKEN_EXPIRED
} = process.env;

const api = apiAdapter(URL_SERVICE_USER);

module.exports = async (req, res) => {
  try {
    const user = await api.post('/users/login', req.body);
    const data = user.data.data;


    // Access token digunakan untuk mengakses API.
    // Refresh token digunakan untuk memperbaharui token sebelumnya jika telah kadaluarsa.

    const token = jwt.sign({ data /*Payload Data*/  }, JWT_SECRET, { expiresIn: JWT_ACCESS_TOKEN_EXPIRED });
    const refreshToken = jwt.sign({ data /*Payload Data*/  }, JWT_SECRET_REFRESH_TOKEN, { expiresIn: JWT_REFRESH_TOKEN_EXPIRED });

    // Menyimpan token
    await api.post('/refresh_tokens', { refresh_token: refreshToken, user_id: data.id });

    // respons
    return res.json({
        status: 'success.',
        data: {
            token,
            refresh_token: refreshToken
        }
    });

  } catch (error) {

    if (error.code === 'ECONNREFUSED') {
      return res.status(500).json({ status: 'error', message: 'service unavailable' });
    }

    const { status, data } = error.response;
    return res.status(status).json(data);
  }
}