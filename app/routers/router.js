const { authRouted } = require("./routes/auth/auth");
const { layerRoutes } = require("./routes/layers/layers");
const router = require("express").Router();

router.use("/api/v1/auth", authRouted);
router.use("/api/v1/layers", layerRoutes);

module.exports = {
  allRouted: router,
};
