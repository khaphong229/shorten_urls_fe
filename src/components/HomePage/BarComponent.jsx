import React from 'react';

function BarComponent({ color, icon, content }) {
    const colorClasses = {
        purple: {
            bg: 'bg-purple-50',
            border: 'border-purple-200',
        },
        yellow: {
            bg: 'bg-yellow-50',
            border: 'border-yellow-200',
        },
        blue: {
            bg: 'bg-blue-50',
            border: 'border-blue-200',
        },
        green: {
            bg: 'bg-green-50',
            border: 'border-green-200',
        },
        red: {
            bg: 'bg-red-50',
            border: 'border-red-200',
        },
    };

    const { bg, border } = colorClasses[color];
    return (
        <div className="flex flex-row gap-x-4 items-center mb-2">
            <div
                className={`w-10 h-10 p-2 rounded-lg ${bg} ${border} border-2`}
            >
                {icon}
            </div>
            <p>{content}</p>
        </div>
    );
}

export default BarComponent;
