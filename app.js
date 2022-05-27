const path = require("path");
const express = require("express");
const rootDir = require("./util/path");
const bodyParser = require("body-parser");
const app = express();
const adminData = require("./routes/admin");
const shopRoutes = require("./routes/shop");

app.set("view engine", "pug");
app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/admin", adminData.router);
app.use(shopRoutes);

app.use((req, res, next) => {
  res.status(404).render("404", { pageTitle: "Page not found!" });
});

app.listen(3000);