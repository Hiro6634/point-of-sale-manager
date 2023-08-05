import './product-item.styles.scss';

import { 
    ProductItemContainer,
    CategoryContainer,
    NameContainer,
    PriceContainer,
    StockContainer,
    EnableContainer,
    ControlsContainer
} from './product-item.styles';

const ProductItem = ({product}) => {
    const {category, name, price, stock, enable} = product;
    return(
        <ProductItemContainer>
            <CategoryContainer>{category}</CategoryContainer>
            <NameContainer>{name}</NameContainer>
            <PriceContainer>${price}</PriceContainer>
            <StockContainer>{stock}</StockContainer>
            <EnableContainer>{enable?"True":"False"}</EnableContainer>
            <ControlsContainer>
                <span className="product-item">edit</span>
                <span className="product-item">del</span>
            </ControlsContainer>
        </ProductItemContainer>
    );
}

export default ProductItem;