
import express from "express";

const app = express();

app.use(express.json());

// Temporary storage
const messages = [];

// POST API: Create a new contact message
app.post("/api/contact", (req, res) => {

  const { name, email, message } = req.body ?? {};

  // TODO 1: Validate all fields
  if (!name || !email || !message) {
    return res.status(400).json({
      success: false,
      message: "All fields are required"
    });
  }
   // Clean the email:
  const cleanEmail = email.trim().toLowerCase();


  // TODO 2: Create a new contact object
  const newMessage = {
    id: messages.length + 1,
    name,
    email: cleanEmail,
    message
  };

  // Store the object in the array
  messages.push(newMessage);

  // TODO 3: Send success response
  res.status(201).json({
    success: true,
    message: `Thanks ${name}!`,
    data: newMessage
  });

});

// GET API: Get all contact messages
app.get("/api/contact", (req, res) => {

  // TODO 4: Send all messages
  res.json(messages);

});

// Start the server
app.listen(3004, () => {
  console.log("Server running at http://localhost:3004");
});
