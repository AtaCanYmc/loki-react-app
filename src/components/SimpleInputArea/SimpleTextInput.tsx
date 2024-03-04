import React from 'react';
import './SimpleTextInputStyle.scss';

interface Props {
    className?: string;
    required?: boolean;
    labelText: string;
    onChange: (value: string) => void;
}

export const SimpleTextInput = (props: Props) => {
    const {
        onChange,
        required = true,
        className = '',
        labelText,
    } = props;

    return (
        <React.Fragment>
            <div className={`simple-text-input ${className}`}>
                <div className="inputbox">
                    <span>{labelText}</span>
                    <input required={required}
                           type="text"
                           onChange={(e) => onChange(e.target.value)}
                    />
                    <i></i>
                </div>
            </div>

        </React.Fragment>
    );
};