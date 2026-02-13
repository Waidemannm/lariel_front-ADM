import { useForm } from "react-hook-form";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type { TipoAtualizarConvite } from "../../types/tipoAtualizarConvite";
import FormAtualizarConvite from "../FormAtualizarConvite/FormAtualizarConvite";

const URL_API = import.meta.env.VITE_URL_API;

export default function ConviteAtualizar({open,  onClose, children, }: {open: boolean; onClose: () => void; children: React.ReactNode; }){

    const { idConvite } = useParams<{ idConvite: string }>();
    const navigate = useNavigate();
    const {register, handleSubmit} = useForm<TipoAtualizarConvite>();
    const [loading, setLoading] = useState<boolean>(false);

    const onSubmit = handleSubmit(async (data) => {
        try{
            setLoading(true);
            const response = await fetch(`${URL_API}/convites/${idConvite}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });
            if (!response.ok) {
                throw new Error("Falha ao atualizar dados do convite. O servidor está online?");
            }
            alert("Convite atualizado com sucesso!");
            navigate("/convites");
            window.location.reload();
            setLoading(false);
        } catch (err) {
        alert("Falha ao atualizar convite!");
        navigate("/convites");
        window.location.reload();
      } finally {
        setLoading(false);
      }
    });
   
    return(
        <>
        {loading && (
            <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/60"><p className="text-white text-lg font-medium">Atualizando convite...</p></div>
        )}
            <div className={`fixed w-full inset-0 flex justify-center items-center transition-colors ${open ? "visible bg-black/90" : "invisible"}`}>
            <div className={`bg-white text-[var(--color-font-black)] rounded-lg shadow p-6 transition-all w-70 md:w-100 ${open ? "scale-100 opacity-100": "scale-110 opacity-0"}`} onClick={(e) => e.stopPropagation}>
                <button className="absolute top-2 right-2 rounded-md text-blue-500 m-1" onClick={onClose}>Fechar</button> {children}
                <FormAtualizarConvite register={register} onSubmit={onSubmit}/>
            </div>
            </div>
        </>
    );
}