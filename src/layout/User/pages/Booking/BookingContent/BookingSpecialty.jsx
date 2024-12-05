import { Input } from 'antd';
import '../Booking.scss';
import { SearchOutlined } from '@mui/icons-material';
import userService from '@/services/userService';
import { useEffect, useState } from 'react';
import useDebounce from '@/hooks/useDebounce';

const BookingSpecialty = (props) => {
    let [listSpecialty, setListSpecialty] = useState([]);
    let [search, setSearch] = useState('');
    let searchDebounce = useDebounce(search, 500);;
    useEffect(() => {
        fetchSpecialty();
    }, [searchDebounce]);
    let fetchSpecialty = async () => {
        let response = await userService.getSpecialty({ search: searchDebounce });
        if (response.data.EC === 0) {
            setListSpecialty(response.data.DT);
        }
    }
    let handleChangeSearch = (event) => {
        setSearch(event.target.value);
    }
    return (
        <div>
            <Input
                onChange={(e) => handleChangeSearch(e)}
                style={{ height: '40px', borderRadius: '5px', }}
                placeholder="Tìm nhanh chuyên khoa hoặc triệu chứng"
                suffix={<SearchOutlined />}
            />
            <div className="specialty-list mt-3">
                {listSpecialty?.length > 0 && listSpecialty.map((specialty, index) => (
                    <div key={index} className="specialty-item" onClick={() => props.onClick(specialty)}>
                        <strong>{specialty.name}</strong>
                        {specialty?.shortDescription && (
                            <div className="description"><span style={{ color: '#FFA500', fontWeight: 600 }}>Triệu chứng: </span>{specialty.shortDescription}</div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
export default BookingSpecialty;