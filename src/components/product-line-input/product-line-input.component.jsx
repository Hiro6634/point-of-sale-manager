import { useContext } from 'react';
import {ReactComponent as IconDelete} from '../../assets/trash-outline.svg';
import {ReactComponent as IconEdit} from '../../assets/create-outline.svg';
import {ReactComponent as IconTrue} from '../../assets/checkmark-outline.svg';
import {ReactComponent as IconFalse} from '../../assets/close-outline.svg';
import {ReactComponent as IconSave} from '../../assets/save-alt-svgrepo-com.svg';

import { ProductContext } from '../../context/product.context';
import useProducts from '../../context/products.context';
import { 
    CategoryContainer,
    EnableContainer,
    IconContainer,
    NameContainer,
    StockContainer,
    ProductLineInputContainer ,
    ControlsContainer
} from './product-line-input.styles';

const ProductLineInput = ({product}) => {
    const {
        toggleProduct, 
    } = useContext(ProductContext);
    const {
        deleteProduct,
        updateProduct,
        toggleProductEditHidden
    } = useProducts();

    const {category, name, stock, enable} = product;
    
    return(
        <ProductLineInputContainer>
            <CategoryContainer value={category.toUpperCase()}/>
            <NameContainer value={name.toUpperCase()}/>
            <StockContainer value={stock} />
            <EnableContainer>
                <IconContainer onClick={()=>{
                    toggleProduct(product);
                }}>
                    {enable?<IconTrue/>:<IconFalse/>}
                </IconContainer>
            </EnableContainer>
            <ControlsContainer>
                <IconContainer isCleckeable>
                    <IconEdit onClick={()=>{
                        updateProduct(product);
                        toggleProductEditHidden();
                    }}/>
                </IconContainer>
                <IconContainer isCleckeable>
                    <IconDelete onClick={()=>{
                        console.log("DELETE! product:"+name)
                        window.confirm("QUIERE ELIMINAR EL PRODUCTO: " + name + "?") ?
                            deleteProduct(product)
                        :
                            console.log("CANCEL");
                    }}/>
                </IconContainer>
            </ControlsContainer> 
        </ProductLineInputContainer>
    );
};

export default ProductLineInput; 

