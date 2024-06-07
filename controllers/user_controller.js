const User = require("../models/user_model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
    try {
        const user = await User.findOne({email: req.body.email});
        if(user) {
            if(await bcrypt.compare(req.body.password, user.password)) {
                let token = await jwt.sign({...user, timestamp: Date.now() }, process.env.SECRET, {
                    expiresIn: '1h'
                });
                res.json({ user, token });
            } else {
                res.json({ message: "Incorrect password!" });    
            }
        } else {
            res.json({ message: "This email is not registerd!" });
        }
    } catch (error) {
        res.json({ error });   
    }
};

const getAll = async (req, res) => {
    try {
        const users = await User.find()
          res.json({ users });
    } catch (error) {
        res.json({ error: err });
    }
};

const findById = async (req, res) => {
    try {
        let user_id = req.params.user_id;
        const user = await User.findById(user_id);
        res.json({ user });
    } catch (error) {
        res.json({ error });   
    }
};

const create = async (req, res) => {
  try {
    // req.body.password = bcrypt.hashSync(req.body.password, 10);
    let user = new User(req.body);
    await user.save();
    res.json({ message: "Created" });
  } catch (error) {
    res.json({ error });
  }
};

const update = async (req, res) => {
    try {
        if(req.body.password) {
            delete req.body.password;
        }
        let user_id = req.body.user_id;
        let updated_user = req.body;
        await User.findOneAndUpdate({_id: user_id}, {$set: updated_user});
        res.json({ message: "Updated" });
    } catch (error) {
        res.json({ error });   
    }
};

const destroy = async (req, res) => {
    try {
        let user_id = req.body.user_id;
        await User.findOneAndDelete(user_id);
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
  destroy,
  login
};
