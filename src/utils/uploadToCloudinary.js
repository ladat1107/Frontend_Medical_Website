// // src/utils/cloudinaryUpload.js
// import axios from "axios";
// const uploadToCloudinary = async (file) => {
//     const formData = new FormData();
//     formData.append("file", file);
//     formData.append("upload_preset", "presetMedicalWebsite"); // Dùng upload preset từ .env
//     // formData.append("folder", `ProjectMedicalWebsite/Department`); // Thư mục lưu trữ ảnh}`);
//     try {
//         const response = await axios.post(
//             `https://api.cloudinary.com/v1_1/degcwwwii/image/upload`, // Đường dẫn API upload ảnh
//             formData,
//             {
//                 headers: {
//                     "Content-Type": "multipart/form-data",
//                 },
//             }
//         );
//         return response.data.secure_url; // Trả về URL ảnh sau khi upload thành công
//     } catch (error) {
//         console.error("Error uploading to Cloudinary:", error);
//         throw error; // Ném lỗi để có thể xử lý trong component
//     }
// };

// export default uploadToCloudinary;

import axios from "axios";

const uploadToCloudinary = async (file, onProgress) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "presetMedicalWebsite"); // Dùng upload preset từ .env

    try {
        const response = await axios.post(
            `https://api.cloudinary.com/v1_1/degcwwwii/image/upload`, // Đường dẫn API upload ảnh
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
                onUploadProgress: (progressEvent) => {
                    const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    onProgress(percentCompleted); // Cập nhật tiến trình
                },
            }
        );
        return response.data.secure_url; // Trả về URL ảnh sau khi upload thành công
    } catch (error) {
        console.error("Error uploading to Cloudinary:", error);
        throw error; // Ném lỗi để có thể xử lý trong component
    }
};

export default uploadToCloudinary;
