import './styles.scss'
import React from 'react'

interface HeaderProps {
    options?: object[]
    getShipment?: () => void
    onSelect?: () => void
    onSave?: () => void
}

const Header: React.FC<HeaderProps> = ({
    options,
    getShipment,
    onSelect,
    onSave,
}) => {
    return (
        <div className="header">
            <a href="/" className="logo">
                Library app
            </a>
            <div className="header-right"></div>
        </div>
    )
}

export default Header
