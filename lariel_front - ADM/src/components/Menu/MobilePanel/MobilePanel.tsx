import { Link } from "react-router-dom";
import { useMenu } from "../hooks/useMenu";
import React, { useEffect, useState } from 'react';
import { FaEnvelopeOpenText ,FaFacebookF, FaInstagram, FaYoutube, FaHome, FaRegCalendarCheck, FaGift, FaRegClock, FaCheckCircle} from 'react-icons/fa';
import type { TipoCasamento } from "../../../types//tipoCasamento";
import dados from "../../../../db.json";
import type { TipoRecadoPendente } from "../../../types/tipoRecadoPendente";

const URL_API = import.meta.env.VITE_URL_API;

export default function MobilePanel(): React.ReactElement {

    const [casamento, setCasamento] = useState<TipoCasamento>();

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
    
    useEffect(() => {
        setCasamento(dados.casamento[0]); 
    }, []);
    const { isOpen, close } = useMenu();

    useEffect(() => {
        if (typeof document !== 'undefined') {
            document.body.style.overflow = isOpen ? 'hidden' : '';
            document.documentElement.style.overflow = "hidden";
        }
        return () => {
            if (typeof document !== 'undefined') {
                document.body.style.overflow = '';
                document.documentElement.style.overflow = "";
            }
        };
        
    }, [isOpen]);
 
    return (
        <div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Menu móvel"
            className={`md:hidden fixed inset-0 z-50 transition-opacity duration-300 p-10 ${
                isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
        >
            <div 
                className={`absolute inset-0  bg-[var(--color-2)] backdrop-blur-sm transition-all duration-500 ${
                    isOpen ? "opacity-100" : "opacity-0"
                }`} 
                onClick={close} 
                aria-hidden
            ></div>
            <div 
                className={`relative z-10 flex flex-col items-center justify-center h-full text-white/90 transition-all duration-500 transform ${
                    isOpen ? "translate-y-0 opacity-100 scale-100" : "translate-y-8 opacity-0 scale-95"
                }`}

            >
                <nav className="overflow-y-auto overflow-x-hidden flex flex-col items-left gap-8" onClick={close}>

                    <Link 
                        to="/" 
                        className="flex items-center gap-3 p-3 rounded-lg transition-all duration-300 hover:bg-white/10 hover:text-blue-400 hover:scale-105 active:scale-95" 
                        role="menuitem"
                    >
                        <FaHome className="text-2xl" />
                        <span>Home</span>
                    </Link>

                    <Link 
                        to="/presenca" 
                        className="flex items-center gap-3 p-3 rounded-lg transition-all duration-300 hover:bg-white/10 hover:text-blue-400 hover:scale-105 active:scale-95" 
                        role="menuitem"
                    >
                        <FaRegCalendarCheck className="text-2xl" />
                        <span>Lista de presença</span>
                    </Link>

                    <Link 
                        to="/convites" 
                        className="flex items-center gap-3 p-3 rounded-lg transition-all duration-300 hover:bg-white/10 hover:text-blue-400 hover:scale-105 active:scale-95" 
                        role="menuitem"
                    >
                        <FaEnvelopeOpenText className="text-2xl" />
                        <span>Convites</span>
                    </Link>

                    <Link 
                        to="/lista_presentes" 
                        className="flex items-center gap-3 p-3 rounded-lg transition-all duration-300 hover:bg-white/10 hover:text-blue-400 hover:scale-105 active:scale-95" 
                        role="menuitem"
                    >
                        <FaGift className="text-2xl" />
                        <span>Lista de presentes</span>
                    </Link>

                    <Link 
                        to="/pendentes_recados" 
                        className="relative flex items-center gap-3 p-3 rounded-lg transition-all duration-300 hover:bg-white/10 hover:text-blue-400 hover:scale-105 active:scale-95"
                        role="menuitem"
                        >
                        <FaRegClock className="text-2xl" />
                        <span>Recados Pendentes</span>

                        {recadosPendentes.length > 0 && (
                            <span className="absolute top-2 right-2 w-3 h-3 bg-red-500 rounded-full border-2 border-white animate-pulse"></span>
                        )}
                    </Link>

                    <Link 
                        to="/aceitos_recados" 
                        className="flex items-center gap-3 p-3 rounded-lg transition-all duration-300 hover:bg-white/10 hover:text-blue-400 hover:scale-105 active:scale-95" 
                        role="menuitem"
                    >
                        <FaCheckCircle className="text-2xl" />
                        <span>Recados aceitos</span>
                    </Link>

                </nav>

                <div className="mt-12 flex items-center gap-8">
                    <Link target="_blank" rel="noopner noreferrer" to={`${casamento?.urlFacebook}`} aria-label="Facebook" className="p-3 rounded-full bg-white/5 transition-all duration-300 hover:bg-blue-500 hover:scale-110 hover:rotate-12 active:scale-95" ><FaFacebookF className="text-xl" /></Link>
                    <Link target="_blank" rel="noopner noreferrer" to={`${casamento?.urlInstagram}`} aria-label="Instagram" className="p-3 rounded-full bg-white/5 transition-all duration-300 hover:bg-blue-500 hover:scale-110 hover:rotate-12 active:scale-95" ><FaInstagram className="text-x" /></Link>
                    <Link target="_blank" rel="noopner noreferrer" to={`${casamento?.ulrYouTube}`} aria-label="YouTube" className="p-3 rounded-full bg-white/5 transition-all duration-300 hover:bg-blue-500 hover:scale-110 hover:rotate-12 active:scale-95" ><FaYoutube className="text-x" /></Link>
                </div>
            </div>
        </div>
    );
}
 

