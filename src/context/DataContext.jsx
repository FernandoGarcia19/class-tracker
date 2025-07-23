import { createContext, useContext, useEffect, useState } from "react";

const URL = "http://localhost:3000/v0/";
const API_OPTIONS = {
  method: 'GET',
  mode: 'cors',
}


const DataContext = createContext(null);

export const useDataContext = () => {
  const ctx = useContext(DataContext);
  if (!ctx) throw new Error("useDataContext must be used inside a DataProvider");
  return ctx;
};

export const DataProvider = ({ children }) => {
    const [clasesMap, setClasesMap] = useState(new Map());
    const [horariosMap, setHorariosMap] = useState(new Map());
    const [dataLoaded, setDataLoaded] = useState(false);
    const fetchAllData = async () => {
    try {
        const HorarioUrl = URL + "Horarios";
        const ClassesUrl = URL + "Classes";

        const [horariosRes, clasesRes] = await Promise.all([
            fetch(HorarioUrl, API_OPTIONS),
            fetch(ClassesUrl, API_OPTIONS),
        ]);

        const horarios = await horariosRes.json();
        const clases = await clasesRes.json();

        // Save to localStorage
        localStorage.setItem("horarios", JSON.stringify(horarios));
        localStorage.setItem("clases", JSON.stringify(clases));

        // Create maps
        setClasesMap(new Map(clases.map(c => [c._id, c])));
        setHorariosMap(new Map(horarios.map(h => [h._id, h])));
        setDataLoaded(true);

        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };
    useEffect(() => {
        const checkAndLoadData = async () => {
            try {
            const versionRes = await fetch(URL + "Version", API_OPTIONS);
            const { version: newVersion } = await versionRes.json();

            const localVersion = parseInt(localStorage.getItem("version") || "0");
            console.log("Current version:", localVersion, "New version:", newVersion);

            if (newVersion > localVersion) {
                console.log("New data version available. Fetching fresh data...");
                await fetchAllData(); 
                localStorage.setItem("version", newVersion);
            } else {
                const storedClases = JSON.parse(localStorage.getItem("classes") || "[]");
                const storedHorarios = JSON.parse(localStorage.getItem("horarios") || "[]");

                if (storedClases.length && storedHorarios.length) {
                setClasesMap(new Map(storedClases.map(c => [c._id, c])));
                setHorariosMap(new Map(storedHorarios.map(h => [h._id, h])));
                setDataLoaded(true);
                console.log("Loaded data from cache (version is current).");
                }
            }
            } catch (err) {
            console.error("Error checking version or loading data:", err);
            }
        };

        checkAndLoadData();
    }, []);



  return (
    <DataContext.Provider value={{ clasesMap, horariosMap, fetchAllData, dataLoaded }}>
      {children}
    </DataContext.Provider>
  );
};

