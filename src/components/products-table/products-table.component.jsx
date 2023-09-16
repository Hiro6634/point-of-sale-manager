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
        products, 
        addnew,
        idProductToEdit
    } = useProducts();
    const newProdcut = {
        id: "1",
        category:"",
        name:"",
        price:0,
        stock:0,
        enable:false
    };
    if( idProductToEdit ){
        console.log("idPorductToEdit:" + idProductToEdit);
    }
        
    // products.map((p)=>{
    //     console.log(p.category + " " +p.name);
    //     return("");
    // })
    // console.log("RENDER PRODUCTS");

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
                    let isEditable = false;
                    if( idProductToEdit ){
                        isEditable = (product.id===idProductToEdit);
                    }

                    return(<ProductItem key={product.id} product={product} isEditable={isEditable}/>)
                })
                ):null
            }
            </ProductTableBodyContainer>
            {
                addnew?(
                   <ProductItem product={newProdcut} isEditable />
                ):null
            }
        </ProductTableContainer>
    );
};

export default ProductsTable;