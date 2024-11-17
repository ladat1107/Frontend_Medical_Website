

import React from 'react'
import "./department.scss";

const DepartmentCard = () => {
  return (
    <div className='departmentCard' >
           <img src="https://medpro.vn/_next/image?url=https%3A%2F%2Fbo-api.medpro.com.vn%3A5000%2Fstatic%2Fimages%2Fbvmathcm%2Fweb%2Flogo.png%3Ft%3D11&w=256&q=75" alt="" />
           <h4 className='departmentCard-title' >Khoa chấn thương chỉnh hình</h4>
           <p>Eum qui, provident ut deleniti obcaecati expedita, ipsam repellat repellendus culpa mollitia hic odit.</p>
            <div className='departmentCard-btn' >Tìm hiểu thêm</div>
    </div>
  )
}

export default DepartmentCard