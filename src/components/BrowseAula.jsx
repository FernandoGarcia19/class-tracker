import { useState } from 'react'
import { useDataContext } from '../context/DataContext';
import { Tabs, Tab } from '@mui/material';
import  AulaTabsPanel from './AulaTabs.jsx';

const BrowseAula = () => {
    
    return (
        <>
            <div className = "container">
                <h1 className="text-left mx-4">Buscar por Aula</h1>
                <AulaTabsPanel></AulaTabsPanel>
            </div>
        </>
    )
}

export default BrowseAula;