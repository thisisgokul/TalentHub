const express = require('express');
const app = express();
const cors=require("cors");
const mongooseConnect=require("./config/config")
const authRouter=require("./routes/authRoutes")
const cookieparser=require("cookie-parser");
const port = 5000;

// connect to database
mongooseConnect();

// middleware setup
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({
  credentials: true,
  origin: 'http://localhost:3000'
}));

app.use(cookieparser());

// Routes
app.use('/api/v1', authRouter);

app.listen(port, () => { 
    console.log('server connnected to', port);
})

