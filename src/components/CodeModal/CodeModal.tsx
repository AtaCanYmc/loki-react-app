import React from 'react';
import './CodeModalStyle.scss';

interface Props {
    headerText?: string;
    codeText: string;
}

export const CodeModal = (props: Props) => {
    const {
        headerText = '-> Code',
        codeText
    } = props;

    return (
        <React.Fragment>
            <div className={"code-modal-container"}>
                <div className="code-editor">
                    <div className="header">
                        <span className="title">
                            {headerText}
                        </span>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="icon">
                            <g stroke-width="0" id="SVGRepo_bgCarrier"></g>
                            <g stroke-linejoin="round" stroke-linecap="round" id="SVGRepo_tracerCarrier"></g>
                            <g id="SVGRepo_iconCarrier">
                                <path stroke-linecap="round" stroke-width="2" stroke="#4C4F5A" d="M6 6L18 18"></path>
                                <path stroke-linecap="round" stroke-width="2" stroke="#4C4F5A" d="M18 6L6 18"></path>
                            </g>
                        </svg>
                    </div>
                    <div className="editor-content">
                        <code className="code">
                            {codeText}
                        </code>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};