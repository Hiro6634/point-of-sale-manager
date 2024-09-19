import { useContext } from "react";
import { ProductsContext } from "../context/products.context";
const ProductsTable = () => {
    const { products } = useContext(ProductsContext);

    return (
        <div className="w-full flex flex-col items-start">
            <table className="w-full">
                <thead className="bg-gray-500 border-b-2">
                    <tr className="columns-1">
                        <th className="p-2 text-sm font-semibold tracking-wide text-center border border-gray-700 uppercase">Categoria</th>
                        <th className="p-2 text-sm font-semibold tracking-wide text-center border border-gray-700 uppercase">Producto</th>
                        <th className="p-2 text-sm font-semibold tracking-wide text-center border border-gray-700 uppercase">Precio</th>
                        <th className="p-2 text-sm font-semibold tracking-wide text-center border border-gray-700 uppercase">Stock</th>
                        <th className="p-2 text-sm font-semibold tracking-wide text-center border border-gray-700 uppercase">Habilitado</th>
                        <th className="p-2 text-sm font-semibold tracking-wide text-center border border-gray-700 uppercase">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => (
                        <tr key={product.id} className="p-2 columns-1">
                            <td className="p-2 text-sm font-bold tracking-wide text-left border border-gray-400">{product.category}</td>
                            <td className="p-2 text-sm font-mono tracking-wide text-left border border-gray-400">{product.name}</td>
                            <td className="p-2 text-sm font-mono tracking-wide text-right border border-gray-400">{product.price}</td>
                            <td className="p-2 text-sm font-mono tracking-wide text-right border border-gray-400">{product.stock}</td>
                            <td className="p-2 text-sm font-mono tracking-wide text-left border border-gray-400">{product.enable}</td>
                            <td className="p-2 text-sm font-mono tracking-wide text-left border border-gray-400">{product.enable}</td>
                        </tr>
                    ))}

                </tbody>
            </table>
        </div >
    );
};

export default ProductsTable;