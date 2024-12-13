import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../DepartmentDetail.scss";
import { faCalendarMinus } from "@fortawesome/free-solid-svg-icons";
import { formatDate } from "@/utils/formatDate";

const DepartmentDetailHeader = (props) => {
    let { departmentDetail } = props;
    return (
        <div className="department-detail-user-header">
            <div className="imghead">
                <img src={departmentDetail?.image} alt="" />
            </div>
            <div className="department-detail-user-content row">
                <div className="content-handbook col-9">
                    <h1 className="article-title">
                        {departmentDetail?.name}
                    </h1>
                    <div className="article-meta">
                        <FontAwesomeIcon className="me-3" icon={faCalendarMinus} />
                        <span className="article-date">Trưởng khoa</span>
                        <span className="article-author"> - {departmentDetail?.deanDepartmentData?.position}. {departmentDetail?.deanDepartmentData?.staffUserData?.lastName + " " + departmentDetail?.deanDepartmentData?.staffUserData?.firstName}</span>
                    </div>
                    <div className="article-intro">
                        {departmentDetail?.shortDescription}
                    </div>
                    <div className="article-content mt-4">
                        <div lassName="article-content" dangerouslySetInnerHTML={{ __html: departmentDetail?.departmentDescriptionData?.htmlContent || "" }}></div>
                    </div>
                </div>
                <div className="col-3 image-ri">
                    <img src={departmentDetail?.deanDepartmentData?.staffUserData?.avatar || "https://medpro.vn/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fbn.da13f84b.png&w=1920&q=75"} />
                </div>
            </div>
        </div>
    )
}

export default DepartmentDetailHeader;