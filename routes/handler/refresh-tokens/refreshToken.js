const jwt = require('jsonwebtoken');
const apiAdapter = require('../../apiAdapter');
const {
  URL_SERVICE_USER,
  JWT_SECRET,
  JWT_SECRET_REFRESH_TOKEN,
  JWT_ACCESS_TOKEN_EXPIRED
} = process.env;

const api = apiAdapter(URL_SERVICE_USER);

module.exports = async (req, res) => {
  try {
    // Mengambil 2 parameter dari body, yaitu refresh token dan email.
    const refreshToken = req.body.refresh_token;
    const email = req.body.email;

    // Cek apakah request refresh token dan email
    // dikirim oleh front end atau tidak.
    // Jika salahsatu tidak dikirim, maka akan muncul 
    // Status berikut.
    if (!refreshToken || !email) {
      return res.status(400).json({
        status: 'error',
        message: 'invalid token',
      });
    };

    
    // Mengecek apakah request refresh token ada di dalam 
    // Database atau tidak dengan menggunakan API dari service user.
    await api.get('/refresh_tokens', { params: { refresh_token: refreshToken } });


    // Jika refresh token ditemukan dalam database, maka
    // akan diverifikasi apakah valid dan tidak kadaluarsa.
    jwt.verify(refreshToken, JWT_SECRET_REFRESH_TOKEN, (err, decoded) => {
      if(err) {
        return res.status(403).json({
          status: 'error',
          message: err.message
        });
      }

      // Mengecek apakah email yang dikirim sama 
      // dengan email yang telah di decode
      if(email !== decoded.data.email) {
        return res.status(400).json({
          status: 'error',
          message: 'email is not valid.',
        });
      }

      // Jika email yang dikirim sama, maka
      // akan dibuat token yang baru.
      const token = jwt.sign({ data: decoded.data }, JWT_SECRET, {expiresIn: JWT_ACCESS_TOKEN_EXPIRED});
      return res.json({
        status: 'success',
        data: {
          token
        }
      });
    });

  } catch (error) {

    if (error.code === 'ECONNREFUSED') {
      return res.status(500).json({ status: 'error', message: 'service unavailable' });
    }

    const { status, data } = error.response;
    return res.status(status).json(data);
  }
}
