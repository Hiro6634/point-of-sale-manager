import { createContext, useEffect, useReducer } from "react";
import { onProductsChangedListener } from "../utils/firebase/firebase.utils";
import { createAction } from "../utils/reducer.utils";

export const ProductsContext = createContext({
    products: []
});

const INITIAL_STATE = {
    products: []
}

const PRODUCT_ACTION_TYPES = {
    SET_PRODUCTS: 'SET_PRODUCTS'
}

const productReducer = (state, action) => {
    const { type, payload } = action;
    switch (type) {
        case PRODUCT_ACTION_TYPES.SET_PRODUCTS:
            return {
                ...state,
                products: payload
            }
        default:
            throw new Error(`Unhandled type ${type} in productReducer`);
    }
}

export const ProductsProvider = ({ children }) => {
    const [state, dispatch] = useReducer(productReducer, INITIAL_STATE);
    const setProducts = (products) => {
        dispatch(createAction(PRODUCT_ACTION_TYPES.SET_PRODUCTS, products))
    }

    useEffect(() => {
        onProductsChangedListener((products) => {
            setProducts(products);
        })
    }, []);
    const value = {
        products: state.products,
        setProducts
    };
    return <ProductsContext.Provider value={value}>{children}</ProductsContext.Provider>
}
