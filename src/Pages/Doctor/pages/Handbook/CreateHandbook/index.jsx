import './CreateHandbook.scss';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import { Button, Col, Form, Input, message, Progress, Radio, Row, Select, Upload } from 'antd';
import { useState } from 'react';

const CreateHandbook = () => {

    const [markdownValue, setMarkdownValue] = useState("");
    const [form] = Form.useForm();

    let mdParser = new MarkdownIt(/* Markdown-it options */);
    let htmlContent = markdownValue;

    let handleEditorChange = ({ html, text }) => {
        setMarkdownValue(text);
        htmlContent = html;
        form.setFieldsValue({ markDownContent: text }); // Cập nhật giá trị cho Form.Item
    };

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
                                placeholder="Nhập tiêu đề..." />
                        </div>
                    </div>
                </div>
                <div className='row mt-3'>
                    <div className='col-1'>
                        <p className='text-bold'>Tags:</p>
                    </div>
                    <div className='col-6'>
                        <div className="search-container">
                            <i className="fa-solid fa-tag"></i>
                            <input 
                                type="text" 
                                placeholder="Thêm tags..." />
                        </div>
                    </div>
                </div>
                <div className='row mt-3'>
                    <div className='col-1'>
                        <p className='text-bold'>Ảnh bìa:</p>
                    </div>
                    <div className='col-6'>
                        <div className="search-container">
                            <i className="fa-solid fa-image"></i>
                            <input 
                                type="text" 
                                placeholder="Thêm ảnh..." />
                        </div>
                    </div>
                </div>
                <div className='row mt-3'>
                    <div className='col-2'>
                        <p className='text-bold'>Nội dung:</p>
                    </div>
                </div>
                <div className='row mt-3'>
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
            </div>
        </>
    )
}

export default CreateHandbook;