import { useEffect, useState } from "react";
import agent from "../../api/agent";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { Product } from "../../app/models/product";
import ProductList from "./ProductList";

export default function Catalog() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        agent.Catalog.list()
            .then(setProducts)
            .catch(console.log)
            .finally(() => setLoading(false));
    }, []);

    if (loading) {
        return <LoadingComponent />;
    }

    return (
        <ProductList products={products} />
    );
}
