import React, { useEffect, useState } from 'react';

import api from './services/api';

import './styles.css';

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then((response) => {
      setRepositories(response.data);
    });
  }, []);

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      url: 'https://github.com/Rocketseat/unform',
      title: `Unform ${Date.now()}`,
      techs: ['React', 'ReactNative', 'TypeScript', 'ContextApi'],
    });

    const repository = response.data;

    setRepositories([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
    try {
      await api.delete(`repositories/${id}`);
      console.log('Repositório excluído com sucesso');

      const repositoriesFilter = repositories.filter((repo) => repo.id !== id);

      setRepositories(repositoriesFilter);
    } catch (error) {
      console.log('Falha ao excluir o repositório');
    }
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((repository) => (
          <li key={repository.id}>
            {repository.title}
            <button
              type="button"
              onClick={() => handleRemoveRepository(repository.id)}
            >
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button type="button" onClick={handleAddRepository}>
        Adicionar
      </button>
    </div>
  );
}

export default App;
