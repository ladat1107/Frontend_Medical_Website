

import React from 'react'
import "./department.scss";

const DepartmentCard = ({image, address, name, shortDescription}) => {
  return (
    <div className='departmentCard' >
          
            <div className='wrapper' >
            <div className='img' >
           <img src={image || "https://medpro.vn/_next/image?url=https%3A%2F%2Fbo-api.medpro.com.vn%3A5000%2Fstatic%2Fimages%2Fbinhthanhhcm%2Fweb%2Flogo.png%3Ft%3DTue%2520Sep%252013%25202022%252010%3A08%3A08%2520GMT%2B0700%2520(Indochina%2520Time)&w=256&q=75"} alt="" />

           </div>
           <h4 className='departmentCard-title' >{name}</h4>
           <p>{shortDescription || "Eum qui, provident ut deleniti obcaecati expedita, ipsam repellat repellendus culpa"} </p>
            </div>
            <div className='departmentCard-btn' >Tìm hiểu thêm</div>
    </div>
  )
}

export default DepartmentCard