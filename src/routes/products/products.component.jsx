import { useContext } from 'react';

import { ProductsContext } from '../../context/products.context';

const Products = () => {
    const {products} = useContext(ProductsContext);
    return(
        <div>
            <h2>Products List</h2>
            {
                products.map(({id, name}) => (
                    <div key = {id}>
                        <h2>{name}</h2>
                    </div>
                ))
            }
        </div>
    );
};

export default Products;