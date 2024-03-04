import React from 'react';
import {types} from "sass";
import './SimpleTableWithButtonColumnStyle.scss';

interface Props {
    className?: string;
    columns: Array<string>;
    buttonColumnText?: string;
    data?: Array<Record<string, any>>;
    buttons?: Array<React.ReactNode>;
}

export const SimpleTableWithButtonColumn = (props: Props) => {
    const {
        className = '',
        columns,
        buttonColumnText = 'Action',
        data = [],
        buttons = [],
    } = props;

    return (
        <React.Fragment>
            <div className={`simple-table-with-button-column-container ${props.className}`}>
                <table>
                    <thead>
                    <tr>
                        {columns.map((column, index) => {
                            return (
                                <th key={index}>
                                    {column}
                                </th>
                            );
                        })}
                        {(buttons.length !== 0) && <th>
                            {buttonColumnText}
                        </th>}
                    </tr>
                    </thead>
                    <tbody>
                    {data.map((row, rowIndex) => {
                        return (
                            <tr key={rowIndex}>
                                {Object.keys(row).map((key, keyIndex) => {
                                    return (
                                        <td key={keyIndex}>
                                            {row[key]}
                                        </td>
                                    );
                                })}
                                {(buttons.length !== 0) && <td>
                                    {buttons.map((button, buttonIndex) => {
                                        return (
                                            <div key={buttonIndex}>
                                                {button}
                                            </div>
                                        );
                                    })}
                                </td>}
                            </tr>
                        );
                    })}
                    </tbody>
                </table>
            </div>
        </React.Fragment>
    );
};