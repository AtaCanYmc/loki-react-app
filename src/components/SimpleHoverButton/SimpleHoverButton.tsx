import React from "react";
import './SimpleHoverButtonStyle.scss'

interface Props {
    className?: string;
    buttonText: string;
    onButtonClick: () => void;
}

export const SimpleHoverButton = (props: Props) => {
    const {
        className = '',
        buttonText,
        onButtonClick,
    } = props;

    return (
        <React.Fragment>
            <div className={`simple-hover-button-container ${className}`}>
                <button onClick={onButtonClick}>
                    {buttonText}
                </button>
            </div>
        </React.Fragment>
    );
};