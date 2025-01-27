const router = require("express").Router();
const {
  store,
  update,
  getPosts,
  getPostById,
  deletePost
} = require("../controllers/PostController");
const {
  storeValidation,
  updateValidation
} = require("../middlewares/PostValidation");

router.post("/storepost", storeValidation, store);
router.put("/updatepost/:id", updateValidation, update);
router.get("/getposts", getPosts);
router.get("/getpost/:id", getPostById);
router.delete("/deletepost/:id", deletePost);

module.exports = router;