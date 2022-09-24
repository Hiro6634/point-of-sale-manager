import './product-item.styles.scss';

const ProductItem = ({product}) => {
    const {category, name, price, enable} = product;
    return(
        <div className="product-item-container">
            <span className="product-item">{category}</span>
            <span className="product-item">{name}</span>
            <span className="product-item">${price}</span>
            <span className="product-item">{enable?"True":"False"}</span>
            <span className="product-item">edit</span>
            <span className="product-item">del</span>
        </div>
    );
}

export default ProductItem;