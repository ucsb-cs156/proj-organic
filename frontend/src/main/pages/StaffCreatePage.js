import React from 'react';
import { useParams } from 'react-router-dom';

export default function StaffCreatePage() {
    const { id } = useParams();
    
    return (
        <div>
            <h1>Placeholder for Staff Creation Page for Course {id}</h1>
            <p>This page will be finished soon.</p>
        </div>
    );
};

