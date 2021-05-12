const express = require("express");
const asyncHandler = require("express-async-handler");
const router = express.Router();
const { getCocktails, getCocktail } = require("../models/cocktails");

router.get(
  "/cocktails",
  asyncHandler(async (req, res) => {
    const result = await getCocktails();
    res.status(result.code).json(result);
  })
);

router.get(
  "/cocktails/:name",
  asyncHandler(async (req, res) => {
    const result = await getCocktail(req.params.name);
    res.status(result.code).json(result);
  })
);

module.exports = router;
