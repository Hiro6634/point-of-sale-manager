import ProductItem from './components/product-item/product-item.component';

import "./products.styles.scss";

const  App = () => {

  const products = [
    {
      id: 1,
      category: 'Parrilla',
      name: 'Hamburguesa',
      price: 100,
      enable: true
    },
    {
      id: 2,
      category: 'Nihonryori',
      name: 'Udon',
      price: 900,
      enable: true
    },
    {
      id: 3,
      category: 'Nihonryori',
      name: 'Yakitori',
      price: 500,
      enable: true
    }
  ]

  return (
    <div className="products-container">
      <div className="products-header-container">
        <span className="product-header">Categoria</span>
        <span className="product-header">Producto</span>
        <span className="product-header">Precio</span>
        <span className="product-header">Habilitado</span>
        <span className="product-header">Editar</span>
        <span className="product-header">Borrar</span>
      </div>
      <div className="products-items-container">
        {products.map(({product}) => (
          <ProductItem key={product.id} product={product}/>
        ))}
      </div>
    </div>
  );
}

export default App;
