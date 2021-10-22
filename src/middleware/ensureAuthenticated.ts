import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

interface IPayload {
    sub: string;
}

export function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {
    const authToken = request.headers.authorization;
    
    if (!authToken) {
        return response.status(401).json({
            errorCode: 'token.invalid'
        });
    }

    // Bearer 1397208937128037812 (token)
    // [0] Bearer
    // [1] Token
    // Separa os espaços
    const [, token] = authToken.split(' ');
    
    try {
        const { sub } = verify(token, process.env.JWT_SECRET) as IPayload;

        request.usuario_ID = sub;

        return next();
    } catch (error) {
        return response.status(401).json({
            errorCode: 'token.expired'
         });
    }
    
}