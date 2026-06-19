import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

interface Carro {
  id: number;
  modelo: string;
  marca: string;
  ano: number;
}

function App() {
  const [carros, setCarros] = useState<Carro[]>([]);

  const [modelo, setModelo] = useState("");
  const [marca, setMarca] = useState("");
  const [ano, setAno] = useState("");

  const [editandoId, setEditandoId] = useState<number | null>(null);

  async function carregarCarros() {
    const resposta = await axios.get(
      "http://localhost:3000/carros"
    );

    setCarros(resposta.data);
  }

  async function cadastrarCarro(
    e: React.FormEvent
  ) {
    e.preventDefault();

    await axios.post(
      "http://localhost:3000/carros",
      {
        modelo,
        marca,
        ano: Number(ano),
        cor: "Preto",
        placa: Date.now().toString(),
        combustivel: "Flex",
        categoria: "Sedan",
        valor: 0,
        quilometragem: 0,
      }
    );

    limparFormulario();
    carregarCarros();
  }

  async function editarCarro(
    e: React.FormEvent
  ) {
    e.preventDefault();

    await axios.put(
      `http://localhost:3000/carros/${editandoId}`,
      {
        modelo,
        marca,
        ano: Number(ano),
      }
    );

    limparFormulario();
    setEditandoId(null);

    carregarCarros();
  }

  async function excluirCarro(id: number) {
    await axios.delete(
      `http://localhost:3000/carros/${id}`
    );

    carregarCarros();
  }

  function limparFormulario() {
    setModelo("");
    setMarca("");
    setAno("");
  }

  useEffect(() => {
    carregarCarros();
  }, []);

  return (
    <div className="container">
      <h1>🚗 Sistema de Veículos</h1>

      <form
        onSubmit={
          editandoId
            ? editarCarro
            : cadastrarCarro
        }
      >
        <input
          type="text"
          placeholder="Modelo"
          value={modelo}
          onChange={(e) =>
            setModelo(e.target.value)
          }
        />

        <input
          type="text"
          placeholder="Marca"
          value={marca}
          onChange={(e) =>
            setMarca(e.target.value)
          }
        />

        <input
          type="number"
          placeholder="Ano"
          value={ano}
          onChange={(e) =>
            setAno(e.target.value)
          }
        />

        <button type="submit">
          {editandoId
            ? "Atualizar"
            : "Cadastrar"}
        </button>
      </form>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Modelo</th>
            <th>Marca</th>
            <th>Ano</th>
            <th>Ações</th>
          </tr>
        </thead>

        <tbody>
          {carros.map((carro) => (
            <tr key={carro.id}>
              <td>{carro.id}</td>
              <td>{carro.modelo}</td>
              <td>{carro.marca}</td>
              <td>{carro.ano}</td>

              <td>
                <button
                  onClick={() => {
                    setEditandoId(carro.id);
                    setModelo(carro.modelo);
                    setMarca(carro.marca);
                    setAno(String(carro.ano));
                  }}
                >
                  Editar
                </button>

                <button
                  onClick={() =>
                    excluirCarro(carro.id)
                  }
                >
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;