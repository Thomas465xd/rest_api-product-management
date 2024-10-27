import { Table, Column, Model, DataType } from "sequelize-typescript";

@Table({
    tableName: "products"
})

class Product extends Model {
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    name!: string;  // Solo definimos el tipo, sin inicialización
    
    @Column({
        type: DataType.FLOAT,
        allowNull: false,
    })
    price!: number;
    
    @Column({
        type: DataType.BOOLEAN,
        allowNull: false,
        defaultValue: true,
    })
    availability!: boolean;
}

export default Product