/* eslint-disable react/prop-types */
import './Header.css';

const Header = ({ title, leftChildren, rightChildren }) => {
    return (
        <header className='Header'>
            <div className='header_left'>{leftChildren}</div>
            <div className='header_center'>{title}</div>
            <div className='header_right'>{rightChildren}</div>
        </header>

    )
}
export default Header;