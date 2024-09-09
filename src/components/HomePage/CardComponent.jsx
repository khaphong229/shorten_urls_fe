import React from 'react';

function CardComponent({ title, color, content }) {
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
    };

    const { bg, border } = colorClasses[color] || colorClasses['blue'];

    return (
        <div className={`md:w-1/4 p-4 rounded-lg ${bg} ${border} border-2`}>
            <h2 className="text-xl font-bold mb-2">{title}</h2>
            <p>{content}</p>
        </div>
    );
}

export default CardComponent;
