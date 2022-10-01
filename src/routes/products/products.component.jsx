import ProductsTable from '../../components/products-table/products-table.component';

import { ProductsContainer } from './products.styles';

const Products = () => {
    return( 
        <ProductsContainer>
            <h2>PRODUCTOS</h2>
            <ProductsTable/> 
        </ProductsContainer>
    )
};

export default Products;