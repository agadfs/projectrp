import React, { createContext, useEffect, useState } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState({
    id: '',
    inventory: [],
    chats: []
  });
  const initialUrlRequest = localStorage.getItem('newapiserver') || process.env.REACT_APP_API_URL;
  const [isUrlWorking, setIsUrlWorking] = useState(false);
  const [urlrequest, seturlrequest] = useState(initialUrlRequest);
  const randomStrings = [
    'Em caso de dúvidas ou sugestões, entre no discord do ProjectRP https://discord.gg/s9jpUGseMz', 
    'No momento só pode ser criado 1 sessão por conta', 
    'Temos sistema completo de inventário e criação de itens',
    'Ao adicionar itens, sempre verifique se a url da imagem é valida',
    'O HP e a MANA aumentam conforme os atributos, futuramente será personalizavel esses multiplicadores',
    'Os Itens com atributos de ATK e DEF alteram diretamente os status do jogador que o equipou',
    'No momento, todos os npcs criados pelo mestre compartilham os mesmos atributos',
    'Futuramente, será adicionado a opção de criar npcs que andam pelo mapa.',
    'Após criar uma sessão, basta mandar o link ou procurar pelo nome nas sessões e pedir para entrar',
    'Tem interesse em apoiar o projeto? Peça ao dev para abrir um catarse no discord, digamos que ele ainda não tem muita fé que as pessoas iriam gostar!',
  
  ];
  useEffect(() => {

    const checkUrl = async () => {

      try {
        const response = await fetch(process.env.REACT_APP_API_URL);
        if (response) {
          localStorage.removeItem('newapiserver');
         if(initialUrlRequest === 'https://projectrp.onrender.com'){
          window.location.reload()
         }
        }
      } catch (error) {
       
        localStorage.setItem('newapiserver', 'https://projectrp.onrender.com');
        

      }

    };

    checkUrl();
  }, []);
  return (
    <AppContext.Provider value={{ user, setUser, urlrequest, seturlrequest,  randomStrings }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => React.useContext(AppContext);
