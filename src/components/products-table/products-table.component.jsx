import useProducts from '../../context/products.context';
import ProductItem from '../product-item/product-item.component';

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
    const { 
        products
    } = useProducts();
    console.log("__Render__", products);
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
                    products.length !== 0?(
                    products.map((product)=>{
                        console.log("NAME:" + product.name);
                        return(<ProductItem key={product.id} product={product} isEditable={product.edit}/>)
                    })
                    ):null
                }
            </ProductTableBodyContainer>
        </ProductTableContainer>
    );
};

export default ProductsTable;