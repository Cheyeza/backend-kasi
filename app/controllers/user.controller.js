const db = require("../models")
const User = db.user

exports.findAll = (req, res) => {
    const title= req.query.title;
    var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};
    
    User.find(condition)
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
  
    User.findById(id)
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
  
    User.findByIdAndUpdate(id, req.body, { useFindAndModify: true})
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
  
   User.findByIdAndRemove(id, { useFindAndModify: false })
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