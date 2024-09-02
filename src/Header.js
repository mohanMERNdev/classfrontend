import React from 'react';
import { Link } from 'react-router-dom';

class Header extends React.Component {
    render() {
        return (
            <nav className="bg-blue-700 p-4 text-white">
                <ul className="flex justify-between">
                    <li>
                        <Link to="/dashboard" className="hover:text-gray-300">Dashboard</Link>
                    </li>
                    <li>
                        <Link to="/login" className="hover:text-gray-300">Login</Link>
                    </li>
                </ul>
            </nav>
        );
    }
}

export default Header;
