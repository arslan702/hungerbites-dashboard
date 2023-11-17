/* eslint-disable prettier/prettier */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import FeaturedProducts from './FeaturedProducts';
import TradeOfferProducts from './TradeOfferProducts';

const ProductsTabs = ({ tab, setCurrentRowData, discountsList, setDiscountsList, setOpen, setOffersOpen, offersList, setOffersList }) => {
    const renderRouteSwitch = () => {
        switch (tab) {
            case 'Trade Offers':
                return <TradeOfferProducts offersList={offersList} setOffersList={setOffersList} setCurrentRowData={setCurrentRowData} setOpenEdit={setOffersOpen} value={tab} />;
            default:
                return <FeaturedProducts discountsList={discountsList} setDiscountsList={setDiscountsList} setCurrentRowData={setCurrentRowData} setOpenEdit={setOpen} value={tab} />;
        }
    };
    return <>{renderRouteSwitch()}</>;
};

export default ProductsTabs;
