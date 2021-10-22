import axios from "axios";
import { sign } from "jsonwebtoken";
import prismaClient from "../prisma";

/*    Passos:
    Receber code:string
    Recuperar o access_token do github
    Recuperar as informações do usuario no github
    Verificar se o usuario existe no DB
        - Sim = Gerar um token
        - Não = Cria no DB, e gera um token
    Retornar o token com as informações do usuario */

interface IAccessTokenResponse {
    access_token: string;

}

interface IUserResponse {
    avatar_url: string;
    login: string;
    id: number;
    name: string;
}

class AuthenticateUserService {
    async execute(code: string) {
        const url = 'https://github.com/login/oauth/access_token';

        const { data: accessTokenResponse } = await axios.post<IAccessTokenResponse>(url, null, {
            params: {
                client_id: process.env.GITHUB_CLIENT_ID,
                client_secret: process.env.GITHUB_CLIENT_SECRET,
                code
            },
            headers: {
                'Accept': 'application/json'
            }
        });

        const response = await axios.get<IUserResponse>('https://api.github.com/user', {
            headers: {
                authorization: 'Bearer ' + accessTokenResponse.access_token
            },
        });

        const { login, id, avatar_url, name } = response.data;
        let usuario = await prismaClient.usuario.findFirst({
            where: {
                github_id: id
            }
        });

        if (!usuario) {
            usuario =  await prismaClient.usuario.create({
                data: {
                    github_id: id,
                    login: login,
                    avatar_url: avatar_url,
                    name: name
                }
            });
        }

        const token = sign(
            {
                usuario: {
                    name: usuario.name,
                    avatar_url: usuario.avatar_url,
                    id: usuario.id,
                }
            },
            process.env.JWT_SECRET,
            {
                subject: usuario.id,
                expiresIn: '1d'
            }
        )

        return { token, usuario };
    }
}

export { AuthenticateUserService }