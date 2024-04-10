import { Request, Response, NextFunction } from 'express';

export function redirectIfNotRegistered(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  // Ваша логика проверки регистрации пользователя
  // Если пользователь не зарегистрирован, то отправляем ответ с ошибкой
  if (!isUserRegistered(req)) {
    res.status(400).json({ error: 'User not registered' });
  } else {
    next();
  }
}

function isUserRegistered(req: Request): boolean {
  // Ваша логика проверки регистрации пользователя
  // Например, проверка наличия пользователя в базе данных
  return true; // Здесь верните true, если пользователь зарегистрирован, и false в противном случае
}
