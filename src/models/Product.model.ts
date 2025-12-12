import { Table, Column, Model, DataType, Default } from 'sequelize-typescript';

// Define la tabla 'products' en la base de datos
@Table({
    tableName: 'products',
})
class Product extends Model {

    // Columna para el nombre del producto (string con máximo 100 caracteres)
    @Column({
        type: DataType.STRING(100),
    })
    declare name: string;

    // Columna para el precio del producto (número decimal/float)
    @Column({
        type: DataType.FLOAT(),
    })
    declare price: number;

    // Columna que define si el producto está disponible (por defecto: true)
    @Default(true)
    @Column({
        type: DataType.BOOLEAN,
    })
    declare availability: boolean;
}

export default Product;
