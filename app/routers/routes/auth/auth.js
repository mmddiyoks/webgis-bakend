const {
  UserController,
} = require("../../../http/controller/auth/users.controller");
const { checkloginAccess, logout } = require("../../../http/middleware/auth");

const {
  expressValidatorMapper,
} = require("../../../http/middleware/checkErrors");
const { verifyToken } = require("../../../http/middleware/verifyAccessToken");
const { registerValidator } = require("../../../http/validations/auth");

const router = require("express").Router();

/**
 * @swagger
 * auth:
 *   name: Auth
 *   description: login and signup
 */
/**
 * @swagger
 * /api/v1/auth/register:
 *  post:
 *      summary: Signup to server
 *      tags: [Auth]
 *      description: Signup to the server
 *      parameters:
 *      -   name: username
 *          type: string
 *          in: formData
 *          required: true
 *      -   name: name
 *          type: string
 *          in: formData
 *          required: true
 *      -   name: lastname
 *          type: string
 *          in: formData
 *          required: true
 *      -   name: email
 *          type: string
 *          in: formData
 *          required: true
 *      -   name: phone
 *          type: string
 *          in: formData
 *          required: true
 *      -   name: password
 *          type: string
 *          in: formData
 *          required: true
 *      -   name: birthdate
 *          type: string
 *          in: formData
 *          required: true
 *      -   name: adress
 *          type: string
 *          in: formData
 *          required: true
 *      responses:
 *          200:
 *              description: Success
 *          404:
 *              description: Not Found
 *          500:
 *              description: Internal Server Error
 */

/**
 * @swagger
 * /api/v1/auth/refreshtoken:
 *  post:
 *      summary: Make Refresh Token
 *      tags: [Auth]
 *      description: Make Refresh Token
 *      parameters:
 *      -   name: refreshtoken
 *          type: string
 *          in: formData
 *          required: true
 *      responses:
 *          200:
 *              description: Success
 *          404:
 *              description: Not Found
 *          500:
 *              description: Internal Server Error
 */

/**
 * @swagger
 * /api/v1/auth/login:
 *  post:
 *      summary: Login to server
 *      tags: [Auth]
 *      description: login to the server
 *      parameters:
 *      -   name: username
 *          type: string
 *          in: formData
 *          required: true
 *      -   name: password
 *          type: string
 *          in: formData
 *          required: true
 *      responses:
 *          200:
 *              description: Success
 *          404:
 *              description: Not Found
 *          500:
 *              description: Internal Server Error
 */
/**
 * @swagger
 * /api/v1/auth/userdata:
 *  post:
 *      summary: Get User Data
 *      tags: [Auth]
 *      description: Get User Data
 *      parameters:
 *      -   name: phone
 *          type: string
 *          in: formData
 *          required: true
 *      responses:
 *          200:
 *              description: Success
 *          404:
 *              description: Not Found
 *          500:
 *              description: Internal Server Error
 */

/**
 * @swagger
 * /api/v1/auth/users:
 *  get:
 *      summary: get all users
 *      tags: [Auth]
 *      description: get all users
 *      responses:
 *          200:
 *              description: Success
 *          404:
 *              description: Not Found
 *          500:
 *              description: Internal Server Error
 */

/**
 * @swagger
 * /api/v1/auth/checklogin:
 *  get:
 *      summary: check user is login or not
 *      tags: [Auth]
 *      description: check user is login or not
 *      responses:
 *          200:
 *              description: Success
 *          404:
 *              description: Not Found
 *          500:
 *              description: Internal Server Error
 */

/**
 * @swagger
 * /api/v1/auth/logout:
 *  get:
 *      summary: logout from server
 *      tags: [Auth]
 *      description: logout from server
 *      responses:
 *          200:
 *              description: Success
 *          404:
 *              description: Not Found
 *          500:
 *              description: Internal Server Error
 */
/**
 * @swagger
 * /api/v1/auth/update:
 *  put:
 *      summary: Update User Data
 *      tags: [Auth]
 *      description: Update User Data
 *      parameters:
 *      -   name: name
 *          type: string
 *          in: formData
 *          required: true
 *      -   name: lastname
 *          type: string
 *          in: formData
 *          required: true
 *      -   name: email
 *          type: string
 *          in: formData
 *          required: true
 *      -   name: phone
 *          type: string
 *          in: formData
 *          required: true
 *      -   name: birthdate
 *          type: string
 *          in: formData
 *          required: true
 *      -   name: adress
 *          type: string
 *          in: formData
 *          required: true
 *      responses:
 *          200:
 *              description: Success
 *          404:
 *              description: Not Found
 *          500:
 *              description: Internal Server Error
 */
/**
 * @swagger
 * /api/v1/auth/remove:
 *  delete:
 *      summary: remove user from server
 *      tags: [Auth]
 *      description:  remove user from server
 *      parameters:
 *      -   name: phone
 *          type: string
 *          in: formData
 *          required: true
 *      responses:
 *          200:
 *              description: Success
 *          404:
 *              description: Not Found
 *          500:
 *              description: Internal Server Error
 */

router.post(
  "/register",
  registerValidator(),
  expressValidatorMapper,
  UserController.register
);
router.post("/login", UserController.login);
router.post("/userdata", verifyToken, UserController.getUserData);
router.post("/refreshtoken", verifyToken, UserController.refreshToken);

router.put("/update", verifyToken, UserController.updateUser);
router.get("/users", verifyToken, UserController.getAllUser);
router.get("/checklogin", verifyToken, UserController.userStatusCheck);
router.get("/logout", verifyToken, logout);
router.delete("/remove", verifyToken, UserController.removeUser);
module.exports = {
   authRouted: router,
};
