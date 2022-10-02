import { useContext } from 'react';
import ProductsTable from '../../components/products-table/products-table.component';
import Button from '../../components/button/button.component';
import { ProductsContext } from '../../context/products.context';
import AddOrUpdateProduct from '../../components/add-or-update-product/add-or-update-product.component';
import { 
    ButtonContainer, 
    ProductsContainer 
} from './products.styles';

const handleHidden = () => {
    console.log("Bingo!");
}
const Products = () => {
    const {hidden,toggleProductEditHidden} = useContext(ProductsContext);
    return( 
        <ProductsContainer>
            <h2>PRODUCTOS</h2>
            <ProductsTable/>
            <ButtonContainer>
                <Button onClick={()=>{
                    toggleProductEditHidden()}}
                >
                    Agregar
                </Button> 
            </ButtonContainer>
            {
                !hidden?<AddOrUpdateProduct/>:null
            }
        </ProductsContainer>
    )
};

export default Products;