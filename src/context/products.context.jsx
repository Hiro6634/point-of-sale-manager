import { createContext, useState, useEffect } from 'react';

import { addCollectionAndDocuments } from '../utils/firebase/firebase.utils';

import PRODUCT_DATA from '../product-data';

export const ProductsContext = createContext({
    products: [],
});

export const ProductsProvider = ({children}) => {
    const [products, setProducts] = useState([]);
    useEffect(() => {
        addCollectionAndDocuments('products', PRODUCT_DATA);
    },[]);
    const value = {products};
    return(
        <ProductsContext.Provider value={value}>{children}</ProductsContext.Provider>
    )
}