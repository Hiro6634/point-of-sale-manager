import { createContext, useContext, useEffect, useReducer } from 'react';
import useCategories from './categories.context';

import { 
    removeProduct,
    insertProduct,
    updateProduct,
    onProductsChangedListener,
    getProdutcsOrderedByCategory
} from '../utils/firebase/firebase.utils';

import { createAction } from '../utils/reducer/reducer.utils';

export const ProductsContext = createContext({
    products: [],
    hidden: true,
    editing: false,
    product: null
});

const PRODUCTS_ACTION_TYPES = {
    SET_PRODUCTS:'SET_PRODUCTS',
    CLEAR_PRODUCT: 'CLEAR_PRODUCT',
    DELETE_PRODUCT: 'DELETE_PRODUCT',
    UPDATE_PRODUCT: 'UPDATE_PRODUCT',
    ADD_PRODUCT: 'ADD_PRODUCT',
    TOGGLE_PRODUCT: 'TOGGLE_PRODUCT',
    NEW_PRODUCT: 'NEW_PRODUCT',
    CANCEL_EDIT_PRODUCT: 'CANCEL_NEW_PRODUCT',
    EDIT_PRODUCT: 'EDIT_PRODUCT',
};

const INITIAL_STATE = {
    products: [],
    addnew: false,
    idProductToEdit:null
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
                products: payload
            };
        case PRODUCTS_ACTION_TYPES.ADD_PRODUCT: {
            console.log("ADD_PrODUCT");
            return {
                ...state,
                addnew: false,
                products: payload
            };

        }
        case PRODUCTS_ACTION_TYPES.UPDATE_PRODUCT:
            return {
                ...state,
                editing: false,
            };
        case PRODUCTS_ACTION_TYPES.TOGGLE_PRODUCT:
            return{
                ...state,
                products: payload
            }
        case PRODUCTS_ACTION_TYPES.NEW_PRODUCT:
            return{
                ...state,
                addnew: true,
                idProductToEdit: null

            }
        case PRODUCTS_ACTION_TYPES.CANCEL_EDIT_PRODUCT:
            return {
                ...state,
                addnew: false,
                idProductToEdit: 0
            }
        case PRODUCTS_ACTION_TYPES.EDIT_PRODUCT:
            return{
                ...state,
                idProductToEdit: payload
            }
        default:
            throw new Error(`unhandled type of ${type} in productsReducer`);
    }
}


// const toggleProduct = (products, productToToggle) => {
//     const product = products.filter(p=>p.id.toLowerCase() === productToToggle.id.toLowerCase());

//     updateProduct(product[0].id, {enable: !product[0].enable});

//     return products;
// }

export const ProductsProvider = ({children}) => {
    const [state, dispatch] = useReducer(productsReducer, INITIAL_STATE);
    const {categories} = useCategories();

    const setProducts = (products) => {
        dispatch(createAction(PRODUCTS_ACTION_TYPES.SET_PRODUCTS, products));
    }

    const addProduct = (productToAdd) => {
        console.log("_ADD_PRODUCT_", productToAdd);
        const product = {
            id: productToAdd.id?productToAdd.id:productToAdd.name.toLowerCase().replaceAll(' ','_'),
            category: productToAdd.category,
            name: productToAdd.name,
            price: parseInt(productToAdd.price),
            stock: parseInt(productToAdd.stock),
            enable: productToAdd.enable,
        }
        insertProduct(product);
        
        dispatch(createAction(PRODUCTS_ACTION_TYPES.ADD_PRODUCT, state.products));
    }
    const deleteProduct = (productToDel) => {
        removeProduct(productToDel);
        dispatch(createAction(PRODUCTS_ACTION_TYPES.DELETE_PRODUCT, state.products));
    }

    // const updateProduct = (product) => {
    //     console.log("PRODUCT TO UPDATE:" + product.name);
    //     dispatch(createAction(PRODUCTS_ACTION_TYPES.UPDATE_PRODUCT, product));
    // }

    const clearProduct = () => {
        console.log("CLEAR PRODUCT");
        dispatch(createAction(PRODUCTS_ACTION_TYPES.CLEAR_PRODUCT, null));
    }
    const toggleProduct = (productToToggle) => {
        console.log("TOGGLE:", productToToggle);
        const product = state.products.filter(p=>p.id.toLowerCase() === productToToggle.id.toLowerCase());

        console.log("FIND PRODUCT:", product);
        updateProduct(product[0].id, {enable: !product[0].enable});
            dispatch(createAction(PRODUCTS_ACTION_TYPES.TOGGLE_PRODUCT, state.products));
    }
    const newProduct = () => {
        dispatch(createAction(PRODUCTS_ACTION_TYPES.NEW_PRODUCT, null));
    }
    const cancelEditProduct = () => {
        dispatch(createAction(PRODUCTS_ACTION_TYPES.CANCEL_EDIT_PRODUCT, null));
    }
    const editProduct = (productId) => {
        dispatch(createAction(PRODUCTS_ACTION_TYPES.EDIT_PRODUCT, productId));
    }
    //En el inicio establezco la funcion que monitorea cambios en la coleccion de productos
    useEffect(()=>{
        onProductsChangedListener((productsMap)=>{
           setProducts(productsMap);
        });
    }, []);

    // Recargo los productos si hubo un cambio en las categorias
    useEffect(()=>{
        async function loadProducts(){
            try{
                const products = await getProdutcsOrderedByCategory();

                setProducts(products);

            }catch(error){
                console.error(error);
            }
        } 

        loadProducts();
    },[categories]);
    
    const value = {
        products: state.products, 
        addnew: state.addnew,
        idProductToEdit: state.idProductToEdit,
        setProducts,
        deleteProduct,
        updateProduct,
        clearProduct,
        addProduct,
        toggleProduct,
        newProduct,
        cancelEditProduct,
        editProduct,
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
