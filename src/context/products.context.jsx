import { createContext, useEffect, useReducer } from 'react';

import { 
    getCollectionAndDocuments,
    addOrUpdateProduct 
} from '../utils/firebase/firebase.utils';
import { createAction } from '../utils/reducer/reducer.utils';

export const ProductsContext = createContext({
    products: [],
    hidden: true
});

const PRODUCTS_ACTION_TYPES = {
    SET_PRODUCTS:'SET_PRODUCTS',
    TOGGLE_EDIT_PRODUCT_HIDDEN: 'TOGGLE_EDIT_PRODUCT_HIDDEN',
    TOGGLE_PRODUCT: 'TOGGLE_PRODUCT'
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
        case PRODUCTS_ACTION_TYPES.TOGGLE_EDIT_PRODUCT_HIDDEN:
            return {
                ...state,
                hidden: !state.hidden
            }
        case PRODUCTS_ACTION_TYPES.TOGGLE_PRODUCT:
            return {
                ...state,
                products: toggleProductState( state.products, payload)
            };
        default:
            throw new Error('unhandled type of ${type} in productsReducer')
    }
}

const toggleProductState = (products, product) => {
    product.enable = !product.enable;
    addOrUpdateProduct(product);
    return {...products};
}

export const ProductsProvider = ({children}) => {
    const [{products, hidden}, dispatch] = useReducer(productsReducer, INITIAL_STATE);

    const setProducts = (products) => {
        dispatch(createAction(PRODUCTS_ACTION_TYPES.SET_PRODUCTS, products));
    }
    
    const toggleProduct = (product) => {
        dispatch(createAction(PRODUCTS_ACTION_TYPES.TOGGLE_PRODUCT, product));
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
        toggleProduct,
        toggleProductEditHidden
    };

    return(
        <ProductsContext.Provider value={value}>{children}</ProductsContext.Provider>
    )
}