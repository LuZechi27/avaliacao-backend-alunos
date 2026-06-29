import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const usuarios = [];

class AuthController {

    static async registrarUsuario(req, res) {
        const { username, password } = req.body;

        const existe = usuarios.find(u => u.username === username);

        if (existe) return res.status(400).json(
            { message: "Usuário já existe!" }
        );

        const hash = await bcrypt.hash(password, 8);

        usuarios.push(
            {
                username,
                password: hash
            }
        );
        console.log(usuarios);

        res.status(201).json(
            { message: "Usuário criado com sucesso!" }
        );
    }

    static async login(req, res) {
        const { username, password } = req.body;

        const usuario = usuarios.find(u => u.username === username);

        if (!usuario || !(await bcrypt.compare(password, usuario.password))) return res.status(401).json(
            { message: "Usuário ou senha inválidos!" }
        );

        const token = jwt.sign(
            { username },
            process.env.SECRET_ENV,
            { expiresIn: "1h", algorithm: 'HS256' }
        );

        res.json({ token });
        console.log(`Login efetuado pelo usuário ${usuario.username}`);
    }
}

export default AuthController;
