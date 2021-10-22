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

        return mensagem;
    }
}

export { CreateMessageService }