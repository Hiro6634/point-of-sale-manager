import { useContext } from 'react';
import { ProductsContext } from '../../context/products.context';
import ProductLineItem from '../product-line-item/product-line-item.component';

import { 
    ProductTableContainer,
    ProductTableHeaderContainer,
    CategorySpan,
    NameSpan,
    PriceSpan,
    EnableSpan,
    ControlsSpan,
    ProductTableBodyContainer
} from './products-table.styles'; 

const ProductsTable = () => {
    const {products} = useContext(ProductsContext);
    return(
        <ProductTableContainer>
            <ProductTableHeaderContainer>
                <CategorySpan>Categoria</CategorySpan>    
                <NameSpan>Producto</NameSpan>
                <PriceSpan>Precio</PriceSpan>
                <EnableSpan>Habilitado</EnableSpan>
                <ControlsSpan>Editar/Borrar</ControlsSpan>
            </ProductTableHeaderContainer>
            <ProductTableBodyContainer>
            {
                Object.keys(products).map((key)=>{
                    const { id } = products[key];
                    return(
                        <ProductLineItem key={id} product={products[key]}/>
                    )
                }            
            )}
            </ProductTableBodyContainer>
        </ProductTableContainer>
    );
};

export default ProductsTable;