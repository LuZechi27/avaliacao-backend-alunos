import alunos from "../database/databaseMockado.js";

class AlunoControler {

    //tentativa de método privado
    static _media(aluno) {
        return (aluno.nota1 + aluno.nota2) / 2;
    }

    static buscarAlunos(req, res) {
        res.status(200).json(alunos);
    }

    static buscarMedias(req, res) {
        const resposta = alunos.map(a => (
            {
                nome: a.nome,
                media: AlunoControler._media(a)
            }
        ));

        res.status(200).json(resposta);
    }

    static buscarAprovados(req, res) {
        const resposta = alunos.map(a => (
            {
                nome : a.nome,
                status : AlunoControler._media(a) >= 6 ? "aprovado" : "reprovado"
            }
        ));

        res.status(200).json(resposta);
    }

    static buscarAlunoPorId(req, res) {
        const id = parseInt(req.params.id);

        const aluno = alunos.find(a => a.id === id);

        if (!aluno) return res.status(404).json(
            { message: "Aluno não encontrado" }
        );

        res.status(200).json(aluno);
    }

    static registrarAluno(req, res) {
        if (alunos.findIndex(a => a.id === req.body.id) !== -1) return res.status(400).json(
            { message : "Aluno já está cadastrado" }
        );
        
        alunos.push(req.body);

        res.status(201).json(
            { message: "Aluno cadastrado!" }
        );
    }

    static atualizarAluno(req, res) {
        const id = parseInt(req.params.id);

        const indice = alunos.findIndex(a => a.id === id);

        if (indice === -1) return res.status(404).json(
            { message: "Aluno não encontrado" }
        );

        alunos[indice] = req.body;
        res.status(200).json(
            { message: "Aluno atualizado com sucesso" }
        );
    }

    static removerAluno(req, res) {
        const id = parseInt(req.params.id);

        const indice = alunos.findIndex(a => a.id === id);

        if (indice === -1) return res.status(404).json(
            { message: "Aluno não encontrado" }
        );

        alunos.splice(indice, 1)
        res.status(200).json(
            { message: "Aluno removido com sucesso" }
        );
    }
}

export default AlunoControler;
