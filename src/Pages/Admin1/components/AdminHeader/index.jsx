import { NavLink, useNavigate } from "react-router-dom";
import "./AdminHeader.scss";
const AdminHeader = () => {
    return (

        <nav className="navbar navbar-expand-lg bg-body-tertiary w-100 mb-5">
            <div className="container-fluid">
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="navbar-collapse" id="navbarSupportedContent">
                    {/* <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <NavLink className="nav-link active" aria-current="page" href="#">Home</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" href="#">Link</NavLink>
                            </li>
                            <li className="nav-item dropdown">
                                <NavLink className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Dropdown
                                </NavLink>
                                <ul className="dropdown-menu">
                                    <li><NavLink className="dropdown-item" href="#">Action</NavLink></li>
                                    <li><NavLink className="dropdown-item" href="#">Another action</NavLink></li>
                                    <li><hr className="dropdown-divider" /></li>
                                    <li><NavLink className="dropdown-item" href="#">Something else here</NavLink></li>
                                </ul>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link disabled" aria-disabled="true">Disabled</NavLink>
                            </li>
                        </ul> */}

                </div>
                <form className="d-flex align-items-end" role="search">
                    <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                    <button className="btn btn-outline-success" type="submit">Search</button>
                </form>
            </div>
        </nav>

    );
}

export default AdminHeader;