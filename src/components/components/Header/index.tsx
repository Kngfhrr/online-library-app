import './styles.scss'
import React from 'react'
import { AutoComplete, Input, Button } from 'antd'


interface HeaderProps {
    options?: object[]
    getShipment?: ()=>void
    onSelect?: ()=>void
    onSave?: ()=>void
}

const Header: React.FC<HeaderProps> = ({ options, getShipment, onSelect, onSave }) => {
    return (
        <div className="header">
            <a href="/" className="logo">
                Cargo App
            </a>
            <div className="header-right">
                <AutoComplete
                    style={{ width: 400 }}
                    options={options as any}
                    // onSelect={(e: string, o: any) => onSelect(o, e)}
                    filterOption={(inputValue: string, option: any) =>
                        option.value
                            .toUpperCase()
                            .indexOf(inputValue.toUpperCase()) !== -1
                    }
                >
                    <Input.Search placeholder="input here" enterButton />
                </AutoComplete>
                <div className="btns">
                    <Button onClick={getShipment} className="btn">
                        Load
                    </Button>
                    <Button onClick={onSave} className="btn" type="primary">
                        Save
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default Header
