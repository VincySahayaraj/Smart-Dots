const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const expressValidator = require('express-validator');
var fileupload = require("express-fileupload");
require('dotenv').config();
const path = require("path");

// import Routes
const categoryRoutes = require('./routes/category');
const supplierRoutes = require('./routes/supplier');
const contactRoutes = require('./routes/contact');
const invHistoryRoutes = require('./routes/invHistory');
const cartRoutes = require('./routes/cart');
const orderRoutes = require('./routes/order');
const checkoutRoutes = require('./routes/checkout');
const cardDetailRoutes = require('./routes/cardDetail');
const orderlogRoutes = require('./routes/orderlog');
const shipingRoutes = require('./routes/shipping');
const couponRoutes = require('./routes/coupon');
const returnreqRoutes = require('./routes/returnreq');
const authNewRoutes = require('./routes/auth_new');
const itemRoutes = require('./routes/item');
const newCustomerRoutes = require('./routes/new_customer');
const dashboardRoutes = require('./routes/dashboard');
const mowerRoutes = require('./routes/mower');
const addressRoutes = require('./routes/address');
const serviceRoutes = require('./routes/service');
const distancePricingRoutes = require('./routes/distancePricing');

// app
const app = express();

// db
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
})
    .then(() => console.log("DB connected"));

//cors middleware
app.use(cors({
    origin: '*'
}));

// middleware
app.use(morgan('dev'));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(cookieParser());
app.use(expressValidator());

// Routes middleware
app.use('/api', authNewRoutes);
app.use('/api', categoryRoutes);
app.use('/api', supplierRoutes);
app.use('/api', contactRoutes);
app.use('/api', invHistoryRoutes);
app.use('/api', cartRoutes);
app.use('/api', orderRoutes);
app.use('/api', checkoutRoutes);
app.use('/api', cardDetailRoutes);
app.use('/api', orderlogRoutes);
app.use('/api', shipingRoutes);
app.use('/api', couponRoutes);
app.use('/api', returnreqRoutes);
app.use('/static', express.static(path.join(__dirname, 'uploads')));
app.use('/api', itemRoutes);
app.use('/api', newCustomerRoutes);
app.use('/api', dashboardRoutes);
app.use('/api', mowerRoutes);
app.use('/api', addressRoutes);
app.use('/api', serviceRoutes);
app.use('/api', distancePricingRoutes);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
});