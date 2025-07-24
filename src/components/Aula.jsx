import { useDataContext } from "../context/DataContext";
import { useState, useMemo } from "react";
import { useParams } from "react-router-dom";

const Aula = () => {
    const { aula } = useParams();
    const aulaName = decodeURIComponent(aula);
    const { clasesMap, horariosMap } = useDataContext();

    
    const horarios = useMemo(() => {
        return Array.from(horariosMap.values()).filter(horario => horario.aula === aulaName);
    }, [horariosMap, aulaName]);

    
    const timePeriods = useMemo(() => [
        "7:15 - 8:45",
        "9:00 - 10:30", 
        "10:45 - 12:15",
        "12:30 - 14:00",
        "14:15 - 15:45",
        "16:00 - 17:30",
        "17:45 - 19:15",
        "19:30 - 21:00"
    ], []);

    const days = useMemo(() => ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sabado"], []);

    
    const horariosLookup = useMemo(() => {
        const lookup = new Map();
        horarios.forEach(horario => {
            const key = `${horario.dia}-${horario.horas}`;
            lookup.set(key, horario);
        });
        return lookup;
    }, [horarios]);

    // Extract cell component for better separation of concerns
    const ScheduleCell = ({ day, period }) => {
        const horario = horariosLookup.get(`${day}-${period}`);
        
        if (!horario) {
            return <span className="text-gray-400">-</span>;
        }

        const clase = clasesMap.get(horario.classId);
        return (
            <div>
                <div className="font-semibold">{clase?.sigla}</div>
            </div>
        );
    };

    return (
        <div className="container">
            <h1 className="text-left mx-4">Aula {aulaName}</h1>
            <table className="table-fixed mt-5 text-center">
                <thead>
                    <tr>
                        <th className="p-4">Periodo</th>
                        {days.map(day => (
                            <th key={day} className="p-4">{day}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {timePeriods.map(period => (
                        <tr key={period}>
                            <td className="p-4">{period}</td>
                            {days.map(day => (
                                <td key={`${day}-${period}`} className="p-4">
                                    <ScheduleCell day={day} period={period} />
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Aula;