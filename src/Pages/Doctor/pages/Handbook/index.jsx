import { useEffect, useState } from 'react';
import { getAllHandbooks } from '@/services/doctorService';
import { useMutation } from '@/hooks/useMutation';
import './Handbook.scss'
import CreateHandbook from './CreateHandbook';
import { List } from 'antd';
import ListHandbook from './ListHandbook';

const Handbook = () => {

    return (
        <>
            <div className="handbook-container">
                <div className="row">
                    <div className="col-6">
                        <h1>Handbook</h1>
                    </div>
                    <div className="col-6">
                        <div className='button-container'>
                            <button className='button'>
                                <i className="fa-solid fa-plus"></i>
                                Thêm mới
                            </button>
                        </div>
                    </div>
                </div>
                <div className='row'>
                    book
                </div>
                <hr/>
                <div className='row'>
                    {/* <ListHandbook /> */}
                    <CreateHandbook />
                </div>
            </div>
        </>
    );
}

export default Handbook;