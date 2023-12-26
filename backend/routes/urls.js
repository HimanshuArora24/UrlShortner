const express = require("express");
const {
  createShortUrl,
  getUrls,
  getLongUrl,
  deleteUrl,
  updateUrl,
} = require("../controllers//urlControllers");
const requireAuth = require("../middleware/requireAuth");

const router = express.Router();

// GET long url
router.get("/getLongUrl/:id", getLongUrl);

// require auth for all other url routes
router.use(requireAuth);

// GET all urls
router.get("/", getUrls);

// POST a new url
router.post("/createShortUrl", createShortUrl);

// DELETE a new url
router.delete("/:id", deleteUrl);

// UPDATE a new url
router.patch("/:id", updateUrl);

module.exports = router;
