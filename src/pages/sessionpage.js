import { useParams } from 'react-router-dom';
import styles from './sessionpage.module.css'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAppContext } from '../AppContext';

export default function SessionPage() {
  const [titulo, setTitulo] = useState('');
  const { sessionid } = useParams();
  const { user, urlrequest } = useAppContext();
  const [session, setSession] = useState();
  const [players, setPlayers] = useState();
  const [playersid, setPlayersid] = useState();
  const [request, setRequest] = useState([]);
  const [requestNames, setRequestNames] = useState([])
  const [inventory, setInventory] = useState();
  const [map, setMap] = useState();
  const [title, setTitle] = useState();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    value: '',
    cantrade: false,
    others: '',
    atk: '',
    def: '',
    url: ''
  });
  const [items, setItems] = useState();
  const [showinfo, setShowInfo] = useState(false);
  const [allinventories, setAllInventories] = useState()

  async function updateInventory() {
    try {
      const randomItem = items[Math.floor(Math.random() * items.length)];
      const newItem = {
        item: randomItem,
        quantity: 1
      };

      const existingItemIndex = inventory.Items.findIndex(item => item.item.name === randomItem.name);

      if (existingItemIndex !== -1) {

        inventory.Items[existingItemIndex].quantity++;
      } else {

        inventory.Items.push(newItem);
      }



      await axios.post(`${urlrequest}/inventory/updateitems`, { userId: inventory._id, items: inventory.Items })
      getInventory()

    } catch (error) {
      console.error('Error updating inventory:', error);
    }
  }
  async function deleteInventoryItem(newInv) {

    try {

      await axios.post(`${urlrequest}/inventory/updateitems`, { userId: inventory._id, items: newInv })
      getInventory()

    } catch (error) {
      console.error('Error updating inventory:', error);
    }
  }
  async function createInventory() {

    try {


      const randomUser = {
        ownerId: user.id,
        gameId: sessionid,
        Items: [],

      };
      const response = await axios.post(`${urlrequest}/inventory/create`, randomUser)

      let invList = [...allinventories]
      invList.push(response.data._id)

      updateSession({ inventories: invList })

      getInventory()
    } catch (error) {
      console.error('Error creating inventory:', error);
    }


  }
  async function getItems() {
    try {
      const response = await axios.get(`${urlrequest}/item`);
      if (response.data) {
        const data = response.data;
        setItems(data)

      }
    } catch (error) {
      console.error('Error fetching sessions ', error)
    }
  }
  async function getInventory() {
    try {

      const userId = user.id;

      const response = await axios.get(`${urlrequest}/inventory/${userId}/${sessionid}`);

      if (response.data) {
        let playerarray = response.data;
        if (playerarray.length > 0) {
          playerarray = playerarray[0];
          setInventory(playerarray);

        } else {
          console.log('Inventory not found')
        }
      }
    } catch (error) {
      console.error('Error getting any inventory: ', error);
    }
  }
  useEffect(() => {
    if (user.id) {
      getInventory()
    }
  }, [user])
  async function getPlayers(data) {
    let playerarray = [];

    try {
      if (data) {
        for (let i = 0; i < data.length; i++) {

          const response = await axios.get(`${urlrequest}/users/${data[i]}`);
          if (response.data) {
            const data = response.data;
            const username = data.username;
            playerarray.push(username);
          }

        }
        setPlayers(playerarray)



      }
    } catch (error) {
      console.error('Error fetching the session: ', error)
    }
  }
  async function getSession() {

    try {
      const response = await axios.get(`${urlrequest}/sessions/${sessionid}`);
      if (response.data) {
        const data = response.data;
        setRequest(data.Others);
        getName(data.Others);
        if (data.players.includes(user.id)) {

          setSession(data);
          setTitle(data.title);
          setMap(data.Maps);
          setPlayers(data.players);
          getPlayers(data.players);
          setShowInfo(true);
          setPlayersid(data.players);
          setAllInventories(data.inventories);


        } else {
          console.log("User is not authorized for this session.");


        }
      }
    } catch (error) {
      console.error('Error fetching the session: ', error)
    }
  }
  async function updateSession(newData) {

    try {
      const response = await axios.post(`${urlrequest}/sessions/update/${sessionid}`, newData);

      getSession()
    } catch (error) {
      console.error('Error fetching the session: ', error)
    }
  }

  useEffect(() => {
    if (user.id) {

      getSession()
      getItems()
    }
  }, [user])

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {

      const response = await axios.post(`${urlrequest}/item`, formData);


      window.location.reload()


    } catch (error) {
      console.error('Erro ao adicionar item:', error);
      // Trate o erro apropriadamente
    }
  };
  const handleDelete = (index) => {

    const updatedItems = inventory.Items.filter((_, itemIndex) => itemIndex !== index);

    deleteInventoryItem(updatedItems)
  };
  async function handleAdd(index) {

    try {
      const randomItem = items[index];
      const newItem = {
        item: randomItem,
        quantity: 1
      };

      const existingItemIndex = inventory.Items.findIndex(item => item.item.name === randomItem.name);

      if (existingItemIndex !== -1) {

        inventory.Items[existingItemIndex].quantity++;
      } else {

        inventory.Items.push(newItem);
      }



      await axios.post(`${urlrequest}/inventory/updateitems`, { userId: inventory._id, items: inventory.Items })
      getInventory()

    } catch (error) {
      console.error('Error updating inventory:', error);
    }
  };
  function handleAddItem(event) {
    const selectedId = event.target.value;
    handleAdd(selectedId)
  } const handleUpdateQuantity = (index, quantityChange) => {
    const updatedItems = inventory.Items.map((item, itemIndex) => {
      if (itemIndex === index) {
        const newQuantity = item.quantity + quantityChange;

        if (newQuantity <= 0) {
          return null;
        } else {

          return {
            ...item,
            quantity: newQuantity
          };
        }
      }
      return item;
    }).filter(item => item !== null);

    deleteInventoryItem(updatedItems);


  };
  function denyRequest(index) {

    let updatedRequests = [...request];

    updatedRequests.splice(index, 1);

    updateSession({ Others: updatedRequests });
  }
  function acceptRequest(index) {

    let updatedRequests = [...request];
    let updatedPlayers = [...playersid];
    updatedPlayers.push(updatedRequests[index]);
    updatedRequests.splice(index, 1);
    console.log({ Others: updatedRequests, players: updatedPlayers })
    updateSession({ Others: updatedRequests, players: updatedPlayers });

  }
  function makeRequest() {
    let updatedRequests = [...request];
    updatedRequests.push(user.id);
    updateSession({ Others: updatedRequests });
  }
  async function deletesession(){
    const response = await axios.post(`${urlrequest}/sessions/delete/${sessionid}`);


    window.location.href = '/'
  }

  async function getName(data) {
    let playerarray = [];

    try {
      if (data) {
        for (let i = 0; i < data.length; i++) {

          const response = await axios.get(`${urlrequest}/users/${data[i]}`);
          if (response.data) {
            const data = response.data;
            const username = data.username;
            playerarray.push(username);
          }

        }
        setRequestNames(playerarray)



      }
    } catch (error) {
      console.error('Error fetching the session: ', error)
    }
  }
  return (
    <div className={styles.body} >
      {showinfo === true ?
        <div>
          <div>
            ID: {sessionid}
          </div>
          <button onClick={() => {
            deletesession()
          }}>
           Deletar sessão
          </button>
          <div style={{ marginTop: '10px' }}>
            Titulo do jogo: {title}
            <div>
              <form>
                <input value={titulo} onChange={(e) => {
                  setTitulo(e.target.value)
                }} />

                <button onClick={() => {
                  if (titulo && titulo.length > 5 && titulo !== title) {
                    updateSession({ title: titulo });
                  } else {
                    alert('O titulo tem que ser maior que 5 caracteres, e diferente do titulo anterior')
                  }
                }} >Mudar nome</button>

              </form>
            </div>
          </div>
          <div style={{ marginTop: '10px', gap: '10px', display: 'flex', flexDirection: 'column', marginBottom: '10px' }}>
            Jogadores:
            <div style={{ height: '100%', display: 'flex', maxWidth: '300px', gap: '10px', flexWrap: 'wrap', border: '3px solid black', padding: '10px', borderRadius: '5px' }}>
              {players?.map((player, index) => (
                <div style={{
                  padding: '10px', border: '1px solid black', width: 'auto', borderRadius: '5px',
                  backgroundColor: index === 0 ? 'red' : 'white',
                  color: index === 0 ? 'white' : 'black'


                }} key={index}>

                  {index === 0 ? "Mestre: " + player : "Jogador: " + player}
                </div>
              ))}
            </div>
            <div style={{ marginTop: '10px', gap: '10px', display: 'flex', flexDirection: 'column', marginBottom: '10px' }}>
              Solicitações para entrar:
              <div style={{ height: '100%', display: 'flex', maxWidth: '300px', gap: '10px', flexWrap: 'wrap', border: '3px solid black', padding: '10px', borderRadius: '5px' }}>
                {request && request?.length > 0 && request?.map((player, index) => (
                  <div style={{ padding: '10px', border: '1px solid black', width: 'auto' }} key={index}>
                    <div>

                      {requestNames[index]}

                    </div>

                    <button onClick={() => {

                      acceptRequest(index);
                    }}>
                      Aceitar
                    </button>

                    <button onClick={() => {

                      denyRequest(index);
                    }}> Recusar </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div>

            Inventario do player:
            {inventory === undefined || inventory.length === 0 ? (
              <button onClick={() => {
                createInventory()
              }} >Criar inventário</button>
            ) : (
              <div style={{
                height: '100%', display: 'flex', maxWidth: '300px', gap: '10px', flexWrap: 'wrap', border: '3px solid black',
                padding: '10px', borderRadius: '5px', flexDirection: 'column'
              }}>
                Seu Id:  {inventory.ownerId} <br />
                <div>
                  Itens:
                  <div style={{ width: '100%', display: 'flex', gap: '20px', flexWrap: 'wrap' }} >
                    {inventory?.Items?.map((item, index) => (
                      <div style={{ gap: '5px', border: '2px solid green', padding: '5px', borderRadius: '5px', justifyContent: 'space-between', display: 'flex', flexDirection: 'column' }} key={index}>
                        {item?.item?.url ? (
                          <div style={{ display: 'flex', justifyContent: 'center' }} >
                            <img src={item?.item?.url} alt="Item Image" style={{ maxWidth: '100px', height: 'auto' }} />

                          </div>
                        ) : null}

                        <div>
                          {item?.item?.name}
                        </div>
                        <div style={{ textWrap: 'nowrap' }} >
                          {item?.quantity} Unidade(s)
                        </div>
                        <button onClick={() => handleDelete(index)} style={{ backgroundColor: 'red', color: 'white', cursor: 'pointer' }}>
                          Deletar
                        </button>
                        <div style={{ display: 'flex', gap: '5px' }}>
                          <button onClick={() => handleUpdateQuantity(index, +1)} style={{ color: 'green', cursor: 'pointer' }}>
                            +1
                          </button>
                          <button onClick={() => handleUpdateQuantity(index, -1)} style={{ color: 'red', cursor: 'pointer' }}>
                            -1
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div>
                    <button style={{ marginTop: '10px', marginBottom: '20px' }} onClick={() => {
                      if (items.length > 0) {

                        updateInventory()
                      } else {
                        alert('Por favor, crie um item primeiro, abaixo')
                      }
                    }}>Adicionar um item no inventario aleatoriamente</button>
                    <select id="itemSelect" onChange={handleAddItem}>
                      <option value="">Adicione um item</option>
                      {items?.map((item, index) => (
                        <option key={index} value={index}>{item.name}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            )}

          </div>
          {user?.id === playersid[0] ?

            <div>
              <h2>Adicionar Item</h2>
              <form onSubmit={handleSubmit}>
                <label htmlFor="name">Nome:</label><br />
                <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required /><br />

                <label htmlFor="description">Descrição:</label><br />
                <textarea id="description" name="description" value={formData.description} onChange={handleChange} required /><br />

                <label htmlFor="value">Valor:</label><br />
                <input type="text" id="value" name="value" value={formData.value} onChange={handleChange} /><br />

                <label htmlFor="cantrade">Pode ser negociado:</label><br />
                <input type="checkbox" id="cantrade" name="cantrade" checked={formData.cantrade} onChange={handleChange} /><br />

                <label htmlFor="atk">Ataque:</label><br />
                <input type="text" id="atk" name="atk" value={formData.atk} onChange={handleChange} /><br />

                <label htmlFor="def">Defesa:</label><br />
                <input type="text" id="def" name="def" value={formData.def} onChange={handleChange} /><br />

                <label htmlFor="others">Outros:</label><br />
                <textarea id="others" name="others" value={formData.others} onChange={handleChange} /><br />

                <label htmlFor="url">Url imagem:</label><br />
                <textarea id="url" name="url" value={formData.img} onChange={handleChange} /><br />

                <button type="submit">Enviar</button>
              </form>
            </div>



            : null}



        </div>
        :
        <div>
          {user.id ?

            <div>
              
              {!request.includes(user.id) ?

                <button onClick={() => {
                  makeRequest()
                }} >

                  Solicitar entrada

                </button>

                :
                <div>
                  Você já solicitou pra entrar
                </div>}

            </div> : <div> Por favor, faça o login para poder interagir com as sessões </div>}



        </div>}

    </div>
  )
}