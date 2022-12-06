const db = require("../models")
const Cart = db.cart

exports.create = (req ,res) =>{
    if (!req.body.title){
        res.status(404).send({message: "Content of the post cannot be emptiy!"});
        return

    }

    const post = new Cart({
        title:req.body.title,
        price:req.body.price,
        image:req.body.image,
    })
    
    post.save(post)
    .then(data =>{
        res.send(data)
    })
    
    .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Post"
        });
      });
}

exports.findAll = (req, res) => {
    const title= req.query.title;
    var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};
    
    Cart.find(condition)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving posts."
        });
      });
};

exports.findOne = (req, res) => {
    const id = req.params.id;
  
    Cart.findById(id)
      .then(data => {
        if (!data)
          res.status(404).send({ message: "Not found Cart with id " + id });
        else res.send(data);
      })
      .catch(err => {
        res
          .status(500)
          .send({ message: "Error retrieving Cart with id=" + id });
      });
};

exports.update = (req, res) =>{
    const id = req.params.id;
  
    Cart.findByIdAndUpdate(id, req.body, { useFindAndModify: true})
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot update Post with id=${id}. Maybe Post was not created!`
          });
        } else res.send({ message: "Post was updated successfully." });
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating the Post with id=" + id
        });
      });
};

exports.delete = (req, res) => {
    const id = req.params.id;
  
   Cart.findByIdAndRemove(id, { useFindAndModify: false })
      .then(data => {
        console.log(data)
        if (!data) {
          res.status(404).send({
            message:` Cannot delete POST with id=${id}. Maybe Post was not created!`
          });
        } else {
          res.send({
            message: "Post was deleted successfully!"
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Post with id=" + id
        });
      });
  };

  exports.deleteAll = (req, res) => {
    Cart.deleteMany({})
      .then(data => {
        res.send({
          message:` ${data.deletedCount} Posts were deleted successfully!`
        });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all posts."
        });
      });
  };
