import { useState } from "react";

const ModelsDropdown = () => {
    const [selectedModel, setSelectedModel] = useState('Ollama: granite3.3:latest');

    const models = [
        { id: '2', name: 'Ollama: Granite3.3:latest' },
        { id: '3', name: 'Ollama: Gemma3:latest' },
        { id: '1', name: 'Ollama: Mistral:latest' },
       
      ];

    return (
        <select
            className="select select-ghost"
            value={selectedModel}
            onChange={(e) => setSelectedModel(e.target.value)}
        >
            {models.map(model => (
                <option key={model.id} value={model.id}>
                    {model.name}
                </option>
            ))}
        </select>
    );
};

export default ModelsDropdown;