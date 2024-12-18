const { serialize } = require("cookie");
const { User } = require("../../../../models");
const {
  SignAccessToken,
  verifyRefreshToken,
  SignRefreshToken,
} = require("../../../modules/functions");
const { sha256pass } = require("../../../utils/access");

class UserController {
  async register(req, res, next) {
    try {
      const {
        username,
        password,
        name,
        email,
        lastname,
        phone,
        birthdate,
        adress,
      } = req.body;
      const hash_password = sha256pass(password);

      await User.create({
        name,
        lastname,
        username,
        email,
        phone,
        password: hash_password,
        birthdate,
        adress,
      });

      return res.status(200).json({
        status: 200,
        name: name,
        message: "User Created Successfuly!",
        signupDate: new Date(),
      });
    } catch (error) {
      next(error);
    }
  }

  async login(req, res, next) {
    try {
      const { username, password } = req.body;

      const accessToken = await SignAccessToken(username);
      const refreshToken = await SignRefreshToken(username);
      const expiration = 24 * 60 * 60;
      const hash_password = sha256pass(password);

      const dataGet = await User.findAll({
        where: {
          username,
          password: hash_password,
        },
      });

      const filter = { username };

      const updateData = {
        accessToken,
      };

      const updateToken = await User.update(updateData, {
        where: {
          filter,
        },
      });
      if (!dataGet) {
        return res.status(404).json({
          status: 404,
          message: "User not exist!",
          loginDate: new Date(),
        });
      }
      if (dataGet) {
        const cookieSet = serialize("refresh_token", refreshToken, {
          httpOnly: true,
          path: "/",
          maxAge: expiration,
          //  domain: ".localhost",
        });
        return res.status(200).setHeader("Set-Cookie", cookieSet).json({
          status: 200,
          name: dataGet[0].name,
          lastName: dataGet[0].lastname,
          email: dataGet[0].email,
          phoneNumber: dataGet[0].phone,
          birthDate: dataGet[0].birthdate,
          adress: dataGet[0].adress,
          userName: dataGet[0].username,
          accessToken: accessToken,
          message: "User Logged In Successfuly!",
          loginDate: new Date(),
        });
      }
    } catch (error) {
      next(error);
    }
  }

  async refreshToken(req, res, next) {
    try {
      const { refreshtoken } = req.body;
      const data = await verifyRefreshToken(refreshtoken);
      const username = data.username;
      const user = await User.findOne({ username });
      const accessToken = await SignAccessToken(user.username);
      const newRefreshToken = await SignRefreshToken(user.username);

      return res.status(200).json({
        status: 200,
        username: user.username,
        message: "Refresh Token Built Successfuly!",
        requestDate: new Date(),
        data: {
          accessToken: accessToken,
          refreshToken: newRefreshToken,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  async userStatusCheck(req, res, next) {
    try {
      return res.status(200).json({
        status: 200,
        isLogin: true,
        message: "User is Logged in !",
      });
    } catch (error) {
      next(error);
    }
  }

  async updateUser(req, res, next) {
    try {
      const { name, email, lastname, phone, birthdate, adress } = req.body;

      try {
        const filter = { phone };
        const updateData = {
          name,
          email,
          lastname,
          birthdate,
          adress,
        };
        const dataGet = await User.findOneAndUpdate(filter, updateData, {
          new: true,
        });

        res.status(200).json({
          status: 200,
          requestDate: new Date(),
          message: "User Updated Successfuly!",
        });
      } catch (error) {
        next(error);
      }
    } catch (error) {
      next(error);
    }
  }

  async getUserData(req, res, next) {
    try {
      const { phone } = req.body;

      try {
        const dataGet = await User.findOne({
          phone,
        });

        res.status(200).json({
          status: 200,
          requestDate: new Date(),
          name: dataGet.name,
          lastName: dataGet.lastname,
          email: dataGet.email,
          phoneNumber: dataGet.phone,
          birthDate: dataGet.birthdate,
          adress: dataGet.adress,
          userName: dataGet.username,
          message: "User Data Recived Successfuly!",
        });
      } catch (error) {
        next(error);
      }
    } catch (error) {
      next(error);
    }
  }

  async getAllUser(req, res, next) {
    try {
      try {
        const dataGet = await User.find();

        res.status(200).json({
          status: 200,
          requestDate: new Date(),
          data: { dataGet },
          message: "All Data's Recived Successfuly!",
        });
      } catch (error) {
        next(error);
      }
    } catch (error) {
      next(error);
    }
  }

  async removeUser(req, res, next) {
    try {
      const { phone } = req.body;

      try {
        const dataFind = await User.findOne({
          phone,
        });
        if (dataFind) {
          const dataGet = await User.findOneAndDelete({
            phone,
          });
          res.status(200).json({
            status: 200,
            requestDate: new Date(),

            message: "User Removed Successfuly!",
          });
        }
        if (!dataFind) {
          res.status(200).json({
            status: 200,
            requestDate: new Date(),
            message: "User Not Exist!",
          });
        }
      } catch (error) {
        next(error);
      }
    } catch (error) {
      next(error);
    }
  }
}

module.exports = { UserController: new UserController() };
