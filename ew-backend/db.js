const Sequelize = require("sequelize");
const fs = require("fs");
const path = require("path");

let db = null;

module.exports = app => {
    if(!db){
        const config = app.libs.config;
        const sequelize = new Sequelize(
            config.database,
            config.username,
            config.password,
            config.params
        );

        db = {
            sequelize,
            Sequelize,
            modelos: {}
        };

        const dir = path.join(__dirname, "modelos");
        fs.readdirSync(dir).forEach(arq => {
            const modeloDir = path.join(dir, arq);
            const modelo = sequelize.import(modeloDir);
            db.modelos[modelo.name] = modelo;
        });
    }

    return db;
};