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
    const [tags, setTags] = useState([]);
    const [description, setDescription] = useState("");

    const [image, setImage] = useState("");
    const [markDownContent, setMarkDownContent] = useState("");
    const [htmlContent, setHtmlContent] = useState("");
    const [departmentName, setDepartmentName] = useState("");

    const handleUpdateSuccess = () => {
        setIsEditing(false);        // Cập nhật state để tắt chế độ edit
        fetchHandbookData();        // Fetch lại data mới
    };

    useEffect(() => {
        window.scrollTo(0, 0); 
    }, [isEditing]);

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
            setTags(dataHandbook.DT.tags ? dataHandbook.DT.tags.split(',') : []);
            setImage(dataHandbook.DT.image);
            setDate(dataHandbook.DT.updatedAt);
            setMarkDownContent(dataHandbook.DT.handbookDescriptionData.markDownContent);
            setHtmlContent(dataHandbook.DT.handbookDescriptionData.htmlContent);
            setDepartmentName(dataHandbook.DT.handbookStaffData.staffDepartmentData.name);
            setDescription(dataHandbook.DT.shortDescription);
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
            <CreateHandbook 
                handbookId={parseInt(handbookId)} 
                isEditMode={true} 
                handleCancelEdit={handleCancelEdit}
                onUpdateSuccess={handleUpdateSuccess}
            />
        );
    }

    if (handbookLoading) {
        return <div className="text-center p-4">Loading...</div>;
    }

    if (handbookError) {
        return <div className="text-center p-4 text-red-500">Error loading handbooks</div>;
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
                <div className="col-0 col-lg-2"/>
                <div className="col-12 col-lg-8">
                    <h1 className='title'>{title}</h1>
                </div>
                <div className="col-0 col-lg-2"/>
            </div> 
            <div className="row mt-3 text-center">
                <div className="col-2"/>
                <div className="col-8">
                    <div className='row text-center'>
                        <div className='list-tag'>
                            {tags.map((value, index) => (
                                <div key={index} className='tag-item'> {/* Unique key */}
                                    <p>{value}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="col-2"/>
            </div>
            <div className="row mt-3 text-center">
                <p className='description'>{description}</p>
            </div>
            <div className="row mt-3">
                <ReactMarkdown className='markdown-content'>{markDownContent}</ReactMarkdown>
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