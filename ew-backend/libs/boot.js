module.exports = app => {
    app.db.sequelize.sync().done(() => {
        app.listen(app.get("port"), () => {
            console.log("SERVIDOR RODANDO VIOLENTAMENTE NA PORTA " + app.get("port"));
        });
    });
};