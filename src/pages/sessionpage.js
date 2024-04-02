import { useParams } from 'react-router-dom';
import styles from './sessionpage.module.css'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAppContext } from '../AppContext';
import { LinearProgress } from '@mui/material';

export default function SessionPage() {
  const [scale, setScale] = useState(1);
  const [newscale, setNewScale] = useState(1);
  const [isUrlValid, setIsUrlValid] = useState(false);
  const [urlselectedmap, setUrlSelectedMap] = useState('');
  const [nameselectedmap, setNameSelectedMap] = useState('');
  const [imageWidth, setImageWidth] = useState(null);
  const [tileselected, setTileSelected] = useState('');
  const [nameselected, setNameSelected] = useState('');

  const [draggedItem, setDraggedItem] = useState(null);
  const gridItems = Array.from({ length: 4096 }); /* 64 x 64 */
  const [titulo, setTitulo] = useState('');
  const { sessionid } = useParams();
  const { user, urlrequest } = useAppContext();
  const [session, setSession] = useState('');
  const [players, setPlayers] = useState([]);
  const [playersid, setPlayersid] = useState('');
  const [request, setRequest] = useState([]);
  const [requestNames, setRequestNames] = useState([])
  const [inventory, setInventory] = useState('');
  const [map, setMap] = useState('');
  const [mapsarray, setMapsArray] = useState([]);
  const [title, setTitle] = useState('');
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
  const [allinventories, setAllInventories] = useState();
  const [playerlocation, setPlayerLocation] = useState([
    { name: 'Test', position: 0, id: '' },
    { name: 'Test 2', position: 2, id: '' },

  ]);
  const [imgprev, setImgPrev] = useState('');
  const [statsuser, setStatsUser] = useState(
    {level: 0,
    experience: 0,
    health: 0,
    maxHealth: 0,
    mana: 0,
    maxMana: 0,
    strength: 0,
    dexterity: 0,
    constitution: 0,
    intelligence: 0,
    wisdom: 0,
    charisma: 0})

    

  useEffect(() => {

    const interval = setInterval(() => {
      if (user.id) {
        getSession()
      } else {

      }
     
    }, 1000);

    return () => clearInterval(interval);
  }, [user]);
  useEffect(() => {

    const interval2 = setInterval(() => {
      if (user.id) {
        handleUpdateStats()
        
      } else {

      }
     
    }, 4000);

    return () => clearInterval(interval2);
  }, [user]);
  async function updateInventory() {
    try {
      const randomItem = items[Math.floor(Math.random() * items?.length)];
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


      
      await axios.post(`${urlrequest}/inventory/updateitems`, { userId: inventory._id, items: inventory.Items})
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
        Stats: {
          level: 0,
          experience: 0,
          health: 0,
          maxHealth: 0,
          mana: 0,
          maxMana: 0,
          strength: 0,
          dexterity: 0,
          constitution: 0,
          intelligence: 0,
          wisdom: 0,
          charisma: 0,

        }

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
          setStatsUser(playerarray.Stats)
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
            const datares = response.data;
            const username = datares.username;
            playerarray.push(username);
          }

        }

        if (playersid) {

          if (JSON.stringify(data) !== JSON.stringify(playersid)) {
            setPlayers(playerarray)
          } else {


          }
        } else {
          setPlayers(playerarray)
        }
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
          setMapsArray(data.Maps);
          setMap(data.Maps[0]);
          setScale(data.Maps[0]?.scale);
          getPlayers(data.players);
          setShowInfo(true);
          setPlayersid(data.players);
          setAllInventories(data.inventories);
          setPlayerLocation(data.PlayersPos);

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
  async function handleUpdateStats() {

    
    
    try {
      let statsnew ={...statsuser};
      statsnew.level = Math.floor((Math.sqrt(1 + 8 * statsnew.experience / 1000) - 1) / 2) + 1;

      
      const response = await axios.post(`${urlrequest}/inventory/updateitems`, { userId: inventory._id, items: inventory.Items, Stats: statsnew })

      console.log(response.data.Stats)
      
      getInventory()

    } catch (error) {
      console.error('Error updating inventory:', error);
    }
  };
  function handleAddItem(event) {
    const selectedId = event.target.value;
    handleAdd(selectedId)
  } 
  const handleUpdateQuantity = (index, quantityChange) => {
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

    updateSession({ Others: updatedRequests, players: updatedPlayers });

  }
  function makeRequest() {
    let updatedRequests = [...request];
    updatedRequests.push(user.id);
    updateSession({ Others: updatedRequests });
  }
  async function deletesession() {
    const response = await axios.get(`${urlrequest}/sessions/delete/${sessionid}`);


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

  const handleDragStart = (e, position) => {
    e.dataTransfer.setData('position', position);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, targetIndex) => {
    const newPosition = parseInt(e.dataTransfer.getData('position'));
    const updatedPlayerLocations = [...playerlocation];
    const draggedPlayerIndex = updatedPlayerLocations.findIndex(player => player.position === newPosition);

    if (draggedPlayerIndex !== -1) {
      updatedPlayerLocations[draggedPlayerIndex].position = targetIndex;
    }

    setPlayerLocation(updatedPlayerLocations);
    updateSession({ PlayersPos: updatedPlayerLocations });
  };
  function addplayerpos() {
    let playerspositions = [...playerlocation]
    const index = playersid.indexOf(user.id);
    const nameuser = players[index];

    playerspositions.push({ name: nameuser, position: parseInt(tileselected), id: user.id })
    updateSession({ PlayersPos: playerspositions });
  }
  function addnpcpos() {
    let playerspositions = [...playerlocation]
    const index = playersid.indexOf(user.id);
    const nameuser = players[index];

    playerspositions.push({ name: nameselected, position: parseInt(tileselected), id: user.id })
    setNameSelected('')
    updateSession({ PlayersPos: playerspositions });
  }
  function addmap() {
    let mapsdata = [...mapsarray]
    mapsdata.push({ name: nameselectedmap, url: urlselectedmap, id: user.id, scale: newscale })
    updateSession({ Maps: mapsdata }).then(() => {
      window.location.reload()
    });

  }
  function removemap(name) {
    let mapsdata = [...mapsarray];
    const index = mapsdata.findIndex(map => map.name === name);
    if (index !== -1) {
      mapsdata.splice(index, 1);
      updateSession({ Maps: mapsdata });
    } else {
      console.log("Map not found");
    }

  }
  function updateMap(index) {

    const newArray = [...mapsarray];

    const selectedMap = newArray.splice(index, 1)[0];

    newArray.unshift(selectedMap);

    updateSession({ Maps: newArray });
    setTimeout(() => {
      window.location.reload();
    }, 100);

  }
  const image = new Image();

  image.src = map?.url;
  image.onload = function () {
    // Calcula a largura da imagem que seja divisível por 60
    const width = (Math.ceil(image.width / 60) * 60);

    // Define a largura da imagem no estado
    setImageWidth(width);

  };
  const checkImageUrlValidity = (url) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img.width);
      img.onerror = () => reject(false);
      img.src = url;
    });
  };
  const handleUrlChange = async (e) => {
    const url = e;
    setUrlSelectedMap(url);
    try {
      const isValid = await checkImageUrlValidity(url).then(width => {
        setImageWidth(width);
      });
      setIsUrlValid(true);
    } catch (error) {
      setIsUrlValid(false);
    }
    setImgPrev(url)
  };
  return (
    <div className={styles.body} >

      {showinfo === true ?

        <div className={styles.infobody}>
          <div>
            ID da sessão: {sessionid}
          </div>
          {user?.id === playersid[0] ? <div>
            <button onClick={() => {
              deletesession()
            }}>
              Deletar sessão
            </button>
          </div> : null}
          <div style={{ marginTop: '10px' }}>
            Titulo do jogo: {title}

            {user?.id === playersid[0] ?
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
              </div> : null}
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
            {user?.id === playersid[0] ?
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
              </div> : null}
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
                  <h3>Seus Atributos</h3>
                  {inventory.Stats ? 
                  <div style={{display:'flex', flexDirection:'row'}} >
                    <div style={{display:'flex', flexDirection:'column'}}>
                      <p>
                        Seu level: {Math.floor((Math.sqrt(1 + 8 * statsuser.experience / 1000) - 1) / 2) + 1}
                      </p>
                      <p>
                       Experiência: {statsuser.experience}
                      </p>
                      <p>
                       Sua vida atual e máxima: {statsuser.health}/{statsuser.maxHealth}

                       <input type="range" id='barh'  min="0" max={statsuser.maxHealth} value={statsuser.health} readOnly />

                      </p>
                      <p>
                       Sua mana atual e máxima: {statsuser.mana}/{statsuser.maxMana}
                      
                       <input type="range" id='barm'  min="0" max={statsuser.maxMana} value={statsuser.mana} readOnly />
                       
                      </p>
                     
                    </div>
                    <div>
                      <p>

                      </p>
                    </div>

                  </div> : null}


                </div>
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
                          {item?.item?.name} <span>({item?.quantity} Unidade(s))</span>
                        </div>
                        {item?.item?.canequip ?
                          <div>
                            <div>
                              ATK: {item?.item?.def}
                            </div>
                            <div>
                              DEF: {item?.item?.atk}
                            </div>
                          </div> : null}
                        {item?.item?.cantrade ?
                          <div>
                            <div>
                              VALOR: {item?.item?.value} peças de bronze
                            </div>

                          </div> : null}




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

                <label htmlFor="cantrade">Pode ser negociado:</label><br />
                <input type="checkbox" id="cantrade" name="cantrade" checked={formData.cantrade} onChange={handleChange} /><br />

                {formData.cantrade ?
                  <div>


                    <label htmlFor="value">Valor:</label><br />
                    <input type="text" id="value" name="value" value={formData.value} onChange={handleChange} /><br /></div> : null}

                <label htmlFor="canequip">Pode ser equipado:</label><br />
                <input type="checkbox" id="canequip" name="canequip" checked={formData.canequip} onChange={handleChange} /><br />
                {formData.canequip ?
                  <div>

                    <label htmlFor="atk">Ataque:</label><br />
                    <input type="text" id="atk" name="atk" value={formData.atk} onChange={handleChange} /><br />

                    <label htmlFor="def">Defesa:</label><br />
                    <input type="text" id="def" name="def" value={formData.def} onChange={handleChange} /><br />

                    <p>Caso o equipamento tenha debuff ou buff, escreva o nome e em seguida o valor, por exemplo:
                      'slow-1' ou 'speed+2' ou 'sabedoria+4' ou 'destreza-1'. ESCREVA SEM ASPAS
                    </p>

                    <label htmlFor="buff1">Buff ou Debuff 1 :</label><br />
                    <input type="text" id="buff1" name="buff1" value={formData.buff1} onChange={handleChange} /><br />

                    <label htmlFor="buff2">Buff ou Debuff 2:</label><br />
                    <input type="text" id="buff2" name="buff2" value={formData.buff2} onChange={handleChange} /><br />

                    <label htmlFor="buff2">Buff ou Debuff 3:</label><br />
                    <input type="text" id="buff2" name="buff2" value={formData.buff2} onChange={handleChange} /><br />

                  </div> : null}

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
      {showinfo === true ?

        <div className={styles.mapbody}>
          <div className={styles.maptitle}>
            <div style={{ marginRight: '50px' }}>
              {playerlocation?.find(obj => obj.name === players[playersid?.indexOf(user?.id)]) && user?.id !== playersid[0] ?
                <div>

                  Você já criou seu personagem
                  <span style={{ fontWeight: 'bold', fontSize: '20px' }} >  {players[playersid?.indexOf(user.id)]} </span>,
                  ele se encontra no tile: {
                    playerlocation.find(obj => obj.name === players[playersid.indexOf(user.id)]) ?
                      playerlocation.find(obj => obj.name === players[playersid.indexOf(user.id)]).position
                      : null
                  }

                </div>
                :
                <div>
                  {user?.id === playersid[0] ?
                    <div>
                      Você é o <span style={{ fontWeight: 'bold', fontSize: '20px' }} >  MESTRE </span>

                      <div style={{ margin: '5px', border: '1px solid black', padding: '5px' }} >
                        <span style={{ fontWeight: 'bold', fontSize: '20px' }} > Crie NPC'S aqui </span>
                        <form>
                          Nome:
                          <input value={nameselected} onChange={(e) => {
                            setNameSelected(e.target.value)

                          }} />
                          Tile que o NPC irá aparecer
                          <input type='number' value={tileselected} onChange={(e) => {
                            setTileSelected(e.target.value)

                          }} />
                          <button onClick={() => {
                            addnpcpos()

                          }} > Adicionar NPC </button>
                        </form>
                        &nbsp;
                        <button onClick={() => {
                          updateSession({ PlayersPos: [] })

                        }} > Limpar mapa de npc e player </button>
                      </div>
                    </div>
                    :
                    <div>
                      <div>
                        Escolha o tile e clique para adicionar você (Não pode ter nenhum jogador ou npc em cima)
                        <div>
                          <form>
                            <input type='number' value={tileselected} onChange={(e) => {
                              setTileSelected(e.target.value)

                            }} />
                            <button onClick={() => {
                              addplayerpos()

                            }} > Adicionar </button>
                          </form>
                        </div>
                      </div>


                    </div>}


                </div>
              }


            </div>
            <div>

              Mapa de <span style={{ fontWeight: 'bold', fontSize: '20px' }} > {map?.name} </span>

              {user?.id === playersid[0] ?
                <div style={{ margin: '5px', border: '1px solid black', padding: '5px' }} >
                  Escolha um mapa:
                  {Array.isArray(mapsarray) && mapsarray.length > 0 && (
                    <div style={{ display: 'flex' }} >





                      <select style={{ marginRight: '10px' }} onChange={(e) => {
                        updateMap(e.target.selectedIndex)
                      }}>
                        {mapsarray.map((map, index) => (
                          <option key={index} value={{ name: map.name, url: map.url }}>
                            {map.name}
                          </option>
                        ))}
                      </select>
                      <button onClick={() => {
                        removemap(map?.name)
                      }} > Deletar Mapa Atual</button>
                      &nbsp;
                      <div> Escala do mapa: {scale}
                      </div>
                      <div>
                      </div>
                    </div>
                  )}


                  <div style={{ marginTop: '2px' }} >
                    <span style={{ fontWeight: 'bold', fontSize: '20px' }}>Crie um mapa novo</span>
                    <form style={{ display: 'flex' }} onSubmit={(e) => {
                      e.preventDefault()
                      if (isUrlValid) {
                        addmap()
                      } else {
                        alert('Link não é valido')
                      }
                    }}>
                      <div>

                        Nome:
                        <input value={nameselectedmap} onChange={(e) => {
                          setNameSelectedMap(e.target.value)

                        }} />
                      </div>
                      <div>

                        Url da foto do mapa:
                        <input value={urlselectedmap} onChange={(e) => {
                          setUrlSelectedMap(e.target.value)
                          handleUrlChange(e.target.value)
                        }} />
                      </div>
                      <div style={{}} >
                        Escala do mapa:
                        <input

                          value={newscale}
                          onChange={(e) => {
                            setNewScale(e.target.value);

                          }}
                        />
                        <div>
                          <input
                            step="0.01"
                            type="range"
                            min="0.1"
                            max="3"
                            value={newscale}
                            onChange={(e) => {
                              setNewScale(e.target.value);

                            }}
                            className={styles.slider}

                          />


                        </div>

                      </div>
                      <button disabled={!isUrlValid} > Adicionar Mapa </button>
                    </form>
                  </div>

                </div> : null}



            </div>




          </div>
          <div style={{ backgroundImage: imgprev ? `url('${imgprev}')` : `url('${map?.url}')`, backgroundSize: (nameselectedmap ? `${imageWidth * parseFloat(newscale)}px ${imageWidth * parseFloat(newscale)}px` : `${imageWidth * parseFloat(scale)}px ${imageWidth * parseFloat(scale)}px`), backgroundRepeat: 'no-repeat' }} className={styles.mapcontainer}>
            <div className={styles.mapgrid} style={{ position: 'relative' }}>
              {gridItems.map((_, index) => (
                <div
                  key={index}
                  className={styles.gridItem}
                  style={{

                    backgroundImage: `url('/path/to/your/background/image.jpg')`
                  }}
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, index)}
                >
                  Tile {index}
                </div>
              ))}
              {playerlocation.map((player, index) => (
                <div key={index}>

                  {player.id === user.id ?
                    <div

                      className={styles.gridPlayer}
                      style={{
                        backgroundImage: `url('/path/to/player/image.jpg')`, // Assuming you have a player image
                        position: 'absolute',
                        top: `calc(${Math.floor(player.position / 64)} * (100% / 64))`,
                        left: `calc(${player.position % 64} * (100% / 64))`,
                        width: '60px', // Adjust as needed
                        height: '60px', // Adjust as needed
                        border: player.id === user.id ? '1px solid red' : '1px solid blue',

                      }}
                      draggable
                      onDragStart={(e) => handleDragStart(e, player.position)}

                    >
                      {player.name}
                    </div>
                    :
                    <div

                      className={styles.gridPlayer}
                      style={{
                        backgroundImage: `url('/path/to/player/image.jpg')`, // Assuming you have a player image
                        position: 'absolute',
                        top: `calc(${Math.floor(player.position / 64)} * (100% / 64))`,
                        left: `calc(${player.position % 64} * (100% / 64))`,
                        width: '60px', // Adjust as needed
                        height: '60px', // Adjust as needed
                        border: player.id === user.id ? '1px solid red' : '1px solid blue',

                      }}

                      onDragStart={(e) => handleDragStart(e, player.position)}

                    >
                      {player.name}
                    </div>}



                </div>
              ))}
            </div>
          </div>
        </div>


        : null}

    </div>
  )
}