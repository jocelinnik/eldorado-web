describe("Teste da API ew-backend", () => {
    describe("GET /api/usuario/:email", () => {
        it("status 200 - retorna os dados do usuario", feito => {
            let email = "linnik.souza123@gmail.com";

            request.get("/api/usuario/" + email)
            .expect(200)
            .end((erro, res) => {
                const esperado = {
                    id: 1,
                    nome: "Linnik Maciel de Souza",
                    email: "linnik.souza123@gmail.com",
                    senha: "Senh@12345"
                };

                expect(res.body).to.eql(esperado);
                feito(erro);
            });
        });

        it("status 404 - usuario nao encontrado", feito => {
            let email = "lms2@icomp.ufam.edu.br";

            request.get("/api/usuario/" + email)
            .expect(404)
            .end((erro, res) => {
                feito(erro);
            });
        });
    });

    describe("POST /api/usuario", () => {
        it("status 200 - inserindo um usuario", feito => {
            const usuario = {
                nome: "Linnik Maciel de Souza - IComp",
                email: "lms2@icomp.ufam.edu.br",
                senha: "Senh@123"
            };

            request.post("/api/usuario")
            .send(usuario)
            .expect(200)
            .end((erro, res) => {
                expect(res.body).to.include.keys("createdAt");
                feito(erro);
            })
        });
    });

    describe("PUT /api/usuario/:id", () => {
        it("status 204 - atualizando um usuario", feito => {
            const usuario = {
                id: 2,
                nome: "Linnik Maciel de Souza - IComp Violento",
                email: "lms2@icomp.ufam.edu.br",
                senha: "Senh@123"
            };

            request.put("/api/usuario/" + usuario.id)
            .send(usuario)
            .expect(204)
            .end((erro, res) => {
                feito(erro);
            });
        });
    });

    describe("DELETE /api/usuario/:id", () => {
        it("status 204 - deletando um usuario", feito => {
            const id = 2;

            request.delete("/api/usuario/" + id)
            .expect(204)
            .end((erro, res) => {
                feito(erro);
            });
        });
    });
});