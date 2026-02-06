import { useEffect, useState } from "react";
import type { TipoConvite } from "../../../types/tipoConvite";
import CardConvite from "../../../components/CardConvite/CardConvite";
import { Link } from "react-router-dom";
import { FiSearch } from "react-icons/fi";
import ConviteSalvar from "../../../components/ConviteSalvar/ConviteSalvar";

const URL_API = import.meta.env.VITE_URL_API;

export default function Convites() {
  const [convites, setConvites] = useState<TipoConvite[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [openConvidadoSalvar, setOpenConvidadoSalvar] = useState(false);
  const [busca, setBusca] = useState<string>("");

  useEffect(() => {
    const fetchConvites = async () => {
      try {
        const response = await fetch(`${URL_API}/convites`);
        if (!response.ok) {
          throw new Error("Falha ao buscar os dados. O servidor está online?");
        }
        const data: TipoConvite[] = await response.json();
        setConvites(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Um erro inesperado ocorreu.");
      } finally {
        setLoading(false);
      }
    };

    fetchConvites();
  }, []);

  if (loading) {
    return (
      <main className="max-w-7xl mx-auto leading-relaxed p-8">
        <p className="text-center text-gray-600">Carregando convites...</p>
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

  if (convites.length === 0) {
    return (
      <main className="max-w-7xl mx-auto flex flex-col justify-center leading-relaxed p-8">
        <p className="text-center text-gray-500">Nenhum convite encontrado.</p>
        <div className="convite-salvar flex items-center flex-col mt-6">
          <h1 className="text-2xl text-[var(--color-font-black)] font-medium text-center mb-6">Adicione seu primeiro convite</h1>
          <button className="bg-green-400 cursor-pointer rounded-xl border-2 border-green-400 font-medium w-25 h-13 p-2" onClick={() => setOpenConvidadoSalvar(true)}>Adicionar</button>

          <ConviteSalvar open={openConvidadoSalvar} onClose={() => setOpenConvidadoSalvar(false)}> </ConviteSalvar>
        </div>
      </main>
    );
  }

  const convitesFiltrados = convites.filter((convite) =>
    convite.nomeConvite.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <main className="max-w-7xl mx-auto leading-relaxed p-8">
      
      <h1 className="text-2xl text-[var(--color-font-black)] font-medium text-center mb-6">Convites</h1>

      <div className="flex justify-center mb-8 gap-5">
        <div className="relative w-full max-w-md">
          <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input className="w-full pl-12 pr-4 py-3 border-1 border-[var(--color-font-black)] rounded-xl outline-none"
            placeholder="Pesquise o nome do convite"
            type="text"
            value={busca}
            onChange={(ev) => setBusca(ev.target.value)}
          />
        </div>

        <div className="convite-salvar">
            <button className="bg-green-400 cursor-pointer rounded-xl border-2 border-green-400 font-medium w-25 h-13 p-2" onClick={() => setOpenConvidadoSalvar(true)}>Adicionar</button>

            <ConviteSalvar open={openConvidadoSalvar} onClose={() => setOpenConvidadoSalvar(false)}> </ConviteSalvar>
        </div>
      </div>

      
      <div className="flex flex-col gap-10">
        {convitesFiltrados.map((convite) => (
          <Link key={convite.idConvite} to={`/convidados/${convite.idConvite}`} className="block">
            <CardConvite convite={convite} />
          </Link>
        ))}
      </div>

       
      {convitesFiltrados.length === 0 && (
        <p className="text-center text-gray-500 mt-6">
          Nenhum convite encontrado para “{busca}”.
        </p>
      )}
    </main>
  );
}
