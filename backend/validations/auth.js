import { body } from 'express-validator';

export const registerValidator = [
    body('email', 'Неверный формат почты').isEmail(),
    body('password', 'Пароль должен быть больше 5 символов').isLength({ min: 5 }),
    body('fullName', 'Имя должно быть длиннее 3 символов').isLength({ min: 3}),
    body('avatarUrl', 'Кривая ссылка').optional().isURL()
]