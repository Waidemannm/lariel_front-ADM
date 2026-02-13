import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import FormDeletarConvidado from "../FormDeletarConvidado/FormDeletarConvidado";
import type { TipoDeletarConvidado } from "../../types/tipoDeletarConvidado";
import { useForm } from "react-hook-form";

const URL_API = import.meta.env.VITE_URL_API;

export default function ConviteDELETAR({open,  onClose, children, }: {open: boolean; onClose: () => void; children: React.ReactNode; }){

    const navigate = useNavigate();
    const [loading, setLoading] = useState<boolean>(false);
    const {register, handleSubmit} = useForm<TipoDeletarConvidado>();
    const { idConvite } = useParams<{ idConvite: string }>();

    
    const onSubmit = handleSubmit(async (data) => {
        try{
            setLoading(true);
            const response = await fetch(`${URL_API}/convidados/${data.idConvidado}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            });
            if (!response.ok) {
            throw new Error("Falha ao deletar dados do convidado.");
            }

            alert("Convidado deletado com sucesso!");
            navigate(`/convidados/${idConvite}`);
            window.location.reload();
            setLoading(false);
        } catch (err) {
            alert("Falha ao deletar convidado!");
        } finally {
            setLoading(false);
        }
    });

    return(
        <>
        {loading && (
            <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/60"><p className="text-white text-lg font-medium">Deletando convidado...</p></div>
        )}
            <div className={`fixed w-full md:mt-20 inset-0 flex justify-center items-center transition-colors ${open ? "visible bg-black/90" : "invisible"}`}>
                <div className={`bg-white text-[var(--color-font-black)] rounded-lg shadow p-6 transtion-all w-70 md:w-100 ${open ? "scale-100 opacity-100": "scale-110 opacity-0"}`} onClick={(e) => e.stopPropagation}>
                <button className="absolute top-2 right-2 rounded-md text-blue-500 m-1" onClick={onClose}>Fechar</button> {children}
                <FormDeletarConvidado register={register} onSubmit={onSubmit}></FormDeletarConvidado>
                </div>
            </div>
        </>
    );
} 