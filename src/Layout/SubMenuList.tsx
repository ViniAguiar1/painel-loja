import React from 'react'
import { Link } from 'react-router-dom'

const SubMenuList = () => {
    return (
        <React.Fragment>
            <div className="pc-submenu-list-wrapper">
                <ul className="pc-submenu-list list-unstyled mb-0">
                    <li><Link className="active" to="#">Compact</Link></li>
                    <li><Link to="#">Creative</Link></li>
                    <li><Link to="#">Horizontal</Link></li>
                    <li><Link to="#">Tab</Link></li>
                    <li><Link to="#">Vertical</Link></li>
                    <li><Link to="#">Layout 3</Link></li>
                </ul>
            </div>
        </React.Fragment>
    )
}

export default SubMenuList