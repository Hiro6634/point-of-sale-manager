import { createContext, useEffect, useReducer } from "react";
import {
    onProductsChangedListener,
    updateProduct
} from "../utils/firebase/firebase.utils";
import { createAction } from "../utils/reducer.utils";

export const ProductsContext = createContext({
    products: []
});

const INITIAL_STATE = {
    products: []
}

const PRODUCT_ACTION_TYPES = {
    SET_PRODUCTS: 'SET_PRODUCTS',
    TOGGLE_PRODUCT: 'TOGGLE_PRODUCT'
}

const productReducer = (state, action) => {
    const { type, payload } = action;
    switch (type) {
        case PRODUCT_ACTION_TYPES.SET_PRODUCTS:
            return {
                ...state,
                products: payload
            }
        case PRODUCT_ACTION_TYPES.TOGGLE_PRODUCT:
            return {
                ...state,
                products: toggleProduct(state, payload)
            }
        default:
            throw new Error(`Unhandled type ${type} in productReducer`);
    }
}

const toggleProduct = (state, productId) => {
    const updatedProduct = state.products.find((product) => product.id === productId);
    updatedProduct.enable = !updatedProduct.enable;
    updateProduct(productId, updatedProduct).then(() => {
        const updatedProducts = state.products.map((product) => {
            if (product.id === productId) {
                return updatedProduct;
            }
            return product;
        });
        return {
            ...state,
            products: updatedProducts
        };
    });

    const products = state.products.map((product) => {
        if (product.id === productId) {
            return {
                ...product,
                enable: !product.enable
            }
            updateProduct(product);
        }
        return product;
    })
    return products;
}


export const ProductsProvider = ({ children }) => {
    const [state, dispatch] = useReducer(productReducer, INITIAL_STATE);
    useEffect(() => {
        onProductsChangedListener((products) => {
            setProducts(products);
        })
    }, []);

    const setProducts = (products) => {
        dispatch(createAction(PRODUCT_ACTION_TYPES.SET_PRODUCTS, products))
    }

    const toggleProduct = (productId) => {
        dispatch(createAction(PRODUCT_ACTION_TYPES.TOGGLE_PRODUCT, productId))
    }

    const value = {
        products: state.products,
        setProducts,
        toggleProduct
    };
    return <ProductsContext.Provider value={value}>{children}</ProductsContext.Provider>
}
