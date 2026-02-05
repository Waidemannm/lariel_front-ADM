import Menu from "../Menu/Menu";
import { MenuProvider } from "../Menu/context/MenuContext";
import HamburgerButton from "../Menu/HamburgerButton/HamburgerButton";
import MobilePanel from "../Menu/MobilePanel/MobilePanel";
import logo from "../../images/ImgIndex/logo.png";
import { useEffect, useState } from "react";
import type { TipoCasamento } from "../../types/tipoCasamento";
import dados from "../../../db.json";

export default function Cabecalho () {

    const [casamento, setCasamento] = useState<TipoCasamento>();
    
    useEffect(() => {
        setCasamento(dados.casamento[0]); 
    }, []);

    return (
    <header  className="sticky top-0 z-50 w-full z-50 flex items-center justify-between bg-gradient-to-r from-[var(--color-2)] to-[var(--color-2)] text-white shadow-lg md:flex-col  xl:flex-row">
        <div className="flex items-center">
            <h1 className="text-2xl font-bold flex items-center">
                <img src={logo}alt="Logo Larissa e Samuel" className="w-30 h-30" />
            </h1>
        </div>
        <MenuProvider>
            <div className="flex items-center p-5 gap-4">
                <div className="hidden md:block">
                    <Menu />
                </div>
                <div className="md:hidden">
                    <HamburgerButton className="text-white hover:bg-white/20" />
                </div>
            </div>
            <MobilePanel />
        </MenuProvider>
    </header>
)
};