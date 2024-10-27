import { Table, Column, Model, DataType } from "sequelize-typescript";

@Table({
    tableName: "products"
})

class Product extends Model {
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    declare name: string;  // Solo definimos el tipo, sin inicialización
    
    @Column({
        type: DataType.FLOAT,
        allowNull: false,
    })
    declare price: number;
    
    @Column({
        type: DataType.BOOLEAN,
        allowNull: false,
        defaultValue: true,
    })
    declare availability: boolean;
}

export default Product