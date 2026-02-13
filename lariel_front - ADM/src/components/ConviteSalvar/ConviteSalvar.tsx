import { useForm } from "react-hook-form";
import FormSalvarConvite from "../FormSalvarConvite/FormSalvarConvite";
import type { TipoSalvarConvite } from "../../types/tipoSalvarConvite";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const URL_API = import.meta.env.VITE_URL_API;

export default function ConviteSalvar({open,  onClose, children, }: {open: boolean; onClose: () => void; children: React.ReactNode; }){

    const navigate = useNavigate();
    const {register, handleSubmit} = useForm<TipoSalvarConvite>();
    const [loading, setLoading] = useState<boolean>(false);

    const onSubmit = handleSubmit(async (data) => {
        try{
            setLoading(true);
            const response = await fetch(`${URL_API}/convites`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });
            if (!response.ok) {
                throw new Error("Falha ao salvar dados do convite. O servidor está online?");
            }
            alert("Convite salvo com sucesso!");
            navigate("/convites");
            window.location.reload();
            setLoading(false);
        } catch (err) {
        alert("Falha ao salvar convidado!");
        navigate("/convites");
        window.location.reload();
      } finally {
        setLoading(false);
      }
    });

    return(
        <>
        {loading && (
            <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/60"><p className="text-white text-lg font-medium">Salvando convite...</p></div>
        )}
            <div className={`fixed w-full inset-0 flex justify-center items-center transition-colors ${open ? "visible bg-black/90" : "invisible"}`}>
            <div className={`bg-white text-[var(--color-font-black)] rounded-lg shadow p-6 transition-all w-70 md:w-100 ${open ? "scale-100 opacity-100": "scale-110 opacity-0"}`} onClick={(e) => e.stopPropagation}>
                <button className="absolute top-2 right-2 rounded-md text-blue-500 m-1" onClick={onClose}>Fechar</button> {children}
                <FormSalvarConvite register={register} onSubmit={onSubmit}/>
            </div>
            </div>
        </>
    );
}