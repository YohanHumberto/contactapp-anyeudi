const path = require("path");
const express = require("express");
const expressHbs = require("express-handlebars");
const { conect } = require("./DB/conection");

const app = express();
const PORT = process.env.PORT || 3001;
const router = require("./routes/routes");


app.engine(
    "hbs",
    expressHbs.engine({
        layoutsDir: "views/layouts/",
        defaultLayout: "main-layout",
        extname: "hbs",
        // helpers: {
        // },
    })
);

app.set("view engine", "hbs");
app.set("views", "views");

app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

//RUTAS
app.use(router);
app.use((req, res, next) => {
    res.status(404).send("NOT FOUND");
});

conect.sync().then(result => {
    app.listen(PORT, (err) => {
        if (err) {
            console.log(err);
        } else {
            console.log(`Server runnig in port http://localhost:${PORT}`)
        }
    })
}).catch(err => {
    console.log(err);
});


