import { useState, useEffect, use } from 'react'
import './App.css'

const URL = "http://localhost:3000/v0/";
const API_OPTIONS = {
  method: 'GET',
  mode: 'cors',
}

function App() {

  const [version, setVersion] = useState(localStorage.getItem('version'));

  const getVersion = async () => {
    try {
      const fullUrl = URL + "Version";
      
      const response = await fetch(fullUrl, API_OPTIONS);
      
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.status}`);
      }
      
      const data = await response.json();
      setVersion(data.version);
    } catch (error) {
      console.error("Error fetching version:", error);
    }
  }

  const fetchAllData = async () => {
    try{
      const HorarioUrl = URL + "Horarios";
      const ClassesUrl = URL + "Classes";
      
      const [horariosResponse, classesResponse] = await Promise.all([
        fetch(HorarioUrl, API_OPTIONS),
        fetch(ClassesUrl, API_OPTIONS)
      ]);

      const horarios = await horariosResponse.json();
      const classes = await classesResponse.json();
      localStorage.setItem('horarios', JSON.stringify(horarios));
      localStorage.setItem('classes', JSON.stringify(classes));
      console.log("All data fetched and stored in localStorage");

    }catch(error) {
      console.error("Error fetching all data:", error);
    }
  }

  useEffect(() => {
    getVersion();
  }, []);

  useEffect(() => {
    if (localStorage.getItem('version') < version){
      localStorage.setItem('version', version);
      fetchAllData();
    }
  }, [version])

  return (
    <>
      <div className="container">
        <h1 className="text-left mx-4">BIENVENIDO A CLASSTRACKER</h1>
        <h2 className="text-left mx-4 my-8">Que deseas buscar?</h2>
        <section className="flex flex-col justify-center items-center">
          <div className="blue-container">Buscar por Aula</div>
          <div className="blue-container">Buscar por Materia</div>
          <div className="blue-container">Buscar por Horario</div>
        </section>
      </div>
    </>
  )
}

export default App
