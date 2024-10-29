import { useEffect, useState } from 'react';
import HandbookItem from './HandbookItem';
import { getAllHandbooks } from '@/services/doctorService';
import { useMutation } from '@/hooks/useMutation';
import './Handbook.scss'
import { set } from 'lodash';

const Handbook = () => {

    const [numbers, setNumbers] = useState(0);
    const [listHandbooks, setListHandbooks] = useState([]);

    let {
        data: dataHandbooks,
        loading: handbookLoading,
        error: listHandbooksError,
        execute: fetchListHandbooks,
    } = useMutation((query) =>
        getAllHandbooks(1, 10, '')
    );

    useEffect(() => {
        fetchListHandbooks();
    }, []);

    useEffect(() => {
        if (dataHandbooks && dataHandbooks.DT) {
            setListHandbooks(dataHandbooks.DT);
            setNumbers(dataHandbooks.DT.length);
        } 
    }, [dataHandbooks]);

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
                    <div className='col-1'>
                        Bộ lọc
                    </div>
                    <div className='col-11'>
                        <input 
                            type="text" 
                            placeholder="Search..." />
                    </div>
                </div>
                <div className='row mt-3'>
                    <div className='col-1 end-border'>
                        <p className='count'>{numbers} bài</p>
                    </div>
                    <div className='col-11'>
                        <div className="search-container">
                            <i className="fa-solid fa-magnifying-glass"></i>
                            <input 
                                type="text" 
                                placeholder="Search..." />
                        </div>
                    </div>
                </div>
                <div className='row mt-3 item'>
                    {listHandbooks.length > 0 && listHandbooks.map((item, index) => {
                        return (
                            <HandbookItem key={index} item={item} />
                        )
                    })}
                </div>
            </div>
        </>
    );
}

export default Handbook;