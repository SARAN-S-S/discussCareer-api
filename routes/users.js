const router = require("express").Router();
const User = require("../models/User");  
//const Post = require("../models/Post"); 

// UPDATE
router.put("/:id", async (req, res) => {
    if (req.body.userId === req.params.id) {
        if (req.body.password) {
            req.body.password = req.body.password; // No operation needed here for plain text
        }
        try {
            // Fix typo: req.body.params.id to req.params.id
            const updatedUser = await User.findByIdAndUpdate(req.params.id, {
                $set: req.body,
            }, { new: true }); // Add { new: true } to return the updated document

            // Check if the user exists
            if (!updatedUser) {
                return res.status(404).json("User not found!");
            }

            res.status(200).json(updatedUser);
        } catch (err) {
            res.status(500).json(err);
        }
    } else {
        res.status(401).json("Unauthorized");
    }
});

//DELETE
router.delete("/:id", async (req, res) => {
    if (req.body.userId === req.params.id) {
    
         try {
      const user = await User.findById(req.params.id);
      try {
        //await Post.deleteMany({ username: user.username });
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json("User has been deleted...");
      } catch (err) {
        res.status(500).json(err);
      }
        } catch (err) {
            res.status(500).json(err);
        }
    } else {
        res.status(401).json("Unauthorized");
    }
});

//GET USER
router.get("/:id", async (req, res) => {
    try  {
        const user = await User.findById(req.params.id);
        const { password, ...others} = user._doc;
        res.status(200).json(others);
    }  catch(err)  {
        res.status(500).json(err);
    }
})



module.exports = router;

