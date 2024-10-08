
import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { Controller, useForm } from "react-hook-form";
import { GENDER, TABLE } from '@/constant/value';
import { message } from "antd";
import { Select } from "antd";
import { deleteUser, blockUser } from "@/services/adminService";
import "./Modal.scss"
import Input from '../Input/index';
import { MESSAGE, REGEX } from '@/constant/validate';
import useAddress from '@/hooks/useAddress';
import { ALL_ROLE } from '@/constant/role';
import removeVietnameseAccent from '@/utils/removeAccent';

const CreateUser = (props) => {

    let [messageContent, setMessageContent] = useState("")
    let [gender, setGender] = useState(0);
    let [position, setPosition] = useState(0);

    let optionGender = GENDER;
    let optionPosition = ALL_ROLE;


    //Khởi tạo useForm
    let { register, handleSubmit, control, watch, formState: { errors, isSubmitted } } = useForm();
    const password = watch("password");
    const {
        provinceId,
        districtId,
        wardId,
        provinces,
        districts,
        wards,
        handleDistrictChange,
        handleProvinceChange,
        handleWardChange,
    } = useAddress();


    // Hàm xử lý khi submit thành công
    const onSubmit = (data) => {
        console.log("data");
        console.log("data", data);

    };
    const handleClose = () => {
        props.isShow(false)
    }
    useEffect(() => {
        if (props.table === TABLE.USER) {
            setMessageContent("Mở")
        }
    }, [props])

    let handleCreateUser = async () => {
        if (props.table === TABLE.USER) {
            // let response = await deleteUser(data);
            // if (response && response.data && response.data.EC === 0) {
            //     message.success(response.data.EM);
            //    
            //     props.refresh()
            // } else {
            //     message.error(response.data.EM);
            // }
            props.isShow(false)
        }
    }
    console.log("check gander: ", optionGender)
    return (
        <>
            <Modal
                show={props.show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                size='xl'
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>Thêm người dùng</Modal.Title>
                </Modal.Header>
                <form onSubmit={handleSubmit(onSubmit)} >
                    <Modal.Body>
                        <div className='row'>
                            <Input
                                label="Email"
                                col="col-lg-4"
                                placeholder="Nhập email"
                                required
                                {...register("email", {
                                    required: MESSAGE.required,
                                    pattern: {
                                        value: REGEX.email,
                                        message: MESSAGE.email,
                                    },
                                })}
                                error={errors?.email?.message || ""}
                            />
                            <Input
                                label="Số điện thoại"
                                type="number"
                                col="col-lg-4"
                                placeholder="Nhập số điện thoại"
                                required
                                {...register("phoneNumber", {
                                    required: MESSAGE.required,
                                })}
                                error={errors?.phoneNumber?.message || ""}
                            />
                            <Input
                                label="Căn cước công dân"
                                col="col-lg-4"
                                required
                                {...register("cid", {
                                    required: MESSAGE.required,
                                })}
                                error={errors?.cid?.message || ""}
                            />
                        </div>
                        <div className='row'>
                            <Input
                                label="Họ và tên"
                                col="col-lg-4"
                                placeholder="Nhập họ và tên"
                                required
                                {...register("name", {
                                    required: MESSAGE.required,
                                })}
                                error={errors?.name?.message || ""}
                            />
                            <Input
                                label="Nhập mật khẩu"
                                type="password"
                                col="col-lg-4"
                                placeholder="Nhập mật khẩu"
                                required
                                {...register("password", {
                                    required: MESSAGE.required,
                                })}
                                error={errors?.password?.message || ""}
                            />
                            <Input
                                label="Nhập lại mật khẩu"
                                type="password"
                                col="col-lg-4"
                                required
                                {...register("confirmPassword", {
                                    required: MESSAGE.required,
                                    validate: (value) => value === password || "Passwords do not match",
                                })}
                                error={errors?.confirmPassword?.message || ""}
                            />
                        </div>
                        <div className='row'>
                            <Input
                                label="Ngày sinh"
                                type="date"
                                col="col-lg-4"
                                required
                                {...register("dob", {
                                    required: MESSAGE.required,
                                })}
                                error={errors?.dob?.message || ""}
                            />

                            <div className="col-lg-4">
                                <Controller
                                    name="gender"
                                    control={control}
                                    rules={{ required: MESSAGE.required }}
                                    render={({ field, formState: { errors } }) => (
                                        <>
                                            <label>Giới tính</label>
                                            <Select
                                                className=""
                                                suffixIcon={<></>}
                                                showSearch
                                                placeholder="Chọn giới tính"
                                                optionFilterProp="children"
                                                // value={field.value}
                                                onChange={(value) => {
                                                    field.onChange(value);
                                                    console.log("value", value)
                                                    //setGender(value); // Cập nhật giá trị giới tính
                                                }}
                                                filterOption={(input, option) => {
                                                    return removeVietnameseAccent(option?.label ?? "")
                                                        .toLowerCase()
                                                        .includes(
                                                            removeVietnameseAccent(input).toLowerCase()
                                                        );
                                                }}
                                                options={optionGender} //.map(g => ({ label: g.value, value: g.id }))
                                            />
                                            <p className="form-error" style={{ minHeight: 23, marginTop: "10px" }}>
                                                {errors?.gender?.message}
                                            </p>
                                        </>
                                    )}
                                />
                            </div>
                        </div>

                        <Select
                            className=""
                            suffixIcon={<></>}
                            showSearch
                            defaultValue="Nam"
                            placeholder="Chọn giới tính"
                            optionFilterProp="children"
                            // value={field.value}
                            onChange={(value) => {
                                field.onChange(value);
                                console.log("value", value)
                                //setGender(value); // Cập nhật giá trị giới tính
                            }}
                            filterOption={(input, option) => {
                                return removeVietnameseAccent(option?.label ?? "")
                                    .toLowerCase()
                                    .includes(
                                        removeVietnameseAccent(input).toLowerCase()
                                    );
                            }}
                            options={optionGender} //.map(g => ({ label: g.value, value: g.id }))
                        />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Đóng
                        </Button>

                        <Button type='submit' variant="primary" onClick={() => { handleSubmit(onSubmit) }}>Thêm</Button>
                    </Modal.Footer>
                </form>
            </Modal >
        </>
    );
};

export default CreateUser;