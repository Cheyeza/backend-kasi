const db = require("../models")
const Product = db.products;


exports.create = (req ,res) =>{
    if (!req.body.title){
        res.status(404).send({message: "Content of the post cannot be emptiy!"});
        return

    }

    const post = new Product({
        userId: req.userId,
        title:req.body.title,
        category:req.body.category,
        price:req.body.price,
        image: req.body.image,
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
   
    Product.find(condition)
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

exports.findMenu = (req, res) => {
  
    Product.find({userId: req.params.userId})
      .then(data => {
        if (!data)
          res.status(404).send({ message: "Not found Post with id " + id });
        else res.send(data);
      })
      .catch(err => {
        res
          .status(500)
          .send({ message: "Error retrieving Post with id=" + id });
      });
};

exports.findOne = (req, res) => {
  
  Product.findById(req.params.id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found Post with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving Post with id=" + id });
    });
};

exports.update = (req, res) =>{
    const id = req.params.id;
  
    Product.findByIdAndUpdate(id, req.body, { useFindAndModify: true})
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot update Post with id=${id}. Maybe Post was not created!`
          });
        } else res.send({ 
          product: data,
          message: "Post was updated successfully." 
        });
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating the Post with id=" + id
        });
      });
};

exports.delete = (req, res) => {
    const id = req.params.id;
  
   Product.findByIdAndRemove(id, { useFindAndModify: false })
      .then(data => {
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
    Product.deleteMany({})
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

  
