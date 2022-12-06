module.exports = mongoose =>{   
    var schema = mongoose.Schema(
        {
            title: String,
            price: Number, 
            image: String, 
        },
        { timestamps : true}
    );
    schema.method("toJSON", function() {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
      });

    const Cart = mongoose.model("cart" , schema);

    return Cart;

}
