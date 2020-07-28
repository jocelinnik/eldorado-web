module.exports = app => {
    const Usuario = app.db.modelos.Usuario;

    /**
     * Rota usada para verificação do estado do banco de dados - testes
     */
    app.get("/api/usuarios", (req, res) => {
        Usuario.findAll({
            attributes: ["id", "nome", "email", "senha"]
        })
        .then(resultado => {
            res.json(resultado);
        })
        .catch(erro => {
            res.status(412)
                .json({mensagem: erro.message});
        });
    });

    app.get("/api/usuario/:email", (req, res) => {
        Usuario.findOne({
            where: {
                email: req.params.email
            },
            attributes: ["id", "nome", "email", "senha"]
        }).then(resultado => {
            if(resultado) res.json(resultado);
            else res.sendStatus(404);
        }).catch(erro => {
            res.status(412)
                .json({mensagem: erro.message});
        });
    });

    app.post("/api/usuario", (req, res) => {
        Usuario.create(req.body)
        .then(resultado => {
            res.json(resultado);
        })
        .catch(erro => {
            res.status(412)
                .json({mensagem: erro.message});
        });
    });
    
    app.route("/api/usuario/:id")
    .put((req, res) => {
        Usuario.update(req.body, {
            where: {
                id: req.params.id
            }
        }).then(resultado => {
            res.sendStatus(204)
        }).catch(erro => {
            res.status(412)
                .json({mensagem: erro.message});
        });
    })
    .delete((req, res) => {
        Usuario.destroy({
            where: {
                id: req.params.id
            }
        }).then(resultado => {
            res.sendStatus(204);
        }).catch(erro => {
            res.status(412)
                .json({mensagem: erro.message});
        });
    });
};