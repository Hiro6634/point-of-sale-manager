import useProducts from '../../context/products.context';
import './product-item.styles.scss';

import {ReactComponent as IconDelete} from '../../assets/trash-outline.svg';
import {ReactComponent as IconEdit} from '../../assets/create-outline.svg';
import {ReactComponent as IconTrue} from '../../assets/checkmark-outline.svg';
import {ReactComponent as IconFalse} from '../../assets/close-outline.svg';

import { 
    ProductItemContainer,
    CategoryContainer,
    NameContainer,
    PriceContainer,
    StockContainer,
    EnableContainer,
    ControlsContainer,
    IconContainer
} from './product-item.styles';

const ProductItem = ({product}) => {
    const {category, name, price, stock, enable} = product;
    const {toggleProduct} = useProducts();

    return(
        <ProductItemContainer>
            <CategoryContainer>{category}</CategoryContainer>
            <NameContainer>{name}</NameContainer>
            <PriceContainer>${price}</PriceContainer>
            <StockContainer>{stock}</StockContainer>
            <EnableContainer color={enable?'green':'red'}>
                <IconContainer  onClick={()=>{toggleProduct(product)}}>
                {enable?<IconTrue/>:<IconFalse/>}
                </IconContainer>
            </EnableContainer>
            <ControlsContainer>
                <IconContainer  onClick={()=>{console.log(`Edit ${name}`)}}><IconEdit/></IconContainer>
                <IconContainer  onClick={()=>{console.log(`Delete ${name}`)}}><IconDelete/></IconContainer>
            </ControlsContainer>
        </ProductItemContainer>
    );
}

export default ProductItem;