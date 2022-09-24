import { Outlet } from 'react-router-dom';
import ProductItem from '../../components/product-item/product-item.component';

import './products.styles.scss';

const Home = () => {

    const productsHeader = [
        {
          id:1,
          title: "Categoria"
        },
        {
          id:2,
          title: "Producto"
        },
        {
          id:3,
          title: "Precio"
        },
        {
          id:4,
          title: "Habilitado"
        },
        {
          id:5,
          title: "Editar"
        },
        {
          id:6,
          title: "Borrar"
        }
      ]
    
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
            {productsHeader.map(({id,title}) =>(
              <span key={id} className="product-header">{title}</span>
            ))}
          </div>
          <div className="products-items-container">
            {products.map((product) => (
              <ProductItem key={product.id} product={product}/>
            ))}
          </div>
          <Outlet/>
        </div>
      );
   
};

export default Home;