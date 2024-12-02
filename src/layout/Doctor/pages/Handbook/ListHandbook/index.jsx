import { useMutation } from "@/hooks/useMutation";
import { useEffect, useState } from "react";
import { getAllHandbooks, getAllTags } from '@/services/doctorService';
import HandbookItem from "../HandbookItem";
import './ListHandbook.scss';
import { useNavigate } from "react-router-dom";
import { message, Pagination } from 'antd';
import { Modal, Button, Form, Input } from 'antd';
import { TAGS } from "@/constant/value";
import { useSelector } from "react-redux";

const ListHandbook = () => {
    const navigate = useNavigate();
    let { user } = useSelector((state) => state.authen);
    // const {user} = useContext(AuthenContext);

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
    const [activeTags, setActiveTags] = useState([]);

    //modal's state
    const [isModalVisible, setIsModalVisible] = useState(false); // State để điều khiển modal
    const [form] = Form.useForm(); // Sử dụng form của Ant Design

    const {
        data: dataHandbooks,
        loading: handbookLoading,
        error: listHandbooksError,
        execute: fetchListHandbooks,
    } = useMutation((query) => getAllHandbooks(currentPage, pageSize, searchTerm, user.staff, filter.join(',')));

    useEffect(() => {
        fetchListHandbooks();
    }, [currentPage, pageSize, filter]);

    useEffect(() => {
        if (dataHandbooks?.DT) {
            setListHandbooks(dataHandbooks.DT.handBooks);
            setNumbers(dataHandbooks.DT.totalItems);
            setTotal(dataHandbooks.DT.totalItems);
        } else {
            setListHandbooks([]);
            setNumbers(0);
            setTotal(0);
        }
    }, [dataHandbooks]);

    const handleTagClick = (item) => {
        setAllTags(prevTags =>
            prevTags.map(tag =>
                tag.value === item.value ? { ...tag, checked: !tag.checked } : tag
            )
        );
    };

    useEffect(() => {
        const selectedTags = allTags.filter(tag => tag.checked).map(tag => tag.label);
        setActiveTags(selectedTags); // Sử dụng setActiveTags thay vì push trực tiếp
    }, [allTags]);

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
        setIsModalVisible(false);
        setFilter(activeTags);
        setCurrentPage(1);
        fetchListHandbooks();
    };

    if (handbookLoading) {
        return <div className="text-center p-4">Loading...</div>;
    }

    if (listHandbooksError) {
        return <div className="text-center p-4 text-red-500">Error loading handbooks</div>;
    }

    return (
        <div className="list-handbook-container">
            <div className="list-handbook-header">
                <div className='row'>
                    <div className='col-12 mb-2 col-lg-1 parent d-flex justify-content-center align-items-center'>
                        <p className='text-bold'>{numbers} bài viết</p>
                    </div>
                    <div className="col-12 col-lg-6" />
                    <div className='col-9 col-lg-4'>
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
                    <div className='col-3 col-lg-1 d-flex justify-content-center padding0'>
                        <span className="filter" onClick={showModal}>
                            <i className="fa-solid fa-filter"></i>
                            Lọc
                        </span>
                    </div>
                </div>
                <div className={`row ${filter && filter.length > 0 ? 'mt-3' : ''}`}>
                    <div className='col-12 col-lg-2' />
                    <div className='col-12 col-lg-10'>
                        <div className="list-tag rtl">
                            {filter.map((tag, index) => (
                                <div
                                    key={index}
                                    className="tag-selected">
                                    <p>{tag}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {handbookLoading ? (
                <div className="text-center py-4">Loading...</div>
            ) : (
                <div className='row justify-content-center justify-content-lg-start mt-3 item'>
                    {listHandbooks.length > 0 ? (
                        listHandbooks.map((item) => (
                            <div className="mt-2 col-9 col-lg-4" key={item.id}>
                                <HandbookItem
                                    key={item.id}
                                    item={item}
                                    onClick={handleHandbookClick} />
                            </div>
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
                title="Lọc"
                open={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
                okText="Lưu"
                cancelText="Hủy">
                <Form
                    form={form}
                    layout="vertical"
                    name="handbookForm">
                    <div className="list-tag tag-box mt-3">
                        {allTags.map((tag, index) => (
                            <div
                                key={index}
                                className={`tag-item ${tag.checked ? 'active' : ''}`}
                                onClick={() => { handleTagClick(tag) }}>
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