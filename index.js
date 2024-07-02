const port = 4000;
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Product = require('./models');
const User = require('./userSchema');
const Checkout = require('./checkoutSchema');
const app = express();

app.use(express.json());
app.use(cors());

// MongoDB connection string
const mongoUri = "mongodb+srv://root:root2026@playpaws.menwwtm.mongodb.net/?retryWrites=true&w=majority&appName=playpaws";

// Connect to MongoDB
mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

// Default route
app.get("/", (req, res) => {
  res.send("App is running");
});

// Route to add a product
app.post('/addproduct', async (req, res) => {
  try {
    const product = new Product({
      id: req.body.id,
      name: req.body.name,
      image: req.body.image,
      category: req.body.category,
      price: req.body.price,
      description: req.body.description,
    });

    await product.save();
    console.log("Product saved");

    res.json({
      success: true,
      name: req.body.name,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route to get all products
app.get('/products', async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/products-list', async (req, res) => {
  try {
    const products = await Product.find({}, 'image name price');
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
app.delete('/product/:id', async (req, res) => {
  try {
    const productId = req.params.id;
    const deletedProduct = await Product.findByIdAndDelete(productId);
    if (!deletedProduct) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/signup', async (req, res) => {
  try {
      // Extract data from the request body sent by React frontend
      const { custName, email, custPassword } = req.body;

      // Check if user already exists
      const existingUser = await UserModel.findOne({ email });

      if (existingUser) {
          return res.status(400).json({ success: false, message: 'User already exists' });
      }

      // Create a new user document using your Mongoose model
      const newUser = new UserModel({
          custName,
          email,
          custPassword
      });

      // Save the new user document to MongoDB
      const savedUser = await newUser.save();

      // Respond with a success message
      res.status(201).json({ success: true, message: 'User signed up successfully', user: savedUser });
  } catch (error) {
      // Handle errors
      console.error('Error signing up user:', error);
      res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// GET route to handle user sign in
app.get('/signin', async (req, res) => {
  try {
      // Extract data from the query parameters sent by React frontend
      const {custName,email, custPassword } = req.query;

      // Check if user exists and password matches
      const existingUser = await UserModel.findOne({ email, custPassword });

      if (!existingUser) {
          return res.status(401).json({ success: false, message: 'Invalid credentials' });
      }

      // Respond with success message or user data
      res.status(200).json({ success: true, message: 'User signed in successfully', user: existingUser });
  } catch (error) {
      // Handle errors
      console.error('Error signing in user:', error);
      res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

app.post('/register', async (req, res) => {
  try {
    const userData = new User(req.body);
    await userData.save();
    res.status(200).send('User registration successful');
  } catch (error) {
    console.error('Error during user registration:', error);
    res.status(500).send('Failed to register user');
  }
});


app.post('/checkout', async (req, res) => {
  try {
    const checkoutData = new Checkout(req.body);
    await checkoutData.save();
    res.status(200).send('Checkout information saved successfully');
  } catch (error) {
    console.error('Error saving checkout information:', error);
    res.status(500).send('Failed to save checkout information');
  }
});

// Start the server
app.listen(port, (error) => {
  if (!error) {
    console.log("Server running on port " + port);
  } else {
    console.log("Error: " + error);
  }
});
