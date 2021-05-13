const express = require("express");
const asyncHandler = require("express-async-handler");
const router = express.Router();
const {
  getCocktails,
  getCocktail,
  getZutaten,
  getPreise,
  getSchnaeppchen,
  delCocktail,
} = require("../models/cocktails");

router.get(
  "/cocktails",
  asyncHandler(async (req, res) => {
    const result = await getCocktails();
    res.status(result.code).json(result);
  })
);

router.get(
  "/preise",
  asyncHandler(async (req, res) => {
    const result = await getPreise();
    res.status(result.code).json(result);
  })
),
  router.get(
    "/cocktails/:name",
    asyncHandler(async (req, res) => {
      const result = await getCocktail(req.params.name);
      res.status(result.code).json(result);
    })
  );

router.get(
  "/cocktails/:name/zutaten",
  asyncHandler(async (req, res) => {
    const result = await getZutaten(req.params.name);
    res.status(result.code).json(result);
  })
),
  router.get(
    "/schnaeppchen",
    asyncHandler(async (req, res) => {
      const result = await getSchnaeppchen(7.2);
      res.status(result.code).json(result);
    })
  ),
  router.delete(
    "/cocktails/:name",
    asyncHandler(async (req, res) => {
      const result = await delCocktail(req.params.name);
      res.status(result.code).json(result);
    })
  );

module.exports = router;
