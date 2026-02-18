import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import type { TipoRecadoAceito } from "../../types/tipoRecadoAceito";

const URL_API = import.meta.env.VITE_URL_API;

export default function RecadoAceitar({open,  onClose, children, mensagem, nomeConvidado, idRecado}: {open: boolean; onClose: () => void; children: React.ReactNode; mensagem: string; nomeConvidado: string; idRecado: number}){

    const navigate = useNavigate();
    const [loading, setLoading] = useState<boolean>(false);
    const {handleSubmit} = useForm<TipoRecadoAceito>();

    const recadoAceito = {
        mensagem: mensagem,
        nomeConvidados: nomeConvidado
    }
    
    const onSubmit = handleSubmit(async () => {
        try{
            setLoading(true);
            const response = await fetch(`${URL_API}/aceitos`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(recadoAceito),
            });
            const responseDelete = await fetch(`${URL_API}/pendentes/${idRecado}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (!response.ok) {
            throw new Error("Falha ao aceitar recado.");
            }

            if (!responseDelete.ok) {
            throw new Error("Falha ao aceitar recado.");
            }
            alert("Recado aceito com sucesso!");
            navigate(`/pendentes_recados`);
            window.location.reload();
            setLoading(false);
        } catch (err) {
            alert("Falha ao aceitar recado!");
        } finally {
            setLoading(false);
        }
    });

    return(
        <>
        {loading && (
            <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/60"><p className="text-white text-lg font-medium">Aceitando convidado...</p></div>
        )}
            <div className={`fixed w-full md:mt-20 inset-0 flex justify-center items-center transition-colors ${open ? "visible bg-black/90" : "invisible"}`}>
                <div className={`bg-white text-[var(--color-font-black)] rounded-lg shadow p-6 transition-all w-70 md:w-100 ${open ? "scale-100 opacity-100": "scale-110 opacity-0"}`} onClick={(e) => e.stopPropagation()}>
                <button className="absolute top-2 right-2 rounded-md text-blue-500 m-1" onClick={onClose}>Fechar</button> {children}
                <h1 className="text-xl text-[var(--color-font-black)] font-medium text-center mt-10">Deseja aceitar o recado?</h1>
                <div className="flex justify-center m-5">
                    <button className="bg-[var(--color-2)] text-white cursor-pointer rounded-xl border-2 border-[var(--color-font-black)] font-medium w-20 md:w-25 h-13 md:h-12" onClick={onSubmit} disabled={loading}>Aceitar</button>
                </div> 
                </div>
            </div>
        </>
    );
}