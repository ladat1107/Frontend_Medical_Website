import './CreateHandbook.scss';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import { Form, Input, message, Progress, Modal, Tag} from 'antd';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { getCardActionAreaUtilityClass } from '@mui/material';
import { CloudUploadOutlined, InboxOutlined, UploadOutlined } from '@ant-design/icons';
import { uploadToCloudinary } from '@/utils/uploadToCloudinary';
import { CloudUploadOutlined } from '@ant-design/icons';
import uploadToCloudinary from '@/utils/uploadToCloudinary';
import { getHandbookById, updateHandbook, createHandbook } from '@/services/doctorService';
import { useNavigate } from 'react-router-dom';
import { set } from 'lodash';

const CreateHandbook = ({ handbookId, isEditMode, onUpdateSuccess, handleCancelEdit }) => {
    const navigate = useNavigate();

    const [markdownValue, setMarkdownValue] = useState("");
    const [htmlContent, setHtmlContent] = useState(markdownValue);
    const [uploading, setUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [form] = Form.useForm();

    const [title, setTitle] = useState("");
    const [tag, setTags] = useState("");
    const [tagList, setTagList] = useState([]);
    const [image, setImage] = useState("");
    const [description, setDescription] = useState("");

    let mdParser = new MarkdownIt(/* Markdown-it options */);

    useEffect(() => {
        if (isEditMode && handbookId) {
            fetchHandbookData(); // Lấy dữ liệu cẩm nang khi có handbookId
        }
    }, [handbookId, isEditMode]);

    const fetchHandbookData = async () => {
        try {
            const response = await getHandbookById(handbookId);
            if (response && response.data.DT) {
                setTitle(response.data.DT.title);
                setImage(response.data.DT.image);
                setMarkdownValue(response.data.DT.handbookDescriptionData.markDownContent);
                setHtmlContent(response.data.DT.handbookDescriptionData.htmlContent);
                setTagList(response.data.DT.tags ? response.data.DT.tags.split(',') : []);
                setDescription(response.data.DT.shortDescription);
            }
        } catch (error) {
            message.error('Không thể lấy dữ liệu cẩm nang');
            console.error(error);
        }
    };

    const handleInputChange = (field) => (e) => {
        switch (field) {
            case 'title':
                setTitle(e.target.value);
                break;
            case 'tags':
                setTags(e.target.value);
                break;
            case 'description':
                setDescription(e.target.value);
                break;
            default:
                break;
        }
    }

    let handleEditorChange = ({ html, text }) => {
        setMarkdownValue(text);
        setHtmlContent(html);
        form.setFieldsValue({ markDownContent: text }); // Cập nhật giá trị cho Form.Item
    };

    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        setUploading(true); // Bắt đầu upload
        setUploadProgress(0); // Đặt lại tiến trình về 0
        try {
            // Gọi hàm upload với callback để cập nhật tiến trình
            const url = await uploadToCloudinary(file, (progress) => {
                setUploadProgress(progress);
            });
            setImage(url); // Cập nhật ảnh
            message.success("Upload thành công!");
        } catch (error) {
            message.error("Upload thất bại. Vui lòng thử lại.");
            console.error(error);
        } finally {
            setUploading(false); // Kết thúc upload
        }
    };

    const handleSave = async () => {
        if (!title || !image || !htmlContent || !markdownValue) {
            message.error('Vui lòng nhập đầy đủ thông tin');
            return;
        }

        const data = {
            title: title,
            tags: tagList.join(','),
            author: 6,
            image: image,
            htmlContent: htmlContent,
            markDownContent: markdownValue,
            shortDescription: description
        }

        try {
            if (isEditMode && handbookId) {
                data.id = handbookId;
                const response = await updateHandbook(data);
                if (response && response.EC === 0) {
                    message.success('Cập nhật cẩm nang thành công');
                    if (onUpdateSuccess) {
                        onUpdateSuccess(); // Gọi callback khi update thành công
                    }
                } else {
                    message.error('Cập nhật cẩm nang thất bại');
                }
            } else {
                const response = await createHandbook(data);
                if (response && response.EC === 0) {
                    message.success('Cẩm nang đã được tạo, đang chờ quản trị viên xác nhận');
                } else {
                    message.error('Tạo cẩm nang thất bại');
                }
                navigate(`/doctorHandbook/${response.DT.id}`);
            }
        } catch (error) {
            console.error(error);
            message.error('Tạo cẩm nang thất bại');
        }
    }

    const handleAddTag = (e) => {
        if(e.key === 'Enter') {
            console.log(tag);
            if(tag.trim() === '') return;
            setTagList([...tagList, tag]);
            setTags('');
            console.log(tagList);
        }
    }

    const handleDeleteTag = (index) => {
        setTagList(tagList.filter((_, i) => i !== index));
    }

    return (
        <>
            <div className='create-handbook-container'>
                <div className='row'>
                    <div className='col-1'>
                        <p className='text-bold'>Tiêu đề:</p>
                    </div>
                    <div className='col-6'>
                        <div className="search-container">
                            <i className="fa-solid fa-heading"></i>
                            <input
                                type="text"
                                placeholder="Nhập tiêu đề..."
                                value={title}
                                onChange={handleInputChange('title')} 
                                onKeyDown={handleAddTag}
                            />
                        </div>
                    </div>
                </div>
                <div className='row mt-3'>
                    <div className='col-1'>
                        <p className='text-bold'>Tags:</p>
                    </div>
                    <div className='col-3'>
                        <div className="search-container">
                            <i className="fa-solid fa-tag"></i>
                            <input 
                                type="text" 
                                placeholder="Gắn thẻ ..."
                                value={tag}
                                onChange={handleInputChange('tags')}
                                onKeyDown={handleAddTag}
                                maxLength={20}
                            />
                        </div>
                    </div>
                    <div className="col-5">
                        <div className='row text-start'>
                            <div className='tag-list'>
                                {tagList.map((value, index) => (
                                    <div key={index} className='tag-item'>
                                        <p>{value}</p>
                                        <i onClick={() => handleDeleteTag(index)} className="fa-solid fa-times"/>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                <div className='row mt-3 align-items-start'>
                    <div className='col-1'>
                        <p className='text-bold text-start'>Ảnh bìa:</p>
                    </div>
                    <div className='col-6'>
                        <Form.Item>
                            <div className='image-upload'>
                                <div className='container'>
                                    <span className='image-cloud'><CloudUploadOutlined/></span>
                                    <div onClick={() => document.getElementById('input-upload').click()}>
                                        <span htmlFor={"input-upload"} className='input-upload'>
                                            Chọn ảnh
                                        </span> đăng tải.
                                    </div>
                                    {uploading && (
                                        <div style={{ marginTop: '20px', width: '100%' }}>
                                            <Progress percent={uploadProgress} status="active" />
                                        </div>
                                    )}
                                    {image && (
                                        <div>
                                            <img src={image} alt="Uploaded" style={{ width: "100%" }} />
                                        </div>
                                    )}
                                </div>
                            </div>
                            <input type="file" id='input-upload' hidden={true} onChange={handleImageChange} />
                        </Form.Item>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-1'>
                        <p className='text-bold'>Mô tả:</p>
                    </div>
                    <div className='col-11'>
                        <div className="search-container">
                            <i className="fa-solid fa-note-sticky"></i>
                            <input 
                                type="text" 
                                placeholder="Nhập tiêu đề..."
                                value={description}
                                onChange={handleInputChange('description')} />
                        </div>
                    </div>
                </div>
                <div className='row mt-3'>
                    <div className='col-2'>
                        <p className='text-bold'>Nội dung:</p>
                    </div>
                </div>
                <div className='row mt-1'>
                    <div className='col-12'>
                        <MdEditor style={{
                            minHeight: '280px',
                            borderRadius: '10px',
                            padding: "5px",
                        }}
                            value={markdownValue}
                            renderHTML={text => mdParser.render(text)}
                            onChange={handleEditorChange} />
                    </div>
                </div>
                <div className='row mt-3'>
                    <div className='button-container'>
                        {isEditMode && (
                            <button 
                                className='button-cancel'
                                onClick= {()=>handleCancelEdit()}>
                                <i className="fa-solid fa-times"></i>
                                Hủy
                            </button>
                        )}
                        <button 
                            className='button'
                            onClick={handleSave}>
                            <i className="fa-solid fa-floppy-disk"></i>
                            Lưu
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}
CreateHandbook.propTypes = {
    handbookId: PropTypes.number,
    isEditMode: PropTypes.bool,
    onUpdateSuccess: PropTypes.func,
    handleCancelEdit: PropTypes.func
};

export default CreateHandbook;