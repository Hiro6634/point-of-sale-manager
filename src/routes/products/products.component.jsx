import { useContext } from 'react';

import { ProductsContext } from '../../context/products.context';

const Products = () => {
    const {products} = useContext(ProductsContext);
    return(
        <div className='products-container'>
            <h2>Products List</h2>
            <div className='products-table-container'>
                <h2>I'm Products Table</h2>
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
            </div>
        </div>
    );
};

export default Products;