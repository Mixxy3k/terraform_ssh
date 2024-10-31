const express = require("express");
const { MongoClient } = require("mongodb");

const app = express();
const port = 3000;

// MongoDB connection URI (adjust if needed)
const uri = process.env.MONGO_URI || "mongodb://127.0.0.1:27017";
const client = new MongoClient(uri);
const dbName = "owo_db";
let collection;

// Connect to MongoDB once and reuse the client
async function connectToDatabase() {
    try {
        await client.connect();
        console.log("OwO! Connected to MongoDB!");
        const database = client.db(dbName);
        collection = database.collection("owo_collection");
    } catch (error) {
        console.error("UwU! Connection failed:", error);
    }
}

// Middleware to parse JSON
app.use(express.json());

// Insert a new document
app.post("/insert", async (req, res) => {
    const newDoc = req.body;
    try {
        const insertResult = await collection.insertOne(newDoc);
        res.status(201).json({
            message: "Inserted successfully!",
            insertedId: insertResult.insertedId,
        });
    } catch (error) {
        res.status(500).json({ message: "UwU! Insert failed.", error });
    }
});

// Find a document by name
app.get("/find/:name", async (req, res) => {
    const name = req.params.name;
    try {
        const document = await collection.findOne({ name });
        if (document) {
            res.status(200).json(document);
        } else {
            res.status(404).json({ message: "Document not found! Nyaa~" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error finding document.", error });
    }
});

// Update a document by name
app.put("/update/:name", async (req, res) => {
    const name = req.params.name;
    const updates = req.body;
    try {
        const updateResult = await collection.updateOne(
            { name },
            { $set: updates }
        );
        if (updateResult.modifiedCount > 0) {
            res.status(200).json({ message: "Updated successfully!" });
        } else {
            res.status(404).json({ message: "Document not found for update." });
        }
    } catch (error) {
        res.status(500).json({ message: "Error updating document.", error });
    }
});

// Delete a document by name
app.delete("/delete/:name", async (req, res) => {
    const name = req.params.name;
    try {
        const deleteResult = await collection.deleteOne({ name });
        if (deleteResult.deletedCount > 0) {
            res.status(200).json({ message: "Deleted successfully!" });
        } else {
            res.status(404).json({
                message: "Document not found for deletion.",
            });
        }
    } catch (error) {
        res.status(500).json({ message: "Error deleting document.", error });
    }
});

// Start the server and connect to the database
app.listen(port, async () => {
    await connectToDatabase();
    console.log(`OwO! Server is running on http://localhost:${port}`);
});
