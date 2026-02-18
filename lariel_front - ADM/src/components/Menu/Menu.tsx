import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import type { TipoRecadoPendente } from "../../types/tipoRecadoPendente";
 
const URL_API = import.meta.env.VITE_URL_API;

export default function Menu(){

    const [recadosPendentes, setRecadosPendentes] = useState<TipoRecadoPendente[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchRecadosPendentes = async () => {
        try {
            const response = await fetch(`${URL_API}/pendentes`);
            if (!response.ok) {
            throw new Error("Falha ao buscar os dados. O servidor está online?");
            }
            const data: TipoRecadoPendente[] = await response.json();
            setRecadosPendentes(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Um erro inesperado ocorreu.");
        } 
        };
        fetchRecadosPendentes();
    }, []);
    

    return(
        <nav className="flex items-center gap-8">
            <Link to="/" className="text-white hover:text-blue-200 transition-colors duration-200 font-medium">Home</Link>
            <Link to="/presenca" className="text-white hover:text-blue-200 transition-colors duration-200 font-medium">Lista de presença</Link>
            <Link to="/convites" className="text-white hover:text-blue-200 transition-colors duration-200 font-medium">Convites</Link>
            <Link to="/lista_presentes" className="text-white hover:text-blue-200 transition-colors duration-200 font-medium">Lista de presentes</Link>
            <Link to="/aceitos_recados" className="text-white hover:text-blue-200 transition-colors duration-200 font-medium">Recados aceitos</Link>
            <Link to="/pendentes_recados" className="relative text-white hover:text-blue-200 transition-colors duration-200 font-medium"> Recados pendentes{recadosPendentes.length > 0 && ( <span className="absolute -top-1 -right-2 w-3 h-3 bg-red-500 rounded-full border-2 border-white animate-pulse"></span>)}</Link>
        </nav>
    );
} 