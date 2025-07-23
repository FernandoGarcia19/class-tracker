
import { Link } from 'react-router-dom';
import { useDataContext } from './context/DataContext'; // 👈 use the hook

function App() {
  const { dataLoaded } = useDataContext();

  if (!dataLoaded) {
    return <div className="p-4 text-lg">Cargando datos...</div>;
  }

  return (
    <div className="flex items-center justify-center">
      <div className="container">
        <h1 className="text-left mx-4">BIENVENIDO A CLASSTRACKER</h1>
        <h2 className="text-left mx-4 my-8">¿Qué deseas buscar?</h2>
        <section className="flex flex-col justify-center items-center">
          <Link to={"/browse-aula"} className="blue-container">
            <div>Buscar por Aula</div>
          </Link>
          <div className="blue-container">Buscar por Materia</div>
          <div className="blue-container">Buscar por Horario</div>
        </section>
      </div>
    </div>
  );
}

export default App;
