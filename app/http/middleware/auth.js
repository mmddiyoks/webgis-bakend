const { verifyToken } = require("../../utils/access");
const { SECRET_KEY } = require("../../utils/constant");

async function checkloginAccess(req, res, next) {
  try {
    const accessToken = req.headers.cookie;
    if (accessToken) {
      const parsedToken = accessToken.replace("_TurkT=", "");
      const token = parsedToken;
      const result = verifyToken(token, SECRET_KEY);

      if (!result) {
        return res.status(401).json({
          status: 401,
          isLogin: false,
          message:
            "You don't have permission to access this api , please login",
        });
      } else {
        res.status(200).json({
          status: 200,
          isLogin: true,
          message: "User is Logged in !",
        });
      }
    } else {
      return res.status(401).json({
        status: 401,
        isLogin: false,
        message: "You don't have permission to access this api , please login",
      });
    }
  } catch (error) {
    next(error);
  }
}
async function logout(req, res, next) {
  try {
  
        res
          .status(200)
          .cookie("_TurkT", "", {
            path: "/",
            expires: new Date(Date.now()),
          })
          .json({
            status: 200,
            isLogin: true,
            message: "User is logged out successfuly !",
          });
      
    
  } catch (error) {
    next(error);
  }
}
module.exports = {
  checkloginAccess,
  logout,
};
