import { io } from "../app";
import prismaClient from "../prisma"

class CreateMessageService {
    async execute(text: string, user_id: string) {
        const mensagem = await prismaClient.mensagem.create({
            data: {
                text: text,
                usuario_ID: user_id
            },
            include: {
                usuario: true
            }
        });
        const infoWS = {
           text: mensagem.text,
           usuario_ID: mensagem.usuario_ID,
           created_at: mensagem.created_at,
           usuario: {
                name: mensagem.usuario.name,
                avatar_url: mensagem.usuario.avatar_url
           }
        }

        io.emit('nova_mensagem', infoWS);

        return mensagem;
    }
}

export { CreateMessageService }