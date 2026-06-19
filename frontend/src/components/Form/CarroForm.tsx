import { useState } from "react";
import { api } from "../../services/api";

interface Props {
  atualizarLista: () => void;
}

export function CarroForm({
  atualizarLista
}: Props) {

  const [modelo, setModelo] = useState("");
  const [marca, setMarca] = useState("");
  const [ano, setAno] = useState("");
  const [cor, setCor] = useState("");
  const [placa, setPlaca] = useState("");
  const [combustivel, setCombustivel] =
    useState("");
  const [categoria, setCategoria] =
    useState("");
  const [valor, setValor] = useState("");
  const [quilometragem, setQuilometragem] =
    useState("");

  async function salvar(
    e: React.FormEvent
  ) {
    e.preventDefault();

    await api.post("/carros", {
      modelo,
      marca,
      ano: Number(ano),
      cor,
      placa,
      combustivel,
      categoria,
      valor: Number(valor),
      quilometragem: Number(quilometragem)
    });

    setModelo("");
    setMarca("");
    setAno("");
    setCor("");
    setPlaca("");
    setCombustivel("");
    setCategoria("");
    setValor("");
    setQuilometragem("");

    atualizarLista();
  } // <- FECHA A FUNÇÃO

  return (
    <form onSubmit={salvar}>
      <input
        placeholder="Modelo"
        value={modelo}
        onChange={(e) =>
          setModelo(e.target.value)
        }
      />

      <input
        placeholder="Marca"
        value={marca}
        onChange={(e) =>
          setMarca(e.target.value)
        }
      />

      <input
        placeholder="Ano"
        value={ano}
        onChange={(e) =>
          setAno(e.target.value)
        }
      />

      <button type="submit">
        Salvar
      </button>
    </form>
  );
}