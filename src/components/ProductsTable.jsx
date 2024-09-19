import { useContext } from "react";
import { ProductsContext } from "../context/products.context";
const ProductsTable = () => {
    const { products } = useContext(ProductsContext);

    return (
        <div className="w-full flex flex-col items-start">
            <table className="w-full">
                <thead className="bg-black text-white border-b-2">
                    <tr className="columns-1">
                        <th className="p-2 text-sm font-semibold tracking-wide text-left text-silver-500">Categoria</th>
                        <th className="p-2 text-sm font-semibold tracking-wide text-left">Producto</th>
                        <th className="p-2 text-sm font-semibold tracking-wide text-left">Precio</th>
                        <th className="p-2 text-sm font-semibold tracking-wide text-left">Stock</th>
                        <th className="p-2 text-sm font-semibold tracking-wide text-left">Habilitado</th>
                        <th className="p-2 text-sm font-semibold tracking-wide text-left">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => (
                        <tr key={product.id} className="p-2 columns-1">
                            <td className="p-2 text-sm font-bold tracking-wide text-left">{product.category}</td>
                            <td className="p-2 text-sm font-mono tracking-wide text-left">{product.name}</td>
                            <td className="p-2 text-sm font-mono tracking-wide text-right">{product.price}</td>
                            <td className="p-2 text-sm font-mono tracking-wide text-right">{product.stock}</td>
                            <td className="p-2 text-sm font-mono tracking-wide text-left">{product.enable}</td>
                            <td className="p-2 text-sm font-mono tracking-wide text-left">{product.enable}</td>
                        </tr>
                    ))}

                </tbody>
            </table>
        </div >
    );
};

export default ProductsTable;