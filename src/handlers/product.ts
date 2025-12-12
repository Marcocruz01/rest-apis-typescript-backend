import { NextFunction, Request, Response } from 'express';
import Product from '../models/Product.model';

// Controlador para obtener los productos
export const getProducts = async (req: Request, res: Response) => {
    try {
        // Creamos una intancia del modelo para obtener los productos de la DB
        const products = await Product.findAll({
            order: [
                ['id', 'DESC'] 
            ],
        });
        // Retornamos los productos creados en la DB
        res.json({ data: products });
    } catch (error) {
        // Capturar errores y responder con estado 500
        res.status(500).json({
            message: 'Error al obtener los productos',
            error
        });
    }
}

// Controlador para obtener los productos
export const getProductsById = async (req: Request, res: Response) => {
    try {
        // Obtenemos el id del params
        const { id } = req.params;
        // Creamos una instancia del modelo para obtener un registro dependiendo el ID
        const product = await Product.findByPk(id);
        // Validar
        if(!product) {
            return res.status(404).json({error: 'Producto no encontrado.'});
        }
        // Retornamos el valor del registro por ID
        res.json({ data: product});
    } catch (error) {
        // Capturar errores y responder con estado 500
        res.status(500).json({
            message: 'Error al obtener los productos',
            error
        });
    }
}

// Controlador para crear un nuevo producto
export const createProduct = async (req : Request, res : Response) => {
    try {
        // Crear una instancia del modelo con los datos que fueron enviados desde el cliente
        const product = await Product.create(req.body);
        // Retornamos el producto registrado
        res.json({ data: product });
    } catch (error) {
        // Capturar errores y responder con estado 500
        res.status(500).json({
            message: 'Error al crear el producto',
            error
        });
    }
}

// Controlador para actualizar un nuevo producto
export const updateProduct = async (req : Request, res : Response) => {
    try {
        // Obtenemos el id del params
        const { id } = req.params;
        // Creamos una instancia del modelo para obtener un registro dependiendo el ID
        const product = await Product.findByPk(id);
        // Validar
        if(!product) {
            return res.status(404).json({error: 'Producto no encontrado.'});
        }        
        // Retornamos el dato actualizado
        await product.update(req.body);
        res.json({ data: product });
    } catch (error) {
        // Capturar errores y responder con estado 500
        res.status(500).json({
            message: 'Error al crear el producto',
            error
        });
    }
}

// Funcion para actualiazr un campo en especifico de un producto
export const updatedAvailability = async(req: Request, res: Response) => {
    try {
        // Obtenemos el id del params
        const { id } = req.params;
        // Creamos una instancia del modelo para obtener un registro dependiendo el ID
        const product = await Product.findByPk(id);
        // Validar
        if(!product) {
            return res.status(404).json({error: 'Producto no encontrado.'});
        }        
        // Retornamos el dato actualizado
        product.availability = !product.dataValues.availability;
        await product.save();
        res.json({ data: product });
        
    } catch (error) {
        // Capturar errores y responder con estado 500
        res.status(500).json({
            message: 'Error al crear el producto',
            error
        });
    }
}

// Funcion que va a eliminar el producto de la base de datos
export const deleteProduct = async (req: Request, res: Response) => {
    try {
        // Obtenemos el id del params
        const { id } = req.params;
        // Creamos una instancia del modelo para obtener un registro dependiendo el ID
        const product = await Product.findByPk(id);
        // Validar
        if(!product) {
            return res.status(404).json({error: 'Producto no encontrado.'});
        }  

        // Eliminar el producto 
        await product.destroy();
        // Retornamos la informacion actualizada
        res.json({ data: 'Producto Eliminado.'});
    } catch (error) {
        // Capturar errores y responder con estado 500
        res.status(500).json({
            message: 'Error al crear el producto',
            error
        });
    }
}