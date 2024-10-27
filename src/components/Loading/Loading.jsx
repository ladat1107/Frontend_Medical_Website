import React from 'react';
import "./Loading.scss"
import { BallTriangle } from 'react-loader-spinner'
const Loading = () => {
    return (
        <div className='loader-container'>
            <BallTriangle
                height={100}
                width={100}
                radius={5}
                color="#4fa94d"
                ariaLabel="ball-triangle-loading"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
            />
        </div>

    );
};

export default Loading;