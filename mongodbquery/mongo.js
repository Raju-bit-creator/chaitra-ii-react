// 🔹 Create
// db.collection.insertOne({ name: "xyz", age: 25 });
// db.collection.insertMany([{ name: "A" }, { name: "B" }]);

// 🔹 Read
// db.collection.find();                      // Get all documents
// db.collection.findOne({ name: "xyz" });   // Get one document
// db.collection.find({ age: { $gt: 18 } });  // Age > 18

// 🔹 Update
// db.collection.updateOne({ name: "xyz" }, { $set: { age: 26 } });
// db.collection.updateMany({ age: { $lt: 20 } }, { $set: { minor: true } });

// 🔹 Delete
// db.collection.deleteOne({ name: "sanjaya" });
// db.collection.deleteMany({ age: { $lt: 18 } });


// 🔸 Comparison Operators
// $eq    // Equal
// $ne    // Not equal
// $gt    // Greater than
// $lt    // Less than
// $gte   // Greater than or equal
// $lte   // Less than or equal
// $in    // Matches values in an array
// $nin   // Not in array



// 🧠 Indexing
// db.collection.createIndex({ date: 1 });        // Ascending
// db.collection.createIndex({ date: -1 });       // Descending


// Sort, Limit, Skip
// db.products.find().sort({ price: -1 }).limit(5).skip(10);