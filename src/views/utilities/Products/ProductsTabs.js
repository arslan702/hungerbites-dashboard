/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import AllProductTab from './AllProductTab';
import OutOfStockProducts from './OutOfStockProducts';
import InStockProducts from './InStockProducts';
import ProductsOnSale from './ProductsOnSale';

const ProductsTabs = ({
    tab,
    setProductsList,
    productsList,
    setCurrentRowData,
    setOpen,
    open,
    discountsList,
    setDiscountsList,
    inStockProducts,
    setInStockProducts,
    outStock,
    setOutStock
}) => {
    const renderRouteSwitch = () => {
        switch (tab) {
            case 'outOfStockProducts':
                return (
                    <OutOfStockProducts
                        setOpenEdit={setOpen}
                        outStock={outStock}
                        setOutStock={setOutStock}
                        setCurrentRowData={setCurrentRowData}
                        value={tab}
                    />
                );
            case 'inStockProducts':
                return (
                    <InStockProducts
                        setOpenEdit={setOpen}
                        inStockProducts={inStockProducts}
                        setInStockProducts={setInStockProducts}
                        setCurrentRowData={setCurrentRowData}
                        value={tab}
                    />
                );
            case 'productsOnSale':
                return <ProductsOnSale value={tab} discountsList={discountsList} setDiscountsList={setDiscountsList} />;
            default:
                return (
                    <AllProductTab
                        setProductsList={setProductsList}
                        setCurrentRowData={setCurrentRowData}
                        productsList={productsList}
                        value={tab}
                        setOpenEdit={setOpen}
                    />
                );
        }
    };
    return <>{renderRouteSwitch()}</>;
};

export default ProductsTabs;
