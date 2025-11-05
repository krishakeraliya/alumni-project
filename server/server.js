require("dotenv").config() // ⬅️ .env file load karo
const express = require("express")
const cors=require("cors")
const app = express()
const authRoute = require("./routes/auth-router") // ⬅️ Routes include karo
const internshipRoute = require("./routes/internship-route");
const path = require("path");
const galleryRoutes = require('./routes/galleryRoutes');

// const contactRoute=require("./routes/contact-router")
// const serviceRoute=require("./routes/service-router")

const connectdb = require("./utils/db")
const errormiddleware = require("./middlewares/error-middleware")
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';


const coreOptions={
 origin: ["http://localhost:5173", "http://192.168.46.221:5173"],
  methods:"GET , POST , PUT , DELETE, PATCH ,HEAD",
  credentials:true
}
app.use(cors(coreOptions))

app.use(express.json()) 
app.use("/api/auth", authRoute) 
app.use("/api", internshipRoute);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
// Serve uploaded files statically
const uploadDir = process.env.UPLOAD_DIR || 'uploads';
app.use('/uploads', express.static(path.join(__dirname, uploadDir)));

// Routes
app.use('/api/gallery', galleryRoutes);




// app.use("/api/form",contactRoute)
// app.use("/api/data",serviceRoute)
app.use(errormiddleware)

const PORT = 5000;
connectdb().then(() => {
  app.listen(PORT, () => {
    console.log(`server start on port ${PORT}`);
  })
})
