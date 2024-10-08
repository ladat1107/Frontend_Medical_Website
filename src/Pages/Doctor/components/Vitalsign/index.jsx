import { useState } from "react";
import "./VitalSign.scss"

const VitalSign = () => {

    return (
        <>
            <div className="vital-container">
                <div className="row">
                    <div className="col-2">
                        <p>Chiều cao:</p>
                    </div>
                    <div className="col-4">
                        <input type="text" className="input" placeholder="Đơn vị: cm"/>
                    </div>
                    <div className="col-2">
                        <p>Cân nặng:</p>
                    </div>
                    <div className="col-4">
                        <input type="text" className="input" placeholder="Đơn vị: kg"/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-2">
                        <p>Cân nặng con:</p>
                    </div>
                    <div className="col-4">
                        <input type="text" className="input" placeholder="Đơn vị: g"/>
                    </div>
                    <div className="col-2">
                        <p>Mạch:</p>
                    </div>
                    <div className="col-4">
                        <input type="text" className="input" placeholder="Đơn vị: Lần/phút"/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-2">
                        <p>Huyết áp trên:</p>
                    </div>
                    <div className="col-4">
                        <input type="text" className="input" placeholder="Đơn vị: mmHg"/>
                    </div>
                    <div className="col-2">
                        <p>Huyết áp dưới:</p>
                    </div>
                    <div className="col-4">
                        <input type="text" className="input" placeholder="Đơn vị: mmHg"/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-2">
                        <p>Nhiệt độ:</p>
                    </div>
                    <div className="col-4">
                        <input type="text" className="input" placeholder="Đơn vị: oC"/>
                    </div>
                    <div className="col-2">
                        <p>Nhịp thở:</p>
                    </div>
                    <div className="col-4">
                        <input type="text" className="input" placeholder="Đơn vị: Lần/phút"/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-2">
                        <p>Chỉ số đường huyết:</p>
                    </div>
                    <div className="col-4">
                        <input type="text" className="input" placeholder="Đơn vị: mg/dl"/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-10"></div>
                    <div className="col-2">
                        <button className="save-button">Lưu</button>
                    </div>
                </div>
            </div> 
        </>
    )
}

export default VitalSign;