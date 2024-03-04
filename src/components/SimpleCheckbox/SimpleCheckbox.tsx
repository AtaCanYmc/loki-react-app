import React from 'react';
import './SimpleCheckboxStyle.scss';

interface Props {
    className?: string;
    checked?: boolean;
    onChange: (isChecked: boolean) => void;
    text: string;
}

export const SimpleCheckbox = (props: Props) => {
    const {
        className = '',
        checked = false,
        onChange,
        text,
    } = props;

    return (
        <React.Fragment>
            <div className={`simple-checkbox-container ${className}`}>
                <label className="simple-checkbox-label">
                    <input type="checkbox"
                           className="simple-checkbox"
                           onChange={(e) => onChange(e.target.checked)}
                           defaultChecked={checked}
                    />
                    {text}
                </label>
            </div>
        </React.Fragment>
    );
};