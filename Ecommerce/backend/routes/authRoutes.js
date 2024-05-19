const router = require('express').Router();
const authControllers = require('../controllers/authControllers');
const { authMiddleware } = require('../middlewares/authMiddleware');

router.post("/admin-login", authControllers.admin_login);
router.get("/get-user", authMiddleware, authControllers.get_User);
  
module.exports = router;