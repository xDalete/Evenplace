import React from 'react';

type DividerProps = {
    className?: string;
    style?: React.CSSProperties;
};

const Divider: React.FC<DividerProps> = ({ className, style }) => (
    <hr
        className={className}
        style={{
            border: 'none',
            borderTop: '1px solid #e0e0e0',
            margin: '16px 0',
            ...style,
        }}
    />
);

export default Divider;