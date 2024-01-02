require("dotenv").config();
const express = require("express");
const app = express();
const router = require('./router/auth-router');
const connectDb = require('./utils/db');
const errorMiddleware = require("./middlewares/error-middleware");
const contactRoute = require('./router/contact-route')
const cors = require("cors");

const corsOptions = {
    origin: "http://localhost:5173",
    methods: "GET, POST, PUT, DELETE, PATCH, HEAD",
    credentials: true,
};

app.use(cors(corsOptions));

app.use(express.json()); //middleware

app.use('/api/auth', router); //router
app.use("/api/form", contactRoute);

// app.use(errorMiddleware);

const PORT = 5000;

connectDb().then(() => {
    app.listen(PORT, () => {
        console.log(`server is running at port : ${PORT}`);
    })
})



// Now using this by router...
// app.get("/", (req, res) => {
//     res.status(200).send(`hello port : ${PORT}`);
// }) 