import React, {useState, useEffect} from "react";
import api from './services/api';

import "./styles.css";

function App() {

  const [repositories, setRepository] = useState([]);

  useEffect(() => {
      api.get('repositories').then(res => {
        setRepository(res.data);
      })
  },[])

  async function handleAddRepository() {
    const res = await api.post('repositories',{
        title: `Novo Repositorio ${Date.now()}`,
        url: "http://github.com/cris-erie",
        techs: ["ReactJS"],
        likes: 0
    })

    const repository = res.data;
    setRepository([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
    await api.delete('repositories/'+id);
    setRepository([]);
    setRepository(repositories.filter((e)=>(e.id !== id)));
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => (
          <li key={repository.id}> 
            {repository.title} 

            <button type="button" onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
