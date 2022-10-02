import { useContext } from 'react';

import { ProductsContext } from '../../context/products.context';

const AddOrUpdateProduct = ({product}) => {
    if(product){
        console.log('must update ', product);
    } else {
        console.log('new product');
    }
    return(
        <div>
            <h1>Add or Update Product</h1>
        </div>
    );
};

export default AddOrUpdateProduct;