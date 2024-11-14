import axios from 'axios';
import CryptoJS from 'crypto-js';  // Thay đổi để sử dụng crypto-js thay vì node's crypto

const apiKey = '424575534218882';  // API Key của bạn
const apiSecret = 'MqsvjIBkugQocqnMvq06M6RJwqk';  // API Secret của bạn (nên bảo mật, không lộ trong mã client)

// Hàm tạo chữ ký (signature)
const generateSignature = (timestamp, folder) => {
    // Chuỗi cần ký bao gồm api_key, timestamp và upload_preset
    const stringToSign = `folder=${folder}&timestamp=${timestamp}&upload_preset=ml_default`;
    return CryptoJS.SHA1(stringToSign + apiSecret).toString(CryptoJS.enc.Hex);  // Kết hợp với apiSecret
};
// Hàm upload ảnh lên Cloudinary
export const uploadToCloudinary = async (file, folder, onProgress) => {
    const timestamp = Math.floor(Date.now() / 1000);
    const signature = generateSignature(timestamp, folder);  // Tạo chữ ký
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "ml_default");  // Dùng preset đã tạo trên Cloudinary
    formData.append("api_key", apiKey);  // API Key của bạn
    formData.append("timestamp", timestamp);  // Thời gian
    formData.append("signature", signature);  // Chữ ký
    formData.append("folder", folder);  // Thư mục lưu trữ ảnh
    try {
        const response = await axios.post(
            "https://api.cloudinary.com/v1_1/degcwwwii/image/upload",  // Thay 'your_cloud_name_here' bằng tên cloud của bạn
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
                onUploadProgress: (progressEvent) => {
                    const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    onProgress(percentCompleted);  // Cập nhật tiến trình upload
                },
            }
        );
        return response.data.secure_url;  // Trả về URL ảnh đã upload
    } catch (error) {
        console.error("Error uploading to Cloudinary:", error.response?.data || error.message);
        throw error;  // Ném lỗi để xử lý ở nơi gọi
    }
};
// Hàm xóa ảnh từ Cloudinary
const deleteImageFromCloudinary = async (publicId) => {
    const timestamp = Math.floor(Date.now() / 1000);
    const signature = generateSignatureDelete(publicId, timestamp);  // Tạo chữ ký
    console.log("publicId", publicId);
    try {
        const response = await axios.post(
            "https://api.cloudinary.com/v1_1/degcwwwii/image/destroy",  // Thay 'degcwwwii' bằng tên cloud của bạn
            {
                public_id: publicId,
                api_key: apiKey,
                timestamp: timestamp,
                signature: signature,
            },
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
        console.log("Ảnh cũ đã được xóa:", response.data);
        return response.data;
    } catch (error) {
        console.error("Lỗi khi xóa ảnh cũ từ Cloudinary:", error.response?.data || error.message);
        throw error;
    }
};
// Hàm tạo chữ ký (signature)
const generateSignatureDelete = (publicId, timestamp) => {
    // Chuỗi cần ký bao gồm public_id, timestamp, api_key và api_secret
    const stringToSign = `public_id=${publicId}&timestamp=${timestamp}`;
    return CryptoJS.SHA1(stringToSign + apiSecret).toString(CryptoJS.enc.Hex);  // Kết hợp với apiSecret
};
export const uploadAndDeleteToCloudinary = async (file, folder, onProgress, oldLink) => {
    const timestamp = Math.floor(Date.now() / 1000);
    const signature = generateSignature(timestamp, folder);  // Tạo chữ ký
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "ml_default");  // Dùng preset đã tạo trên Cloudinary
    formData.append("api_key", apiKey);  // API Key của bạn
    formData.append("timestamp", timestamp);  // Thời gian
    formData.append("signature", signature);  // Chữ ký
    formData.append("folder", folder);  // Thư mục lưu trữ ảnh

    try {
        // Nếu oldLink khác null, xóa ảnh cũ trước
        if (oldLink) {
            const publicId = folder + "/" + oldLink.split('/').pop().split('.')[0];  // Lấy public_id từ URL
            await deleteImageFromCloudinary(publicId);  // Xóa ảnh cũ
        }

        // Upload ảnh mới
        const response = await axios.post(
            "https://api.cloudinary.com/v1_1/degcwwwii/image/upload",  // Thay 'your_cloud_name_here' bằng tên cloud của bạn
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
                onUploadProgress: (progressEvent) => {
                    const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    onProgress(percentCompleted);  // Cập nhật tiến trình upload
                },
            }
        );
        console.log("Upload thành công:", response.data);  // Xem thông tin trả về từ Cloudinary
        return response.data.secure_url;  // Trả về URL ảnh đã upload
    } catch (error) {
        console.error("Lỗi khi upload ảnh lên Cloudinary:", error.response?.data || error.message);
        throw error;  // Ném lỗi để xử lý ở nơi gọi
    }
};
