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
    products: [],
    blankRow: false
}

const PRODUCT_ACTION_TYPES = {
    SET_PRODUCTS: 'SET_PRODUCTS',
    TOGGLE_PRODUCT: 'TOGGLE_PRODUCT',
    ADD_PRODUCT: 'ADD_PRODUCT',
    REMOVE_PRODUCT: 'REMOVE_PRODUCT',
    UPDATE_PRODUCT: 'UPDATE_PRODUCT',
    ADD_BLANK_PRODUCT: 'ADD_BLANK_PRODUCT'
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
                products: toggleProduct(state.products, payload)
            }
        case PRODUCT_ACTION_TYPES.ADD_BLANK_PRODUCT:
            return {
                ...state,
                blankRow: true
            }
        case PRODUCT_ACTION_TYPES.UPDATE_PRODUCT:
            return {
                ...state,
                products: updateItem(state.products, payload)
            }
        default:
            throw new Error(`Unhandled type ${type} in productReducer`);
    }
}

const toggleProduct = (products, productId) => {
    const updatedProducts = products.map((product) => {
        if (product.id === productId) {
            return {
                ...product,
                enable: !product.enable
            }
        }
        return product;
    });
    updateProduct(productId, updatedProducts.find((product) => product.id === productId));
    return updatedProducts;
}

const updateItem = (products, updatedProduct) => {
    const newProducts = products.map((product) =>
        (product.id === updatedProduct.id) ? updatedProduct : product
    );
    updateProduct(updatedProduct.id, updatedProduct);
    return newProducts
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

    const addBlankProduct = () => {
        console.log("Add blank product");
        dispatch(createAction(PRODUCT_ACTION_TYPES.ADD_BLANK_PRODUCT));
    }

    const updateProduct = (updatedProduct) => {
        dispatch(createAction(PRODUCT_ACTION_TYPES.UPDATE_PRODUCT, updatedProduct));
    }
    const value = {
        products: state.products,
        blankRow: state.blankRow,
        setProducts,
        toggleProduct,
        addBlankProduct,
        updateProduct
    };
    return <ProductsContext.Provider value={value}>{children}</ProductsContext.Provider>
}
