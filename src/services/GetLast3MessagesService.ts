import prismaClient from "../prisma"

class GetLast3MessagesService {
    async execute() {
//      Seleciona * (todas) mensagens e litita 3 ordenando por created_at (criado quando) desc
        const mensagens = await prismaClient.mensagem.findMany({ 
            take: 3,
            orderBy: {
                created_at: "desc",
            },
            include: {
                usuario: true
            }
        });
        return mensagens;
    }
}

export { GetLast3MessagesService } 