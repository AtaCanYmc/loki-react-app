import React from 'react';
import lokiImage from '../../images/loki/loki.png';

interface Props {
    width?: number;
    height?: number;
}

export const LokiImage = (props: Props) => {
    const {
        width = 200,
        height = 200
    } = props;

    return (
        <React.Fragment>
            <img src={lokiImage}
                 alt="Loki"
                 className="loki-image"
                 width={width}
                 height={height}
            />
        </React.Fragment>
    );
};