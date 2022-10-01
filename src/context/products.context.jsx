import { createContext, useState, useEffect } from 'react';

import { getCollectionAndDocuments } from '../utils/firebase/firebase.utils';

export const ProductsContext = createContext({
    products: [],
});

export const ProductsProvider = ({children}) => {
    const [products, setProducts] = useState({});

    useEffect(()=>{
        const getProductMap = async () =>{
            const productMap = await getCollectionAndDocuments('products');
            setProducts(productMap);
        }

        getProductMap()
    }, []);
    const value = {products};

    return(
        <ProductsContext.Provider value={value}>{children}</ProductsContext.Provider>
    )
}