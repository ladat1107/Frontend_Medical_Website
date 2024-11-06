import React from 'react';
import Paginate from "react-paginate-in-peace";
const PaginateCustom = (props) => {
    return (
        <Paginate className="paginate"        
            totalPageCount={props.totalPageCount} // Required Property
            setPage={props.setPage} // Required Property
            activeDigitColor={"white"} // Optional Property
            activeBackgroundColor={"#03989e"} // Optional Property
            buttonBorderColor={"#03989e"} // Optional Property
            arrowColor={"#03989e"} // Optional Property
            dotColor={"#03989e"} // Optional Property
        />
    );
};

export default PaginateCustom;