require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const path = require('path');

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('MongoDB conectado'))
.catch(err => console.log(err));

const ProductSchema = new mongoose.Schema({
    name: String,
    imageUrl: String
});

const Product = mongoose.model('Product', ProductSchema);

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage });

app.get('/health', (req, res) => {
    res.json({ status: 'OK' });
});

app.post('/upload', upload.single('image'), async (req, res) => {

    const imageUrl = `http://nginx/images/${req.file.filename}`;

    const product = new Product({
        name: req.body.name,
        imageUrl
    });

    await product.save();

    res.json(product);
});

app.get('/products', async (req, res) => {
    const products = await Product.find();
    res.json(products);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
});