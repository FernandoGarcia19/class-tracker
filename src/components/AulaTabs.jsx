import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { useDataContext } from '../context/DataContext';

function loadAulas(index, aulas) {
  switch (index) {
    case 0:
      return Array.from(aulas).sort();
    case 1:
      return Array.from(aulas).filter(aula => aula.startsWith('A')).sort();
    case 2:
      return Array.from(aulas).filter(aula => aula.startsWith('B')).sort();
    case 3:
      return Array.from(aulas).filter(aula => aula.startsWith('L')).sort();
    default:
      return [];
  }
}

function AulaTabs(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

AulaTabs.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function AulaTabsPanel() {
  const [value, setValue] = React.useState(0);
  
  try {
    const { clasesMap, horariosMap } = useDataContext();
    
    console.log('clasesMap:', clasesMap);
    console.log('horariosMap:', horariosMap);
    
    if (!horariosMap) {
      return <div>Loading...</div>;
    }
    
    const aulas = new Set(Array.from(horariosMap.values()).map(c => c.aula).filter(aula => aula && aula.trim() !== 'SINAULA'));
    
    console.log('aulas:', aulas);
    
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };

    return (
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
            <Tab label="Todos" {...a11yProps(0)} />
            <Tab label="Bloque A" {...a11yProps(1)} />
            <Tab label="Bloque B" {...a11yProps(2)} />
            <Tab label="Laboratorios" {...a11yProps(3)} />
          </Tabs>
        </Box>
        <AulaTabs value={value} index={0}>
          <div className="content-box">
            {
              loadAulas(0, aulas).map((aula, index) => (
                <div key={index}>
                  {aula}
                </div>
              ))
            }
          </div>
        </AulaTabs>
        <AulaTabs value={value} index={1}>
          <div className="content-box">
            {
              loadAulas(1, aulas).map((aula, index) => (
                <div key={index}>
                  {aula}
                </div>
              ))
            }
          </div>
        </AulaTabs>
        <AulaTabs value={value} index={2}>
          <div className="content-box">
            {
              loadAulas(2, aulas).map((aula, index) => (
                <div key={index}>
                  {aula}
                </div>
              ))
            }
          </div>
        </AulaTabs>
        <AulaTabs value={value} index={3}>
          <div className="content-box">
            {
              loadAulas(3, aulas).map((aula, index) => (
                <div key={index}>
                  {aula}
                </div>
              ))
            }
          </div>
        </AulaTabs>
      </Box>
    );
  } catch (error) {
    console.error('Error in AulaTabsPanel:', error);
    return <div>Error loading component: {error.message}</div>;
  }
}