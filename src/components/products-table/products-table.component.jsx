import { useContext } from 'react';
import { ProductsContext } from '../../context/products.context';

import { 
    ProductTableContainer,
    ProductHeaderContainer,
    CategorySpan,
    NameSpan,
    PriceSpan,
    EnableSpan
} from './products-table.styles'; 

const ProductsTable = () => {
    const {products} = useContext(ProductsContext);
    return(
        <ProductTableContainer>
            <ProductHeaderContainer>
                <CategorySpan>Categoria</CategorySpan>    
                <NameSpan>Producto</NameSpan>
                <PriceSpan>Precio</PriceSpan>
                <EnableSpan>Habilitado</EnableSpan>
            </ProductHeaderContainer>
        {
            Object.keys(products).map((key)=>{
                const { id, category, name, price, enable} = products[key];
                return(
                    <div key={id}>
                        <span>{category}</span>
                        <span>{name}</span>
                        <span>{price}</span>
                        <span>{enable?"True":"False"}</span>
                    </div>
                )
        })}
        </ProductTableContainer>
    );
};

export default ProductsTable;