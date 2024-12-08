// Nunca comentar código
import React, { useState } from "react";
import axios from "axios";

function App() {
  const [descricao, setDescricao] = useState("");
  const [opcoes, setOpcoes] = useState("");
  const [idEvento, setIdEvento] = useState("");
  const [opcoesEvento, setOpcoesEvento] = useState([]);

  const criarEvento = async () => {
    await axios.post("http://localhost:3001/criar-evento", {
      descricao,
      opcoes: opcoes.split(",")
    });
  };

  const obterOpcoes = async () => {
    let resp = await axios.get("http://localhost:3001/obter-opcoes/" + idEvento);
    setOpcoesEvento(resp.data.descricoes.map((d, i) => d + ": " + resp.data.votos[i]));
  };

  return (
    <div>
      <h1>Votação Descentralizada</h1>
      <input placeholder="Descricao" value={descricao} onChange={e => setDescricao(e.target.value)}/>
      <input placeholder="Opcoes separadas por virgula" value={opcoes} onChange={e => setOpcoes(e.target.value)}/>
      <button onClick={criarEvento}>Criar Evento</button>
      <br/>
      <input placeholder="ID Evento" value={idEvento} onChange={e => setIdEvento(e.target.value)}/>
      <button onClick={obterOpcoes}>Obter Opcoes</button>
      <ul>
        {opcoesEvento.map((o, i) => <li key={i}>{o}</li>)}
      </ul>
    </div>
  );
}

export default App;
