import { useContext } from 'react';

import { ProductsContext } from '../../context/products.context';
import { 
    ProductsContainer,
    ProductTableContainer,
    ProductTableHeaderContainer,
    ProductTableBodyContainer,
    ProductHeaderContainer
} from './products.styles';
const Products = () => {
    const {products} = useContext(ProductsContext);
    return(
        <ProductsContainer>
            <h2>Products List</h2>
            <ProductTableContainer>
                <ProductTableHeaderContainer>
                    <ProductHeaderContainer>Categoria</ProductHeaderContainer>
                    <ProductHeaderContainer>Producto</ProductHeaderContainer>
                </ProductTableHeaderContainer>
                <ProductTableBodyContainer>
                {
                    products.map((product) => {
                        const {id, category, name, price, enable} = product;
                        return(
                        <div key = {id}>
                            <span>{category}</span>
                            <span>{name}</span>
                        </div>
                    )})
                }
                </ProductTableBodyContainer>
                {/* <div className='products-hdr-container'>
                    <span className='product-header'>Categoria</span>
                    <span className='product-header'>Producto</span>
                    <span className='product-header'>Precio</span>
                    <span className='product-header'>Habilitado</span>
                    <span className='product-header'>Editar</span>
                    <span className='product-header'>Borrar</span>
                </div>
                {
                    products.map((product) => {
                        const {id, category, name, price, enable} = product;
                        return(
                        <div key = {id} className='products-body-container'>
                            <span>{category}</span>
                            <span>{name}</span>
                        </div>
                    )})
                } */}
            </ProductTableContainer>
        </ProductsContainer>
    );
};

export default Products;