import type { TipoConvite } from "../../types/tipoConvite";
import logo from "../../images/ImgIndex/logo.png";

export default function CardConvite(props: {convite: TipoConvite}){



    return(
        <div className="text-white bg-gradient-to-br from-[var(--color-2)] via-blue-300 to-[var(--color-2)] hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer rounded-lg border-2 border-[var(--color-2)] hover:bg-gradient-to-br hover:from-[var(--color-3)] hover:via-blue-300 hover:to-[var(--color-3)] p-6">
            <div className="flex flex-col-reverse md:flex-row justify-between items-center">
                <img src={logo}alt="Logo Larissa e Samuel" className="w-15 h-15 md:w-40 md:h-40" />
                <div className="flex flex-col items-center">
                    <h1 className="convite-nome">{props.convite.nomeConvite}</h1>
                    <p className="text-sm">e Família</p>
                    <p className="text-[var(--color-2)] text-0.5rem mt-5">Id do convite: <span className="text-white font-medium">{props.convite.idConvite}</span></p>
                </div>
            </div>        
        </div>
    );
}  