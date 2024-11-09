import { useMutation } from "@/hooks/useMutation";
import { useEffect, useState } from "react";
import { getAllHandbooks } from '@/services/doctorService';
import HandbookItem from "../HandbookItem";
import './ListHandbook.scss';
import { useNavigate } from "react-router-dom";

const ListHandbook = () => {
    const navigate = useNavigate();
    const [numbers, setNumbers] = useState(0);
    const [listHandbooks, setListHandbooks] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    const {
        data: dataHandbooks,
        loading: handbookLoading,
        error: listHandbooksError,
        execute: fetchListHandbooks,
    } = useMutation((query) => getAllHandbooks(1, 20, searchTerm));

    useEffect(() => {
        fetchListHandbooks();
    }, []);

    useEffect(() => {
        if (dataHandbooks?.DT) {
            setListHandbooks(dataHandbooks.DT);
            setNumbers(dataHandbooks.DT.length);
        }
    }, [dataHandbooks]);

    const handleHandbookClick = (handbookId) => {
        navigate(`/doctorHandbook/${handbookId}`);
    };

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleSearchButton = () => {
        fetchListHandbooks();
    }

    if (handbookLoading) {
        return <div className="text-center p-4">Loading...</div>;
    }

    if (listHandbooksError) {
        return <div className="text-center p-4 text-red-500">Error loading handbooks</div>;
    }

    return (
        <div className="list-handbook-container">
            <div className='row'>
                <div className='col-1 text-end'>
                    <p className='text-bold'>{numbers} bài</p>
                </div>
                <div className='col-6'>
                    <div className="search-container">
                        <input 
                            type="text" 
                            placeholder="Nhập để tìm kiếm..."
                            value={searchTerm}
                            onChange={handleSearch}
                        />
                        <button className='button' onClick={handleSearchButton}>
                            <i className="fa-solid fa-magnifying-glass"></i>
                        </button>
                    </div>
                </div>
            </div>

            {handbookLoading ? (
                <div className="text-center py-4">Loading...</div>
            ) : (
                <div className='row mt-3 item'>
                    {listHandbooks.length > 0 ? (
                        listHandbooks.map((item) => (
                            <HandbookItem 
                                key={item.id} 
                                item={item} 
                                onClick={handleHandbookClick}
                            />
                        ))
                    ) : (
                        <div className="text-center py-4">No handbooks found</div>
                    )}
                </div>
            )}
        </div>
    );
};

export default ListHandbook;