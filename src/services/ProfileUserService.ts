import prismaClient from "../prisma"

class ProfileUserService {
    async execute(usuario_ID: string) {
        const usuario = await prismaClient.usuario.findFirst({
            where: {
                id: usuario_ID
            }
        });
        return usuario;
    }
}

export { ProfileUserService }