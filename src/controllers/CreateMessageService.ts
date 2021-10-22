import { Request, Response } from 'express';
import { CreateMessageService } from '../services/CreateMessageService';

class CreateMessageController {
    async handle(request: Request, response: Response) {
        const { mensagem } = request.body;
        const { usuario_ID } = request;

        const service = new CreateMessageService();

        const result = await service.execute(mensagem, usuario_ID);

        return response.json(result);
    }
}

export { CreateMessageController }