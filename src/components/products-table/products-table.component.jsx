import useProducts from '../../context/products.context';
import useCategories from '../../context/categories.context';
import { useEffect } from 'react';
import ProductItem from '../product-item/product-item.component';
// import ProductLineItem from '../product-line-item/product-line-item.component';
// import ProductLineInput from '../product-line-input/product-line-input.component';
import { 
    ProductTableContainer,
    ProductTableHeaderContainer,
    CategoryContainer,
    NameContainer,
    StockContainer,
    EnableContainer,
    ControlsContainer,
    ProductTableBodyContainer,
    PriceContainer
} from './products-table.styles'; 

const ProductsTable = () => {
    const { products, sortProductsByCategories } = useProducts();
    const { categories } = useCategories();

    useEffect(()=>{
        sortProductsByCategories(categories);
    },[categories])

    console.log(products);
    console.log(categories);
    return(
        <ProductTableContainer>
            <ProductTableHeaderContainer>
                <CategoryContainer>Categoria</CategoryContainer>    
                <NameContainer>Producto</NameContainer>
                <PriceContainer>Precio</PriceContainer>
                <StockContainer>Stock</StockContainer>
                <EnableContainer>Habilitado</EnableContainer>
                <ControlsContainer>Editar/Borrar</ControlsContainer>
            </ProductTableHeaderContainer>
            <ProductTableBodyContainer>
                {
                    // products.map((product) => {
                    //     return(<p key={product.id}>{product.name}</p>)
                    // })
                    products.map((product)=>(<ProductItem product={product}/>))
                }
            {/* {
                Object.keys(products).map((key)=>{
                    const { id } = products[key];
                    if( editProductId === id){
                        console.log("EDIT " + products[key].id);
                    }
                    return(
                        (id===editProductId)?(
                            <ProductLineInput key={id} product={products[key]}/>
                        ):(
                            <ProductLineItem key={id} product={products[key]}/>
                        )
                    )
                }            
            )} */}
            </ProductTableBodyContainer>
        </ProductTableContainer>
    );
};

export default ProductsTable;