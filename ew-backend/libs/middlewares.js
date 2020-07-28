const bodyParser = require("body-parser");
const cors = require("cors");

module.exports = app => {
    app.set("port", 3000);
    app.use(cors({origin: "http://localhost:8100"}));
    app.use(bodyParser.urlencoded({extended: false}));
    app.use(bodyParser.json());
};