const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const errorController = require("./controllers/error");
const User = require("./models/user");
const mongoose = require("mongoose");
const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  User.findById("629cc7bc972d82932d39ff91")
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => console.log(err));
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

mongoose
  .connect(
    "mongodb+srv://Huyfx15531:040199@cluster0.xadso29.mongodb.net/?retryWrites=true&w=majority"
  )
  .then((result) => {
    User.findOne().then((user) => {
      if (!user) {
        const user = new User({
          name: "Huy",
          email: "tranquanghuy.hoian04011999@gmail.com",
          cart: [],
        });
        user.save();
      }
    });
    app.listen(3000);
  })
  .catch((err) => console.log(err));