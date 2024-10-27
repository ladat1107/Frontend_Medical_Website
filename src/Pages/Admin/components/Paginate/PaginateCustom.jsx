import React from 'react';
import Paginate from "react-paginate-in-peace";
const PaginateCustom = (props) => {
    return (
        <Paginate className="paginate"
            totalPageCount={props.totalPageCount} // Required Property
            setPage={props.setPage} // Required Property
            activeDigitColor={"white"} // Optional Property
            activeBackgroundColor={"#75e1fa"} // Optional Property
            buttonBorderColor={"#75e1fa"} // Optional Property
            arrowColor={"#21385b"} // Optional Property
            dotColor={"#000"} // Optional Property
        />
    );
};

export default PaginateCustom;