const Category = require("../models/category_model");

const getAll = async (req, res) => {
    try {
        const categories = await Category.find()
          res.json({ categories });
    } catch (error) {
        res.json({ error: err });
    }
};

const findById = async (req, res) => {
    try {
        let category_id = req.params.category_id;
        const category = await Category.findById(category_id);
        res.json({ category });
    } catch (error) {
        res.json({ error });   
    }
};

const create = async (req, res) => {
  try {
    let category = new Category(req.body);
    if(req.file) {
        category.photo = req.file.filename;
    }
    await category.save();
    res.json({ message: "Created" });
  } catch (error) {
    res.json({ error });
  }
};

const update = async (req, res) => {
    try {
        let category_id = req.body.category_id;
        let updated_category = req.body;
        if(req.file) {
            updated_category.photo = req.file.filename;
        }
        await Category.findByIdAndUpdate(category_id, {$set: updated_category});
        res.json({ message: "Updated" });
    } catch (error) {
        res.json({ error });   
    }
};

const destroy = async (req, res) => {
    try {
        let category_id = req.body.category_id;
        await Category.findOneAndDelete(category_id);
        res.json({ message: "Deleted" });
    } catch (error) {
        res.json({ error });   
    }
};


module.exports = {
  getAll,
  findById,
  create,
  update,
  destroy
};
