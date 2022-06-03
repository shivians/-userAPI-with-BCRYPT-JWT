const express = require("express");
const router = express.Router();
const Category = require("../models/category");

//routes

router.post("/category", async (req, res) => {
  try {
    console.log(req.body);
    const category = new Category(req.body);
    const newCategory = await category.save();
    res.send(newCategory);
  } catch (error) {
    res.json({ error: "something is error" });
  }
});

// get All Category
router.get("/allCategory", async (req, res) => {
  try {
    const category = await Category.find();
    res.json({ data: category });
  } catch (error) {
    res.json({ error: error });
  }
});

//read category

router.get("/findCategory", async (req, res) => {
  try {
    const category = await Category.find(req.body);
    res.send(category);
  } catch (error) {
    res.json({ error: "something is error" });
  }
});

//deleteCategory

router.delete("/deleteCategory/:id", async (req, res) => {
  try {
    console.log(req.params.id);
    const _id = req.params.id;
    const deleteCat = await Category.findByIdAndDelete(_id);
    res.json({
      message: "delete successfully",
      data: deleteCat,
    });
  } catch (error) {
    res.json({ error: error });
  }
});

//update category

router.patch("/updateCategory/:id", async (req, res) => {
  try {
    console.log(req.params.id);
    const _id = req.params.id;
    const data = req.body;
    const updateCat = await Category.findOneAndUpdate(_id);
    res.json({
      message: "update successfully",
      data: updateCat,
    });
  } catch (error) {
    res.json({ error: error });
  }
});

module.exports = router;
