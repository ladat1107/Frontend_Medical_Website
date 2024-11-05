import './CreateHandbook.scss';

const CreateHandbook = () => {
    return (
        <>
            <div className='create-handbook-container'>
                <div className='row'>
                    <div className='col-1'>
                        <p className='text-bold'>Tiêu đề:</p>
                    </div>
                    <div className='col-6'>
                        <div className="search-container">
                            <i className="fa-solid fa-heading"></i>
                            <input 
                                type="text" 
                                placeholder="Nhập tiêu đề..." />
                        </div>
                    </div>
                </div>
                <div className='row mt-3'>
                    <div className='col-1'>
                        <p className='text-bold'>Tags:</p>
                    </div>
                    <div className='col-6'>
                        <div className="search-container">
                            <i className="fa-solid fa-tag"></i>
                            <input 
                                type="text" 
                                placeholder="Thêm tags..." />
                        </div>
                    </div>
                </div>
                <div className='row mt-3'>
                    <div className='col-1'>
                        <p className='text-bold'>Ảnh bìa:</p>
                    </div>
                    <div className='col-6'>
                        <div className="search-container">
                            <i className="fa-solid fa-image"></i>
                            <input 
                                type="text" 
                                placeholder="Thêm ảnh..." />
                        </div>
                    </div>
                </div>
                <div className='row mt-3'>
                    <div className='col-2'>
                        <p className='text-bold'>Nội dung:</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CreateHandbook;