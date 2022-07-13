import { body } from 'express-validator';

export const loginValidator = [
    body('email', 'Неверный формат почты').isEmail(),
    body('password', 'Пароль должен быть больше 5 символов').isLength({ min: 5 }),
    
]

export const registerValidator = [
    body('email', 'Неверный формат почты').isEmail(),
    body('password', 'Пароль должен быть больше 5 символов').isLength({ min: 5 }),
    body('fullName', 'Имя должно быть длиннее 3 символов').isLength({ min: 3}),
    body('avatarUrl', 'Кривая ссылка').optional().isURL()
]

export const postCreateValidator = [
    body('title', 'Заголовок больше 3 символов').isLength({ min: 3 }).isString(),
    body('text', 'Текст статьи больше 10 символов').isLength({ min: 10 }).isString(),
    body('tags', 'Тэги должны быть String').optional().isString(),
    body('imageUrl', 'Кривая ссылка').optional().isURL()
]