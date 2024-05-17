// required for security purpose
const jwt = require('jsonwebtoken');
const { responseReturn } = require('../utilities/response');

module.exports.authMiddleware = async(req, res, next) => {
    const { accessToken }= req.cookies;

    if(!accessToken){
        return res.status(409).json({ error: 'please login first!' });
    }else{
        try {
            // decode
            const decodedToken = await jwt.verify(accessToken, process.env.SECRET);
            req.role = decodedToken.role;
            req.id = decodedToken.id;
            next()
        } catch (error) {
            return res.status(409).json({ error: 'please login first!' });
        }
    }
}