import { createContext,  useReducer } from 'react';

import { 
    insertProduct 
} from '../utils/firebase/firebase.utils';
import { createAction } from '../utils/reducer/reducer.utils';

export const ProductContext = createContext({
    products: [],
    hidden: true
});

const PRODUCT_ACTION_TYPES = {
    TOGGLE_PRODUCT: 'TOGGLE_PRODUCT',
    UPDATE_PRODUCT: 'UPDATE_PRODUCT',
    CLEAR_PRODUCT: 'CLEAR_PRODUCT',
    TOGGLE_EDIT_PRODUCT_HIDDEN: 'TOGGLE_EDIT_PRODUCT_HIDDEN',
};

const INITIAL_STATE = {
    product: null,
};

const productReducer = (state,action) => {
    const {type, payload } = action;

    switch(type){
        case PRODUCT_ACTION_TYPES.TOGGLE_PRODUCT:
            return {
                ...state,
                products: toggleProductState( state.products, payload)
            };
        case PRODUCT_ACTION_TYPES.UPDATE_PRODUCT:
            return {
                ...state,
                product: payload
            };
            case PRODUCT_ACTION_TYPES.CLEAR_PRODUCT:
                return {
                    ...state,
                    product: null
                };
        default:
            throw new Error(`unhandled type of ${type} in productsReducer`);
    }
}

const toggleProductState = (products, product) => {
    product.enable = !product.enable;
    insertProduct(product);
    return {...products};
}

export const ProductProvider = ({children}) => {
    const [product, dispatch] = useReducer(productReducer, INITIAL_STATE);

    const updateProduct = (product) => {
        dispatch(createAction(PRODUCT_ACTION_TYPES.UPDATE_PRODUCT, product));
    } 
    const clearProduct = (product) => {
        console.log("CLEAR!!!! "+ product.name)
        dispatch(createAction(PRODUCT_ACTION_TYPES.CLEAR_PRODUCT, product));
    } 
    const toggleProduct = (product) => {
        dispatch(createAction(PRODUCT_ACTION_TYPES.TOGGLE_PRODUCT, product));
    }
    const value = {
        toggleProduct,
        clearProduct,
        updateProduct,
    };

    return(
        <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
    )
}