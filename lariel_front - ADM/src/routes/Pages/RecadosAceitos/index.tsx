import { useEffect, useState } from "react";
import type { TipoRecadoAceito } from "../../../types/tipoRecadoAceito";
import CardRecadoAceitos from "../../../components/CardRecadoAceitos/CardRecadoAceitos";

const URL_API = import.meta.env.VITE_URL_API;

export default function RecadosAceitos(){

    const [recadosAceitos, setRecadosAceitos] = useState<TipoRecadoAceito[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchRecadosAceitos = async () => {
        try {
            const response = await fetch(`${URL_API}/aceitos`);
            if (!response.ok) {
            throw new Error("Falha ao buscar os dados. O servidor está online?");
            }
            const data: TipoRecadoAceito[] = await response.json();
            setRecadosAceitos(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Um erro inesperado ocorreu.");
        } finally {
            setLoading(false);
        }
        };
        fetchRecadosAceitos();
    }, []);

    if (loading) {
        return (
        <main className="max-w-7xl mx-auto leading-relaxed p-8">
            <p className="text-center text-gray-600">Carregando recados aceitos...</p>
        </main>
        );
    }

    if (error) {
        return (
        <main className="max-w-7xl mx-auto leading-relaxed p-8">
            <div className="text-center text-red-700 bg-red-100 p-4 rounded-lg">
            <p>Erro: {error}</p>
            </div>
        </main>
        );
    }

    if (recadosAceitos.length === 0) {
        return (
        <main className="max-w-7xl mx-auto flex flex-col justify-center leading-relaxed p-5 gap-10">
            <h1 className="text-xl text-[var(--color-font-black)] font-medium text-center mt-10">Recados aceitos</h1>
            <p className="text-center text-[var(--color-font-black)]">Nenhum recado aceito.</p>
        </main>
        );
    }

    return(
        <main className="max-w-7xl mx-auto flex flex-col justify-center leading-relaxed p-5 gap-10">
            <h1 className="text-xl text-[var(--color-font-black)] font-medium text-center mt-10">Recados aceitos</h1>
            <div className="flex flex-row flex-wrap justify-center gap-10">
                {recadosAceitos.map((recado) => (
                    <CardRecadoAceitos recadoAceitos={recado} />
                ))}
            </div>
        </main>
    );
}