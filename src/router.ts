import { Router } from 'express';
import { body, param } from 'express-validator'
import { createProduct, deleteProduct, getProducts, getProductsById, updatedAvailability, updateProduct } from './handlers/product';
import { handleInputErrors } from './middleware';

// Creamos un router independiente para manejar rutas
const router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: The product id
 *           example: 1
 *         name:
 *           type: string
 *           description: The product name
 *           example: Monitor AOC Gamer 165Hz
 *         price: 
 *           type: number
 *           description: The product price
 *           example: 4500
 *         availability:
 *           type: boolean
 *           description: The product availability
 *           example: true
 */

/**
 * @swagger
 * /api/products:
 *  get:
 *    summary: Get a list of products
 *    tags: 
 *      - Products
 *    description: Return a list of products
 *    responses: 
 *      200: 
 *        description: Successful response
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Product'
 */
/*
  Ruta GET: devuelve información de los productos.
*/
router.get('/', getProducts);

/**
 * @swagger
 * /api/products/{id}:
 *   get:
 *     summary: Get a Product by ID
 *     tags:
 *       - Products
 *     description: Return a product based on its unique ID
 *     parameters:
 *       - in: path
 *         name: id
 *         description: The ID of the product to retrieve
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Product not found
 *       400:
 *         description: Bad request - Invalid ID
 */
/*
  Ruta GET: devuelve información de un producto cuyo id sea el de la URL.
*/
router.get('/:id', 
  param('id').isInt().withMessage('ID no valido.'),
  // Llamado del MiddleWare
  handleInputErrors,
  getProductsById
);

/**
 * @swagger
 * /api/products:
 *   post:
 *     summary: Create a new product
 *     tags:
 *       - Products
 *     description: Return a new record in the database
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Monitor AOC Gamer de 165Hz"
 *               price:
 *                 type: number
 *                 example: 1590
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       400:
 *         description: Bad request - Invalid input data
 */

/*
  Ruta POST: se usa para enviar datos al servidor.
*/
router.post('/',
  // Validacion de los datos
  body('name')
    .notEmpty().withMessage('El campo nombre no puede ir vacio'),
  body('price')
    .isNumeric().withMessage('Valor no valido')
    .notEmpty().withMessage('El campo precio no puede ir vacio')
    .custom(value => value > 0).withMessage('Precio no valido'),
  // Llamado del MiddleWare
  handleInputErrors,
  createProduct
);

/**
 * @swagger
 * /api/products/{id}:
 *   put:
 *     summary: Updates a product with user input
 *     tags:
 *       - Products
 *     description: Returns the updated product
 *     parameters:
 *       - in: path
 *         name: id
 *         description: The ID of the product to update
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Monitor AOC Gamer de 165Hz"
 *               price:
 *                 type: number
 *                 example: 1590
 *               availability:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       400:
 *         description: Bad request - Invalid ID or Invalid input data
 *       404:
 *         description: Product not found
 */
/*
  Ruta PUT: Actualiza un registro completo.
*/
router.put('/:id', 
   // Validacion de los datos
  body('name')
    .notEmpty().withMessage('El campo nombre no puede ir vacio'),
  body('price')
    .isNumeric().withMessage('Valor no valido')
    .notEmpty().withMessage('El campo precio no puede ir vacio')
    .custom(value => value > 0).withMessage('Precio no valido'),
  body('availability').isBoolean().withMessage('Valor para disponibilidad no valido'),
  // Llamado del MiddleWare
  handleInputErrors,  
  updateProduct
);

/**
 * @swagger
 * /api/products/{id}:
 *   patch:
 *     summary: Updated Product availability
 *     tags:
 *       - Products
 *     description: Returns updated availability
 *     parameters:
 *       - in: path
 *         name: id
 *         description: The ID of the product to update
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       400:
 *         description: Bad request - Invalid ID
 *       404:
 *         description: Product not found
 */


/*
  Ruta PATCH: actualiza solo una parte del recurso.
*/
router.patch('/:id', 
  param('id').isInt().withMessage('ID no valido.'),
  handleInputErrors,
  updatedAvailability
);


/**
 * @swagger
 * /api/products/{id}:
 *   delete:
 *     summary: Deletes a product by a given ID
 *     tags:
 *       - Products
 *     description: Returns a confirmation message
 *     parameters:
 *       - in: path
 *         name: id
 *         description: The ID of the product to delete
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: "Producto eliminado"
 *       400:
 *         description: Bad request - Invalid ID
 *       404:
 *         description: Product not found
 */

/*
  Ruta DELETE: elimina un recurso.
*/
router.delete('/:id', 
  param('id').isInt().withMessage('ID no valido.'),
  handleInputErrors,
  deleteProduct
);

// Exportamos el router para usarlo en otras partes del proyecto
export default router;