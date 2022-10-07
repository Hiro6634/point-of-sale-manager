import { createContext, useEffect, useReducer } from 'react';

import { 
    getCollectionAndDocuments, 
    removeProduct
} from '../utils/firebase/firebase.utils';

import { createAction } from '../utils/reducer/reducer.utils';

export const ProductsContext = createContext({
    products: [],
});

const PRODUCTS_ACTION_TYPES = {
    SET_PRODUCTS:'SET_PRODUCTS',
    DELETE_PRODUCT: 'DELETE_PRODUCT',
    ADD_PRODUCT: 'ADD_PRODUCT',
    TOGGLE_EDIT_PRODUCT_HIDDEN: 'TOGGLE_EDIT_PRODUCT_HIDDEN',
};

const INITIAL_STATE = {
    products: [],
    hidden: true
};

const productsReducer = (state,action) => {
    const {type, payload } = action;

    switch(type){
        case PRODUCTS_ACTION_TYPES.SET_PRODUCTS:
            return {
                ...state,
                products: payload
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
        case PRODUCTS_ACTION_TYPES.TOGGLE_EDIT_PRODUCT_HIDDEN:
            return {
                ...state,
                hidden: !state.hidden
            }
        default:
            throw new Error(`unhandled type of ${type} in productsReducer`);
    }
}

const deleteProduct = (products, productToDelete) => {
    console.log("Remove product:" + productToDelete.name);
    removeProduct(productToDelete);
    return {...products};
}

const addProduct = (products, productToDelete) => {
    console.log("Add product:" + productToDelete.name);
    // removeProduct(productToDelete);
    return {...products};
}

export const ProductsProvider = ({children}) => {
    const [{products, hidden}, dispatch] = useReducer(productsReducer, INITIAL_STATE);

    const setProducts = (products) => {
        dispatch(createAction(PRODUCTS_ACTION_TYPES.SET_PRODUCTS, products));
    }
    
    const deleteProduct = (product) => {
        dispatch(createAction(PRODUCTS_ACTION_TYPES.DELETE_PRODUCT, product));
    }

    const addProduct = (product) => {
        dispatch(createAction(PRODUCTS_ACTION_TYPES.ADD_PRODUCT, product));
    }
   

    const toggleProductEditHidden = () => {
        dispatch(createAction(PRODUCTS_ACTION_TYPES.TOGGLE_EDIT_PRODUCT_HIDDEN));
    }

    useEffect(()=>{
        const getProductMap = async () =>{
            const productMap = await getCollectionAndDocuments('products');
            setProducts(productMap);
        }

        getProductMap()
    }, []);
    const value = {
        products, 
        hidden,
        deleteProduct,
        addProduct,
        toggleProductEditHidden
    };

    return(
        <ProductsContext.Provider value={value}>{children}</ProductsContext.Provider>
    )
}