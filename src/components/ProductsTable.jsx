import { useContext } from "react";
import { ProductsContext } from "../context/products.context";
import ProductsTableLine from "./ProductsTableLine";

const ProductsTable = () => {
    const {
        products,
        blankRow
    } = useContext(ProductsContext);


    return (
        <div className="w-full flex flex-col items-start">
            <table className="w-full">
                <thead className="bg-gray-500 border-b-2">
                    <tr className="columns-1">
                        <th className="p-2 text-sm font-semibold tracking-wide text-center border border-gray-700 uppercase">Categoria</th>
                        <th className="p-2 text-sm font-semibold tracking-wide text-center border border-gray-700 uppercase">Producto</th>
                        <th className="p-2 text-sm font-semibold tracking-wide text-center border border-gray-700 uppercase">Precio</th>
                        <th className="p-2 text-sm font-semibold tracking-wide text-center border border-gray-700 uppercase">Stock</th>
                        <th className="p-2 text-sm font-semibold tracking-wide text-center border border-gray-700 uppercase w-1/12">Habilitado</th>
                        <th className="p-2 text-sm font-semibold tracking-wide text-center border border-gray-700 uppercase w-1/12">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => (
                        <ProductsTableLine key={product.id} product={product} />
                    ))}
                    {blankRow ? (<ProductsTableLine product={null} />) : null}
                </tbody>
            </table>
        </div >
    );
};

export default ProductsTable;