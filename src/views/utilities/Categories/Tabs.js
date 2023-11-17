/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import AllCategories from './AllCategories';
// import SubCategory from './SubCategory';

const ProductsTabs = ({ tab, setOpen, setCurrentRowData, categoryList, setCategoryList, subCategoryList, setSubCategoryList }) => {
    const renderRouteSwitch = () => {
        switch (tab) {
            // case 'Sub Categories':
            //     return (
            //         <SubCategory
            //             value={tab}
            //             setOpenEdit={setOpen}
            //             setCurrentRowData={setCurrentRowData}
            //             subCategoryList={subCategoryList}
            //             setSubCategoryList={setSubCategoryList}
            //         />
            //     );
            default:
                return (
                    <AllCategories
                        value={tab}
                        setOpenEdit={setOpen}
                        setCurrentRowData={setCurrentRowData}
                        categoryList={categoryList}
                        setCategoryList={setCategoryList}
                    />
                );
        }
    };
    return <>{renderRouteSwitch()}</>;
};

export default ProductsTabs;
