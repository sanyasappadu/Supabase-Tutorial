// src/ThemedComponent.js
import React, { useContext } from 'react';
import { ThemeContext } from './ThemeContext';

const ThemedComponent = () => {
    const { theme, toggleTheme } = useContext(ThemeContext);

    return (
        <div style={{ 
            background: theme === 'light' ? '#fff' : '#333', 
            color: theme === 'light' ? '#333' : '#fff', 
            padding: '20px',
            textAlign: 'center'
        }}>
            <h2>Themed Component</h2>
            <p>Current Theme: {theme}</p>
            <button onClick={toggleTheme}>Toggle Theme</button>
        </div>
    );
};

export default ThemedComponent;