import { useEffect, useState } from 'react';
import './InfoHandbook.scss';
import { useNavigate, useParams } from 'react-router-dom';
import { getHandbookById } from '@/services/doctorService';
import { useMutation } from '@/hooks/useMutation';
import { convertDateTimeToString } from "@/utils/formatDate";
import ReactMarkdown from 'react-markdown';
import CreateHandbook from '../CreateHandbook';

const InfoHandbook = () => {
    const { handbookId } = useParams();
    const navigate = useNavigate();
    const [isEditing, setIsEditing] = useState(false);

    const [doctorName, setDoctorName] = useState("");
    const [date, setDate] = useState("");
    const [title, setTitle] = useState("");
    const [tags, setTags] = useState("");
    const [image, setImage] = useState("");
    const [markDownContent, setMarkDownContent] = useState("");
    const [htmlContent, setHtmlContent] = useState("");
    const [departmentName, setDepartmentName] = useState("");

    const handleUpdateSuccess = () => {
        setIsEditing(false);        // Cập nhật state để tắt chế độ edit
        fetchHandbookData();        // Fetch lại data mới
    };

    let {
        data: dataHandbook,
        loading: handbookLoading,
        error: handbookError,
        execute: fetchHandbookData,
    } = useMutation((query) =>
        getHandbookById(+handbookId)
    );

    useEffect(() => {
        if (handbookId) {
            fetchHandbookData();
        }
    }, []);

    useEffect(() => {
        if (dataHandbook && dataHandbook.DT) {
            setDoctorName(`${dataHandbook.DT.handbookStaffData.staffUserData.lastName} ${dataHandbook.DT.handbookStaffData.staffUserData.firstName}`);
            setTitle(dataHandbook.DT.title);
            setTags(dataHandbook.DT.tags);
            setImage(dataHandbook.DT.image);
            setDate(dataHandbook.DT.updatedAt);
            setMarkDownContent(dataHandbook.DT.handbookDescriptionData.markDownContent);
            setHtmlContent(dataHandbook.DT.handbookDescriptionData.htmlContent);
            setDepartmentName(dataHandbook.DT.handbookStaffData.staffDepartmentData.name);
        }
    }, [dataHandbook]);

    const handleUpdateButton = () => {
        setIsEditing(true);
    }

    const handleCancelEdit = () => {
        setIsEditing(false);
    }

    if (isEditing) {
        return (
            <div className="InfoHandbook-container">
                <CreateHandbook 
                    handbookId={parseInt(handbookId)} 
                    isEditMode={true} 
                    handleCancelEdit={handleCancelEdit}
                    onUpdateSuccess={handleUpdateSuccess}
                />
            </div>
        );
    }

    return (
        <div className="InfoHandbook-container">
            <div className="row text-center">
                <div className="col-12 text-center">
                    <span className="doctor-name">{doctorName}</span>
                    <span>{convertDateTimeToString(date)}</span>
                </div>
            </div>
            <div className="row mt-3 text-center">
                <div className="col-2"/>
                <div className="col-8">
                    <h1>{title}</h1>
                </div>
                <div className="col-2"/>
            </div>
            <div className="row mt-3 text-center">
                <img className='image' src={image} alt="Ảnh bìa"/>
            </div>
            <div className="row mt-3">
                <ReactMarkdown>{markDownContent}</ReactMarkdown>
            </div>
            <div className='row mt-3'>
                <div className='button-container text-end'>
                    <button 
                        className='button'
                        onClick={handleUpdateButton}>
                        <i className="fa-solid fa-gear"></i>
                        Chỉnh sửa
                    </button>
                </div>
            </div>
        </div>
    );
}

export default InfoHandbook;