import React from 'react';
import "./Loading.scss"
import { Spin } from 'antd';
const Loading = () => {
    return (
        <Spin wrapperClassName="content-spin" tip="Loading...">
        </Spin>
    );
};

export default Loading;