// VERIFY TOKEN DIGUNAKAN UNTUK MEMVALIDASI 
// SETIAP TOKEN YANG DIKIRIM KE API

const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;

module.exports = async (req, res, next) => {
    const token = req.headers.authorization;
    jwt.verify(token, JWT_SECRET, function(err, decoded){
        // Jika error maka akan muncul status berikut.
        if (err) {
            return res.status(403).json({ message: err.message });
        }

        // Jika tidak ada error, maka
        // data yang sudah di decode akan di inject ke object request
        req.user = decoded;
        return next();
    });
}