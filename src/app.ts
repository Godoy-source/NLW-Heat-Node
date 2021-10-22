import 'dotenv/config';
import express from 'express';
import http from 'http';
import cors from 'cors';
import { Server } from 'socket.io';
import { router } from './routes';

const porta = 4000;

const app = express();
app.use(cors());

const serverHttp = http.createServer(app);

const io = new Server(serverHttp, {
    cors: {
        origin: '*'
    },
});

io.on("connection", socket => {
    console.log('usuario conectado no socket ' + socket.id);
})

app.use(express.json());

app.use(router);

app.get('/github', (request, response) => {
    /*Para a aplicação acessar informações do .env é necessario instalar dependencia - dotenv - */
    response.redirect(`http://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}`);
});

app.get('/singin/callback', (request, response) => {
    const { code } = request.query;

    return response.json(code);
});

export { serverHttp, io, porta };