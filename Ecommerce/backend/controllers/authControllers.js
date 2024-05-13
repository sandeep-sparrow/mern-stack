const adminModel = require('../models/adminModel');
const { responseReturn } = require('../utilities/response');
const bcrypt = require('bcrypt');
const { createToken } = require('../utilities/tokenCreate');

class authControllers{
    admin_login = async(req, res) => {
        const {email, password} = req.body;
        try {
            const admin = await adminModel.findOne({email}).select('+password');
            if(admin){
                const match = await bcrypt.compare(password, admin.password);
                if(match){
                    const token = await createToken({
                        id: admin.id,
                        role: admin.role
                    });
                    res.cookie('accessToken', token, {
                        expires: new Date(Date.now() + 1*24*60*60*1000)
                    });
                    responseReturn(res, 200, {token, message: "Login success!"});
                }else{
                    responseReturn(res, 404, {error: "Incorrect password!"});
                }
            }else{
                responseReturn(res, 404, {error: "Email not found!"});
            }
        } catch (error) {
            responseReturn(res, 500, {error: error.message});
        }
    }
};

module.exports = new authControllers();