import jwt from "jsonwebtoken";

export default function auth(req, res, next) {

    const authHeader = req.header('Authorization');
    console.log('Authorization: ' + authHeader);

    let token;

    if (authHeader) {
        const parts = authHeader.split(" ");
        if (parts.length === 2) {
            token = parts[1];
        }
    }

    if (!token) return res.status(401).json(
        { message: "Acesso negado: Token não informado!" }
    );

    jwt.verify(token, process.env.SECRET_ENV, (err, user) => {
        if (err) {
            if (err.name === 'TokenExpiredError') return res.status(401).json(
                { message: 'Acesso negado. Token expirado.' }
            );
            else if (err.name === 'JsonWebTokenError') return res.status(403).json(
                { message: 'Acesso negado. Token inválido.' }
            );
            else return res.status(403).json(
                { message: 'Acesso negado. Erro na verificação do token.' }
            );
        }
        req.user = user;
        const issuedAtISO = new Date(user.iat * 1000).toISOString();
        const expiresAtISO = new Date(user.exp * 1000).toISOString();

        console.log(`Token validado para usuário: ${user.username} 
            Emitido em: ${issuedAtISO}
            Expira em: ${expiresAtISO}
        `);
        
        next();
    });
}
