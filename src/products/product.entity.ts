import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import ProductCategory from '../productCategories/productCategory.entity';

@Entity()
class Product {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public name: string;

  @ManyToOne(() => ProductCategory, (category: ProductCategory) => category.products)
  public category: ProductCategory;

  @Column({
    type: 'jsonb'
  })
  public properties: any;
}

export default Product;