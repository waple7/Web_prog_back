import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    // Ваша логика аутентификации здесь
    if (!req.headers.authorization) {
      return res.status(401).json({ message: 'Unauthorize' });
    }
    // Если пользователь аутентифицирован, переходим к следующему middleware
    next();
  }
}
