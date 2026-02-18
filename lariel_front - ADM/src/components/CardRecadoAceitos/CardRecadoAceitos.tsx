import logo from "../../images/ImgIndex/logo.png";
import type { TipoRecadoAceito } from "../../types/tipoRecadoAceito";

export default function CardRecadoAceitos (props: {recadoAceitos: TipoRecadoAceito}) {

    return(
    <div className="text-white bg-[var(--color-2)] hover:-translate-y-1 transition-all duration-300 rounded-lg border-2 border-[var(--color-2)] p-6 break-all w-full">
        <div className="flex flex-col-reverse justify-between">
            <p>Id recado: {props.recadoAceitos.idRecadoAceito}</p>
            <div className="flex justify-center mt-5"><img src={logo}alt="Logo Larissa e Samuel" className="w-23 h-auto md:w-30" /></div>
            <hr className="border-t border-white mt-10" />
            <div className="flex flex-col ">
                <h1 className="font-bold text-2xl">{props.recadoAceitos.nomeConvidados}</h1>
                <p className="text-white">{props.recadoAceitos.dataMensagem}</p> 
                <hr className="border-t border-white mb-10 mt-2" />
                <p className="text-white font-medium">{props.recadoAceitos.mensagem}</p>
            </div>
        </div>        
    </div>
    );
}

