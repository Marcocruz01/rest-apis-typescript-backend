import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';

// Middleware para manejar errores de validación enviados desde express-validator
export const handleInputErrors = (req: Request, res: Response, next: NextFunction) => {

    // Obtiene los resultados de las validaciones aplicadas en la ruta
    const errors = validationResult(req);

    // Si existen errores, responde con estado 400 y la lista de errores
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // Si no hay errores, continúa con el siguiente middleware o controlador
    console.log('Desde el MiddleWare...');
    next();
};
