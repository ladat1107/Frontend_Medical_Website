import { useMutation } from "@/hooks/useMutation";
import { useEffect, useState } from "react";
import { getAllHandbooks } from '@/services/doctorService';
import HandbookItem from "../HandbookItem";
import './ListHandbook.scss';
import { useNavigate } from "react-router-dom";
import { Pagination } from 'antd';
import { Modal, Button, Form, Input } from 'antd';
import { TAGS } from "@/constant/value";

const ListHandbook = () => {
    const navigate = useNavigate();
    const [numbers, setNumbers] = useState(0);
    const [listHandbooks, setListHandbooks] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(15);
    const [total, setTotal] = useState(0);

    const [filter, setFilter] = useState([]);
    const [allTags, setAllTags] = useState(() => {
        let _tags = [...TAGS]
        for (let i = 0; i < _tags.length; i++) {
            _tags[i].checked = false;
        }
        return _tags;
    });
    console.log(allTags)
    const [activeTags, setActiveTags] = useState([]);

    //modal's state
    const [isModalVisible, setIsModalVisible] = useState(false); // State để điều khiển modal
    const [form] = Form.useForm(); // Sử dụng form của Ant Design

    const {
        data: dataHandbooks,
        loading: handbookLoading,
        error: listHandbooksError,
        execute: fetchListHandbooks,
    } = useMutation((query) => getAllHandbooks(currentPage, pageSize, searchTerm));

    useEffect(() => {
        fetchListHandbooks();
    }, [currentPage, pageSize]);

    useEffect(() => {
        if (dataHandbooks?.DT) {
            setListHandbooks(dataHandbooks.DT.handBooks);
            setNumbers(dataHandbooks.DT.totalItems);
            setTotal(dataHandbooks.DT.totalItems);
        }
    }, [dataHandbooks]);

    const {
        data: dataTags,
        loading: tagsLoading,
        error: tagsError,
        execute: fetchTags,
    } = useMutation((query) => getAllTags());

    const handleTagClick = (item) => {
        let _listTag = [...allTags];
        _listTag = _listTag.map(obj =>
            obj.value === item.value ? { ...obj, checked: !item.checked } : obj
        );
        setAllTags(_listTag);
    };
    useEffect(() => {
        let arr = [];
        for (let i = 0; i < allTags.length; i++) {
            if (allTags[i]?.checked) {
                arr.push(allTags[i]?.label)
            }
        }
        console.log("tag choose ", arr)
    }, [allTags])
    const handleHandbookClick = (handbookId) => {
        navigate(`/doctorHandbook/${handbookId}`);
    };

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const handlePageChange = (page, pageSize) => {
        setCurrentPage(page);
        setPageSize(pageSize);
    };

    const handleSearchButton = () => {
        setCurrentPage(1);
        fetchListHandbooks();
    }

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const handleOk = () => {
        //     let arr = []
        //     for (let i = 0; i < allTags.length; i++) {
        //         if (allTags[i].checked)
        //   }
    };



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
            <div className='row mt-2'>
                <div className='col-1 text-end padding0'>
                    <span className="filter" onClick={showModal}>
                        <i className="fa-solid fa-filter"></i>
                        Lọc
                    </span>
                </div>
                <div className='col-10'>
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
            <div className='row'>
                <Pagination
                    align="center"
                    current={currentPage}
                    pageSize={pageSize}
                    total={total}
                    onChange={handlePageChange}
                />
            </div>
            <Modal
                title="Chọn điều kiện lọc"
                open={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
                okText="Lưu"
                cancelText="Hủy">
                <Form
                    form={form}
                    layout="vertical"
                    name="handbookForm">
                    <div className="list-tag">
                        {allTags.map((tag, index) => (
                            <div
                                key={index}
                                className={`tag-item ${tag.checked ? 'active' : ''}`}
                                onClick={() => { console.log(tag); handleTagClick(tag) }} // Handle tag click by index
                            >
                                <p>{tag?.label}</p>
                            </div>
                        ))}
                    </div>
                </Form>
            </Modal>
        </div>
    );
};

export default ListHandbook;