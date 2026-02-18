import { useState } from "react";
import logo from "../../images/ImgIndex/logo.png";
import type { TipoRecadoPendente } from "../../types/tipoRecadoPendente";
import RecadoRecusar from "../RecadoRecusar/RecadoRecusar";
import RecadoAceitar from "../RecadoAceitar/RecadoAceitar";

export default function CardRecadoPendentes (props: {recado: TipoRecadoPendente}) {

    const [openRecusarRecado, setOpenRecusarRecado] = useState(false);
    const [openAceitarRecado, setOpenAceitarRecado] = useState(false);
    return(
    <div className="text-white bg-[var(--color-2)] hover:transition-all duration-300 rounded-lg border-2 border-[var(--color-2)] p-6 break-all w-full">
        <div className="flex flex-col-reverse justify-between">
            <div className="flex justify-between items-center mt-5">
                <div className="">
                    <button className="bg-red-400 cursor-pointer rounded-xl border-2 border-red-400 font-medium w-20 md:w-25 h-13" onClick={() => setOpenRecusarRecado(true)}>Recusar</button>
                    <RecadoRecusar open={openRecusarRecado} onClose={() => setOpenRecusarRecado(false)} idRecado={props.recado.idRecadoPendente}> </RecadoRecusar>
                </div>
                <img src={logo}alt="Logo Larissa e Samuel" className="w-23 h-auto md:w-30" />
                <div className="convite-deletar">
                    <button className="bg-red-400 cursor-pointer rounded-xl border-2 border-red-400 font-medium w-20 md:w-25 h-13" onClick={() => setOpenAceitarRecado(true)}>Aceitar</button>
                    <RecadoAceitar open={openAceitarRecado} onClose={() => setOpenAceitarRecado(false)} mensagem={props.recado.mensagem} nomeConvidado={props.recado.nomeConvidados}> </RecadoAceitar>
                </div>
            </div>
            <p>Id recado: {props.recado.idRecadoPendente}</p>
            <hr className="border-t border-white mt-10" />
            <div className="flex flex-col ">
                <h1 className="font-bold text-2xl">{props.recado.nomeConvidados}</h1>
                <p className="text-white">{props.recado.dataMensagem}</p> 
                <hr className="border-t border-white mb-10 mt-2" />
                <p className="text-white font-medium">{props.recado.mensagem}</p>
            </div>
        </div>        
    </div>
    );
}

