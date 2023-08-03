import { createContext, useContext, useEffect, useReducer } from 'react';

import { 
    removeProduct,
    insertProduct,
    updateProduct,
    onCollectionChangedListener
} from '../utils/firebase/firebase.utils';

import { createAction } from '../utils/reducer/reducer.utils';

export const ProductsContext = createContext({
    products: [],
    hidden: true,
    product: null
});

const PRODUCTS_ACTION_TYPES = {
    SET_PRODUCTS:'SET_PRODUCTS',
    CLEAR_PRODUCT: 'CLEAR_PRODUCT',
    DELETE_PRODUCT: 'DELETE_PRODUCT',
    UPDATE_PRODUCT: 'UPDATE_PRODUCT',
    ADD_PRODUCT: 'ADD_PRODUCT',
};

const INITIAL_STATE = {
    products: [],
};

const productsReducer = (state,action) => {
    const {type, payload } = action;

    switch(type){
        case PRODUCTS_ACTION_TYPES.SET_PRODUCTS:
            return {
                ...state,
                products: payload
            };
        case PRODUCTS_ACTION_TYPES.CLEAR_PRODUCT:
            return {
                ...state,
                product: null
            };
        case PRODUCTS_ACTION_TYPES.DELETE_PRODUCT:
            return {
                ...state,
                products: deleteProduct(state.products, payload)
            };
        case PRODUCTS_ACTION_TYPES.ADD_PRODUCT:
            return {
                ...state,
                products: addProduct(state.products, payload)
            };
        case PRODUCTS_ACTION_TYPES.UPDATE_PRODUCT:
            return {
                ...state,
                product: payload
            };
        default:
            throw new Error(`unhandled type of ${type} in productsReducer`);
    }
}

const deleteProduct = (products, productToDelete) => {
    console.log("Remove product:" + productToDelete.name);
    removeProduct(productToDelete);
    return {...products};
}

const addProduct = (products, productToAdd) => {
    const product = {
        id: productToAdd.id?productToAdd.id:productToAdd.name.toLowerCase().replaceAll(' ','_'),
        category: productToAdd.category,
        name: productToAdd.name,
        price: parseInt(productToAdd.price),
        stock: parseInt(productToAdd.stock),
        warningLevel: (productToAdd.warningLevel),
        stopLevel: parseInt(productToAdd.stopLevel),
        sales: parseInt(productToAdd.sales),
        enable: productToAdd.enable,
        enableStop: productToAdd.enableStop,
    }
    console.log("__ADD__:", product);
    insertProduct(product);
    return {...products};
}

export const ProductsProvider = ({children}) => {
    const [{product, products, hidden, editProductId}, dispatch] = useReducer(productsReducer, INITIAL_STATE);

    const setProducts = (products) => {
        dispatch(createAction(PRODUCTS_ACTION_TYPES.SET_PRODUCTS, products));
    }
    
    const deleteProduct = (product) => {
        dispatch(createAction(PRODUCTS_ACTION_TYPES.DELETE_PRODUCT, product));
    }

    const updateProduct = (product) => {
        console.log("PRODUCT TO UPDATE:" + product.name);
        dispatch(createAction(PRODUCTS_ACTION_TYPES.UPDATE_PRODUCT, product));
    }

    const clearProduct = () => {
        console.log("CLEAR PRODUCT");
        dispatch(createAction(PRODUCTS_ACTION_TYPES.CLEAR_PRODUCT, null));
    }
    const addProduct = (product) => {
        dispatch(createAction(PRODUCTS_ACTION_TYPES.ADD_PRODUCT, product));
    }

    useEffect(()=>{
        onCollectionChangedListener('products', (productsMap)=>{
            setProducts(productsMap);
        });
    }, []);
    const value = {
        products, 
        deleteProduct,
        updateProduct,
        clearProduct,
        addProduct,
    };

    return(
        <ProductsContext.Provider value={value}>{children}</ProductsContext.Provider>
    )
}

const useProducts = () => {
    const context = useContext(ProductsContext);
    if( context === undefined ){
        throw new Error("useProducts must be used within ProductsContext");
    }
    return context;
}

export default useProducts;
