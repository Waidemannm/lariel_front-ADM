import { useForm } from "react-hook-form";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type { TipoSalvarConvidado } from "../../types/tipoSalvarConvidado";
import FormSalvarConvidado from "../FormSalvarConvidado/FormSalvarConvidado";

const URL_API = import.meta.env.VITE_URL_API;

export default function ConvidadoSalvar({open,  onClose, children, }: {open: boolean; onClose: () => void; children: React.ReactNode; }){

    const navigate = useNavigate();
    const {register, handleSubmit} = useForm<TipoSalvarConvidado>();
    const [loading, setLoading] = useState<boolean>(false);
    const { idConvite } = useParams<{ idConvite: string }>();

    const onSubmit = handleSubmit(async (data) => {
        const dados = {
            nomeConvidado: data.nomeConvidado,
            idConvite: idConvite,
            status: data.status,
        }
        try{
            setLoading(true);
            const response = await fetch(`${URL_API}/convidados`, { 
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(dados),
            });
            if (!response.ok) {
                throw new Error("Falha ao salvar dados do convidado. O servidor está online?");
            }
            alert("Convidado salvo com sucesso!");
            navigate(`/convidados/${idConvite}`);
            window.location.reload();
            setLoading(false);
        } catch (err) {
        alert("Falha ao salvar convidado!");
        navigate(`/convidados/${idConvite}`);
        window.location.reload();
        
      } finally {
        setLoading(false);
      }
    });

    return(
        <>
            {loading && (
               <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/60"><p className="text-white text-lg font-medium">Salvando convidado...</p></div>
            )}
            <div className={`fixed mt-15 w-full inset-0 flex justify-center items-center transition-colors ${open ? "visible bg-black/90" : "invisible"}`}>
            <div className={`bg-white text-[var(--color-font-black)] rounded-lg shadow p-6 transition-all w-70 md:w-100 ${open ? "scale-100 opacity-100": "scale-110 opacity-0"}`} onClick={(e) => e.stopPropagation()}>
                <button className="absolute top-2 right-2 rounded-md text-blue-500 m-1" onClick={onClose}>Fechar</button> {children}
                <FormSalvarConvidado register={register} onSubmit={onSubmit}/>
            </div>
            </div>
        </>
    );
}
