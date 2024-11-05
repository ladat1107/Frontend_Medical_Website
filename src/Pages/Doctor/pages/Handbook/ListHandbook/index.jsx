import { useMutation } from "@/hooks/useMutation";
import { useEffect, useState } from "react";
import { getAllHandbooks } from '@/services/doctorService';
import HandbookItem from "../HandbookItem";
import './ListHandbook.scss';

const ListHandbook = () => {

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
        <div className="list-handbook-container">
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
                        <p className='text-bold'>{numbers} bài</p>
                    </div>
                    <div className='col-6'>
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
    );
}

export default ListHandbook;