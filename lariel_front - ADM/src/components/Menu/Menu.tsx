import { Link } from "react-router-dom";
 
export default function Menu(){
    return(
        <nav className="flex items-center gap-8">
            <Link to="/" className="text-white hover:text-blue-200 transition-colors duration-200 font-medium">Home</Link>
            <Link to="/presenca" className="text-white hover:text-blue-200 transition-colors duration-200 font-medium">Lista de presença</Link>
            <Link to="/convites" className="text-white hover:text-blue-200 transition-colors duration-200 font-medium">Convites</Link>
            <Link to="/lista_presentes" className="text-white hover:text-blue-200 transition-colors duration-200 font-medium">Lista de presentes</Link>
            <Link to="/aceitos_recados" className="text-white hover:text-blue-200 transition-colors duration-200 font-medium">Recados aceitos</Link>
            <Link to="/pendentes_recados" className="text-white hover:text-blue-200 transition-colors duration-200 font-medium">Recados pendentes</Link>
        </nav>
    );
} 