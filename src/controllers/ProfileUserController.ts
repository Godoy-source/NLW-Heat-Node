import { Request, Response } from 'express';
import { ProfileUserService } from '../services/ProfileUserService';

class ProfileUserController {
    async handle(request: Request, response: Response) {
        const { usuario_ID } = request; 

        const service = new ProfileUserService();

        const result = await service.execute(usuario_ID);

        return response.json(result);
    }
}

export { ProfileUserController }