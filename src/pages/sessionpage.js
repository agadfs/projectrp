import { useParams } from 'react-router-dom';
import styles from './sessionpage.module.css'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAppContext } from '../AppContext';
import CloseFullscreenIcon from '@mui/icons-material/CloseFullscreen';
import ShieldIcon from '@mui/icons-material/Shield';

export default function SessionPage() {
  const [playersstatsarray, setPlayersStatsArray] = useState([]);
  const [counterget, setCountGet] = useState(0);
  const [showGrid, setShowGrid] = useState(false);
  const [showTile, setShowTile] = useState(false);
  const [takedmg, setTakeDmg] = useState('');
  const [takemana, setTakeMana] = useState('');
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
  const [playersid, setPlayersid] = useState([]);
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
    url: '',
    typewear: ''
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
    {
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
      atk: 0,
      def: 0,
      earing: '',
      head: '',
      lefthand: '',
      righthand: '',
      chest: '',
      ringleft: '',
      ringright: '',
      pants: '',
      othersleft: '',
      othersright: '',
      shoes: ''

    })



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

    setCountGet(previous => previous + 1);

    if (counterget + 1 === 3) {
      getInventoryAllUsers(playersid)
      setCountGet(0);
    }
  }, [user, playersid]);


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
  async function deleteInventoryItem2(newInv, updateddata) {

    try {


      await axios.post(`${urlrequest}/inventory/updateitems`, { userId: inventory._id, items: newInv })
      handleUpdateStats(updateddata);
      



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
      const response = await axios.get(`${urlrequest}/item`, {
        headers: {
          'Content-Type': 'application/json',
          'ngrok-skip-browser-warning': 'true'
        }
      });
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

      const response = await axios.get(`${urlrequest}/inventory/${userId}/${sessionid}`, {
        headers: {
          'Content-Type': 'application/json',
          'ngrok-skip-browser-warning': 'true'
        }
      });

      if (response.data) {
        let playerarray = response.data;
        if (playerarray.length > 0) {
          playerarray = playerarray[0];
          setInventory(playerarray);
          setStatsUser(playerarray.Stats)
        } else {
          
        }
      }
    } catch (error) {
      console.error('Error getting any inventory: ', error);
    }
  }
  async function getInventoryAllUsers(users) {
    try {
      const stats = [];

      for (const usersId of users) {
        const response = await axios.get(`${urlrequest}/inventory/${usersId}/${sessionid}`, {
          headers: {
            'Content-Type': 'application/json',
            'ngrok-skip-browser-warning': 'true'
          }
        });

        if (response.data) {
          const playerArray = response.data;

          if (playerArray.length > 0) {
            stats.push(playerArray[0]);
          } else {


          }
        }
      }
      setPlayersStatsArray(stats);




    } catch (error) {
      console.error('Error getting any inventory: ', error);
      throw error;
    }
  }

  async function getPlayers(data) {
    let playerarray = [];

    try {
      if (data) {
        for (let i = 0; i < data.length; i++) {

          const response = await axios.get(`${urlrequest}/users/${data[i]}`, {
            headers: {
              'Content-Type': 'application/json',
              'ngrok-skip-browser-warning': 'true'
            }
          });
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
      const response = await axios.get(`${urlrequest}/sessions/${sessionid}`, {
        headers: {
          'Content-Type': 'application/json',
          'ngrok-skip-browser-warning': 'true'
        }
      });
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
      getInventory()
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


    } catch (error) {
      console.error('Error updating inventory:', error);
    }
  };
  async function handleUpdateStats(stats) {
    let statsnew = stats;
    statsnew.level = Math.floor((Math.sqrt(1 + 8 * statsnew.experience / 1000) - 1) / 2) + 1;
    statsnew.maxHealth = (statsnew.level * 5) + (statsnew.strength * 10) + (statsnew.dexterity * 2) + (statsnew.constitution * 2) + 10;
    statsnew.maxMana = (statsnew.level * 5) + (statsnew.intelligence * 10) + (statsnew.wisdom * 2) + (statsnew.charisma * 2) + 10;
    statsnew.atk = (statsnew.level * 1) + (statsnew.strength * 0.2) + (statsnew.dexterity * 0.3) + 1;
    stats.def = (statsnew.level * 1) + (statsnew.strength * 0.3) + (statsnew.dexterity * 0.2) + (statsnew.constitution * 1) + 1;
    const equipmentSlots = ['earing', 'head', 'lefthand', 'righthand', 'chest', 'ringleft', 'ringright', 'pants', 'othersleft', 'othersright', 'shoes'];
    equipmentSlots.forEach(slot => {

      if (typeof statsnew[slot] === 'object') {

        statsnew.atk += !isNaN(parseInt(statsnew[slot].atk)) ? parseInt(statsnew[slot].atk) : 0;
        statsnew.def += !isNaN(parseInt(statsnew[slot].def)) ? parseInt(statsnew[slot].def) : 0;
      }
    });
    statsnew.atk = Math.round(statsnew.atk);
    statsnew.def = Math.round(statsnew.def);

    try {

      const response = await axios.post(`${urlrequest}/inventory/updateitems`, { userId: inventory._id, Stats: statsnew })

      if (response.data) {



      }


    } catch (error) {
      console.error('Error updating inventory:', error);
    }
  };
  function handleAddItem(event) {
    const selectedId = event.target.value;
    handleAdd(selectedId)
  }
  function handleAddItem2(event) {
    const selectedId = event;
    handleAdd(selectedId)
  }
  const handleUpdateQuantity2 = (index, quantityChange, updateddata) => {
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
    setInventory({ ...inventory, Items: updatedItems })

    deleteInventoryItem2(updatedItems, updateddata);



  };

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
    setInventory({ ...inventory, Items: updatedItems })

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
    const response = await axios.get(`${urlrequest}/sessions/delete/${sessionid}`, {
      headers: {
        'Content-Type': 'application/json',
        'ngrok-skip-browser-warning': 'true'
      }
    });


    window.location.href = '/'
  }

  async function getName(data) {
    let playerarray = [];

    try {
      if (data) {
        for (let i = 0; i < data.length; i++) {

          const response = await axios.get(`${urlrequest}/users/${data[i]}`, {
            headers: {
              'Content-Type': 'application/json',
              'ngrok-skip-browser-warning': 'true'
            }
          });
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
  function HealthBar({ useridfind, playersstatsarray }) {
    // Attempt to find the player stats by the given user ID
    const playerStats = playersstatsarray.find(player => player.ownerId === useridfind);


    if (playerStats && playerStats.Stats) {
      const { health, maxHealth } = playerStats.Stats;
      // Render the health bar with the found health and maxHealth values
      return (
        <div >
          <div>
            Level: {playerStats.Stats.level}
          </div>
          <div style={{ position: 'relative', top: '70px', left: '5px' }} >

            <input
              style={{ width: '100%', maxWidth: '40px', height: '5px' }}
              type="range"
              id='barh'
              min="0"
              max={maxHealth}
              value={health}
              readOnly
            />{health}/{maxHealth}
          </div>
        </div>
      );
    } else {
      // Return null or a fallback UI when no matching stats are found
      return null;
    }
  }
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
          <div >


            {inventory === undefined || inventory.length === 0 ? (
              <button onClick={() => {
                createInventory()
              }} >Criar inventário</button>
            ) : (
              <div style={{
                height: '100%', display: 'flex', maxWidth: '100%', gap: '10px', flexWrap: 'wrap', border: '3px solid black',
                padding: '10px', borderRadius: '5px', flexDirection: 'column'
              }}>

                <div style={{ display: 'flex', flexDirection: 'column', padding: '0' }} >
                  <h3>Seus Atributos</h3>
                  {inventory.Stats ?
                    <div style={{ display: 'flex', flexDirection: 'row' }} >
                      <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                        <div>
                          Seu level: {statsuser.level}
                        </div>
                        <div>
                          Experiência: 
                          <input
                            style={{ width: '10%', minWidth: '15px' }}
                            value={statsuser.experience} onChange={(e) => {

                              const updatedUser = { ...statsuser };


                              updatedUser.experience = parseInt(e.target.value, 10) || 0;


                              setStatsUser(updatedUser);
                              handleUpdateStats(updatedUser);
                            }} />
                          
                          
                        </div>
                        <div>
                          Vida atual e máxima: {statsuser.health}/{statsuser.maxHealth}

                          <input style={{ width: '100%', maxWidth: '150px' }} type="range" id='barh' min="0" max={statsuser.maxHealth} value={statsuser.health} readOnly />

                        </div>
                        <div>
                          Mana atual e máxima: {statsuser.mana}/{statsuser.maxMana}
                          <input style={{ width: '100%', maxWidth: '150px' }} type="range" id='barm' min="0" max={statsuser.maxMana} value={statsuser.mana} readOnly />
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', marginBlock: '5px', width: '60%', gap: '5px', border: '1px solid black', padding: '5px', borderRadius: '5px' }} >
                          Tomar dano
                          <input placeholder='Valor do dano' value={takedmg} onChange={(e) => {
                            setTakeDmg(parseInt(e.target.value))
                          }} />
                          <button onClick={() => {
                            const updatedUser = { ...statsuser };
                            updatedUser.health -= takedmg;
                            if (updatedUser.health < 0) {
                              updatedUser.health = 0;
                            }
                            setStatsUser(updatedUser);
                            handleUpdateStats(updatedUser);
                            setTakeDmg('')
                          }} >Acionar dano tomado</button>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', marginBlock: '5px', width: '60%', gap: '5px', border: '1px solid black', padding: '5px', borderRadius: '5px' }} >
                          Gastar mana
                          <input placeholder='Valor do dano' value={takemana} onChange={(e) => {
                            setTakeMana(parseInt(e.target.value))
                          }} />
                          <button onClick={() => {
                            const updatedUser = { ...statsuser };
                            updatedUser.mana -= takemana;
                            if (updatedUser.mana < 0) {
                              updatedUser.mana = 0;
                            }
                            setStatsUser(updatedUser);
                            handleUpdateStats(updatedUser);
                            setTakeMana('')
                          }} >Acionar gasto de mana</button>
                        </div>

                      </div>
                      <div style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
                        <div style={{ width: '100%', justifyContent: 'flex-end', display: 'flex' }}>
                          Força:
                          <input
                            style={{ width: '10%', minWidth: '15px' }}
                            value={statsuser.strength} onChange={(e) => {

                              const updatedUser = { ...statsuser };


                              updatedUser.strength = parseInt(e.target.value, 10) || 0;


                              setStatsUser(updatedUser);
                              handleUpdateStats(updatedUser);
                            }} />
                        </div>
                        <div style={{ width: '100%', justifyContent: 'flex-end', display: 'flex' }}>
                          Destreza:
                          <input
                            style={{ width: '10%', minWidth: '15px' }}
                            value={statsuser.dexterity}
                            onChange={(e) => {
                              const updatedUser = { ...statsuser };
                              updatedUser.dexterity = parseInt(e.target.value, 10) || 0;
                              setStatsUser(updatedUser);
                              handleUpdateStats(updatedUser);
                            }}
                          />

                        </div>
                        <div style={{ width: '100%', justifyContent: 'flex-end', display: 'flex' }}>
                          Constituição:
                          <input
                            style={{ width: '10%', minWidth: '15px' }}
                            value={statsuser.constitution}
                            onChange={(e) => {
                              const updatedUser = { ...statsuser };
                              updatedUser.constitution = parseInt(e.target.value, 10) || 0;
                              setStatsUser(updatedUser);
                              handleUpdateStats(updatedUser);
                            }}
                          />

                        </div>
                        <div style={{ width: '100%', justifyContent: 'flex-end', display: 'flex' }}>
                          Inteligência:
                          <input
                            style={{ width: '10%', minWidth: '15px' }}
                            value={statsuser.intelligence}
                            onChange={(e) => {
                              const updatedUser = { ...statsuser };
                              updatedUser.intelligence = parseInt(e.target.value, 10) || 0;
                              setStatsUser(updatedUser);
                              handleUpdateStats(updatedUser);
                            }}
                          />

                        </div>
                        <div style={{ width: '100%', justifyContent: 'flex-end', display: 'flex' }}>
                          Sabedoria:
                          <input
                            style={{ width: '10%', minWidth: '15px' }}
                            value={statsuser.wisdom}
                            onChange={(e) => {
                              const updatedUser = { ...statsuser };
                              updatedUser.wisdom = parseInt(e.target.value, 10) || 0;
                              setStatsUser(updatedUser);
                              handleUpdateStats(updatedUser);
                            }}
                          />

                        </div>
                        <div style={{ width: '100%', justifyContent: 'flex-end', display: 'flex' }}>
                          Carisma:
                          <input
                            style={{ width: '10%', minWidth: '15px' }}
                            value={statsuser.charisma}
                            onChange={(e) => {
                              const updatedUser = { ...statsuser };
                              updatedUser.charisma = parseInt(e.target.value, 10) || 0;
                              setStatsUser(updatedUser);
                              handleUpdateStats(updatedUser);
                            }}
                          />

                        </div>
                        <div style={{ width: '100%', justifyContent: 'flex-end', display: 'flex' }}>
                          Atk:
                          <input
                            style={{ width: '10%', minWidth: '15px' }}
                            value={statsuser.atk}
                            onChange={(e) => {
                              const updatedUser = { ...statsuser };
                              updatedUser.atk = parseInt(e.target.value, 10) || 0;
                              setStatsUser(updatedUser);
                              handleUpdateStats(updatedUser);
                            }}
                          />

                        </div>
                        <div style={{ width: '100%', justifyContent: 'flex-end', display: 'flex' }}>
                          Def:
                          <input
                            style={{ width: '10%', minWidth: '15px' }}
                            value={statsuser.def}
                            onChange={(e) => {
                              const updatedUser = { ...statsuser };
                              updatedUser.def = parseInt(e.target.value, 10) || 0;
                              setStatsUser(updatedUser);
                              handleUpdateStats(updatedUser);
                            }}
                          />

                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '20px' }} >

                          <button type='button' onClick={() => {
                            const updatedUser = { ...statsuser };
                            updatedUser.health = updatedUser.maxHealth;
                            setStatsUser(updatedUser);
                            handleUpdateStats(updatedUser);
                          }}> Encher Vida</button>
                          <button type='button' onClick={() => {
                            const updatedUser = { ...statsuser };
                            updatedUser.mana = updatedUser.maxMana;
                            setStatsUser(updatedUser);
                            handleUpdateStats(updatedUser);
                          }}> Encher Mana</button>

                        </div>
                      </div>


                    </div> : null}


                </div>
                {inventory.Stats ?
                  <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignContent: 'center', width: '100%', alignItems: 'center', gap: '20px' }}>
                    <div style={{ display: 'flex', gap: '20px' }} >
                      {statsuser.earing?.atk ?
                        <div className={styles.slots} onClick={() => {
                          const updatedUser = { ...statsuser };
                          const index = items.findIndex(item => item.name === statsuser.earing?.name);
                          if (index !== -1) {

                            updatedUser.earing = '';
                            handleUpdateStats(updatedUser);
                            handleAddItem2(index);
                            setStatsUser(updatedUser);



                          } else {
                            console.log('Item not found!');
                          }

                        }} style={{ display: 'flex', width: '100%', flexDirection: 'column' }}>
                          <img src={statsuser?.earing?.url} alt="Item Image" style={{ maxWidth: '50px', height: 'auto', alignSelf: 'center' }} />
                          <div style={{ display: 'flex', justifyContent: 'center', alignContent: 'center', width: '100%' }}  >
                            <div  >
                              <CloseFullscreenIcon />{statsuser.earing?.atk}
                            </div>
                            <div>
                              <ShieldIcon />{statsuser.earing?.def}
                            </div>

                          </div>
                          <div style={{ display: 'flex', alignSelf: 'center' }} >
                            brinco
                          </div>
                        </div> :
                        <div className={styles.slots} style={{
                          width: '50px', height: '50px',
                          display: 'flex', justifyContent: 'center', padding: '2px', fontSize: '12px'
                        }} >
                          Brinco </div>}


                      {statsuser.head?.atk ?
                        <div className={styles.slots} onClick={() => {
                          const updatedUser = { ...statsuser };
                          const index = items.findIndex(item => item.name === statsuser.head?.name);
                          if (index !== -1) {

                            updatedUser.head = '';
                            handleUpdateStats(updatedUser);
                            handleAddItem2(index);
                            setStatsUser(updatedUser);

                          } else {
                            console.log('Item not found!');
                          }

                        }} style={{ display: 'flex', width: '100%', flexDirection: 'column' }}>
                          <img src={statsuser?.head?.url} alt="Item Image" style={{ maxWidth: '50px', height: 'auto', alignSelf: 'center' }} />
                          <div style={{ display: 'flex', justifyContent: 'center', alignContent: 'center', width: '100%' }}  >
                            <div  >
                              <CloseFullscreenIcon />{statsuser.head?.atk}
                            </div>
                            <div>
                              <ShieldIcon />{statsuser.head?.def}
                            </div>

                          </div>
                          <div style={{ display: 'flex', alignSelf: 'center' }} >
                            Capacete
                          </div>
                        </div> :
                        <div className={styles.slots} style={{
                          width: '50px', height: '50px',
                          display: 'flex', justifyContent: 'center', padding: '2px', fontSize: '12px'
                        }} >
                          Capacete </div>}

                    </div>
                    <div style={{ display: 'flex', gap: '20px' }} >

                      {statsuser.lefthand?.atk ?
                        <div className={styles.slots} onClick={() => {
                          const updatedUser = { ...statsuser };
                          const index = items.findIndex(item => item.name === statsuser.lefthand?.name);
                          if (index !== -1) {

                            updatedUser.lefthand = '';
                            handleUpdateStats(updatedUser);
                            handleAddItem2(index);
                            setStatsUser(updatedUser);

                          } else {
                            console.log('Item not found!');
                          }

                        }} style={{ display: 'flex', width: '100%', flexDirection: 'column' }}>
                          <img src={statsuser?.lefthand?.url} alt="Item Image" style={{ maxWidth: '50px', height: 'auto', alignSelf: 'center' }} />
                          <div style={{ display: 'flex', justifyContent: 'center', alignContent: 'center', width: '100%' }}  >
                            <div  >
                              <CloseFullscreenIcon />{statsuser.lefthand?.atk}
                            </div>
                            <div>
                              <ShieldIcon />{statsuser.lefthand?.def}
                            </div>

                          </div>
                          <div style={{ display: 'flex', alignSelf: 'center' }} >
                            Mão esquerda
                          </div>
                        </div> :
                        <div className={styles.slots} style={{
                          width: '50px', height: '50px',
                          display: 'flex', justifyContent: 'center', padding: '2px', fontSize: '12px'
                        }} >
                          Mão esquerda </div>}


                      {statsuser.chest?.atk ?
                        <div className={styles.slots} onClick={() => {
                          const updatedUser = { ...statsuser };
                          const index = items.findIndex(item => item.name === statsuser.chest?.name);
                          if (index !== -1) {

                            updatedUser.chest = '';
                            handleUpdateStats(updatedUser);
                            handleAddItem2(index);
                            setStatsUser(updatedUser);

                          } else {
                            console.log('Item not found!');
                          }

                        }} style={{ display: 'flex', width: '100%', flexDirection: 'column' }}>
                          <img src={statsuser?.chest?.url} alt="Item Image" style={{ maxWidth: '50px', height: 'auto', alignSelf: 'center' }} />
                          <div style={{ display: 'flex', justifyContent: 'center', alignContent: 'center', width: '100%' }}  >
                            <div  >
                              <CloseFullscreenIcon />{statsuser.chest?.atk}
                            </div>
                            <div>
                              <ShieldIcon />{statsuser.chest?.def}
                            </div>

                          </div>
                          <div style={{ display: 'flex', alignSelf: 'center' }} >
                            Tronco
                          </div>
                        </div> :
                        <div className={styles.slots} style={{
                          width: '50px', height: '50px',
                          display: 'flex', justifyContent: 'center', padding: '2px', fontSize: '12px'
                        }} >
                          Tronco </div>}



                      {statsuser.righthand?.atk ?
                        <div className={styles.slots} onClick={() => {
                          const updatedUser = { ...statsuser };
                          const index = items.findIndex(item => item.name === statsuser.righthand?.name);
                          if (index !== -1) {

                            updatedUser.righthand = '';
                            handleUpdateStats(updatedUser);
                            handleAddItem2(index);
                            setStatsUser(updatedUser);

                          } else {
                            console.log('Item not found!');
                          }

                        }} style={{ display: 'flex', width: '100%', flexDirection: 'column' }}>
                          <img src={statsuser?.righthand?.url} alt="Item Image" style={{ maxWidth: '50px', height: 'auto', alignSelf: 'center' }} />
                          <div style={{ display: 'flex', justifyContent: 'center', alignContent: 'center', width: '100%' }}  >
                            <div  >
                              <CloseFullscreenIcon />{statsuser.righthand?.atk}
                            </div>
                            <div>
                              <ShieldIcon />{statsuser.righthand?.def}
                            </div>

                          </div>
                          <div style={{ display: 'flex', alignSelf: 'center' }} >
                            Mão direita
                          </div>
                        </div> :
                        <div className={styles.slots} style={{
                          width: '50px', height: '50px',
                          display: 'flex', justifyContent: 'center', padding: '2px', fontSize: '12px'
                        }} >
                          Mão direita </div>}
                    </div>
                    <div style={{ display: 'flex', gap: '20px' }} >

                      {statsuser.ringleft?.atk ?
                        <div className={styles.slots} onClick={() => {
                          const updatedUser = { ...statsuser };
                          const index = items.findIndex(item => item.name === statsuser.ringleft?.name);
                          if (index !== -1) {

                            updatedUser.ringleft = '';
                            handleUpdateStats(updatedUser);
                            handleAddItem2(index);
                            setStatsUser(updatedUser);

                          } else {
                            console.log('Item not found!');
                          }

                        }} style={{ display: 'flex', width: '100%', flexDirection: 'column' }}>
                          <img src={statsuser?.ringleft?.url} alt="Item Image" style={{ maxWidth: '50px', height: 'auto', alignSelf: 'center' }} />
                          <div style={{ display: 'flex', justifyContent: 'center', alignContent: 'center', width: '100%' }}  >
                            <div  >
                              <CloseFullscreenIcon />{statsuser.ringleft?.atk}
                            </div>
                            <div>
                              <ShieldIcon />{statsuser.ringleft?.def}
                            </div>

                          </div>
                          <div style={{ display: 'flex', alignSelf: 'center' }} >
                            Anel esquerdo
                          </div>
                        </div> :
                        <div className={styles.slots} style={{
                          width: '50px', height: '50px',
                          display: 'flex', justifyContent: 'center', padding: '2px', fontSize: '12px'
                        }} >
                          Anel esquerdo </div>}



                      {statsuser.pants?.atk ?
                        <div className={styles.slots} onClick={() => {
                          const updatedUser = { ...statsuser };
                          const index = items.findIndex(item => item.name === statsuser.pants?.name);
                          if (index !== -1) {
                            updatedUser.pants = '';
                            handleUpdateStats(updatedUser);
                            handleAddItem2(index);
                            setStatsUser(updatedUser);
                          } else {
                            console.log('Item not found!');
                          }

                        }} style={{ display: 'flex', width: '100%', flexDirection: 'column' }}>
                          <img src={statsuser?.pants?.url} alt="Item Image" style={{ maxWidth: '50px', height: 'auto', alignSelf: 'center' }} />
                          <div style={{ display: 'flex', justifyContent: 'center', alignContent: 'center', width: '100%' }}  >
                            <div  >
                              <CloseFullscreenIcon />{statsuser.pants?.atk}
                            </div>
                            <div>
                              <ShieldIcon />{statsuser.pants?.def}
                            </div>

                          </div>
                          <div style={{ display: 'flex', alignSelf: 'center' }} >
                            Calça
                          </div>
                        </div> :
                        <div className={styles.slots} style={{
                          width: '50px', height: '50px',
                          display: 'flex', justifyContent: 'center', padding: '2px', fontSize: '12px'
                        }} >
                          Calça </div>}


                      {statsuser.ringright?.atk ?
                        <div className={styles.slots} onClick={() => {
                          const updatedUser = { ...statsuser };
                          const index = items.findIndex(item => item.name === statsuser.ringright?.name);
                          if (index !== -1) {

                            updatedUser.ringright = '';
                            handleUpdateStats(updatedUser);
                            handleAddItem2(index);
                            setStatsUser(updatedUser);

                          } else {
                            console.log('Item not found!');
                          }

                        }} style={{ display: 'flex', width: '100%', flexDirection: 'column' }}>
                          <img src={statsuser?.ringright?.url} alt="Item Image" style={{ maxWidth: '50px', height: 'auto', alignSelf: 'center' }} />
                          <div style={{ display: 'flex', justifyContent: 'center', alignContent: 'center', width: '100%' }}  >
                            <div  >
                              <CloseFullscreenIcon />{statsuser.ringright?.atk}
                            </div>
                            <div>
                              <ShieldIcon />{statsuser.ringright?.def}
                            </div>

                          </div>
                          <div style={{ display: 'flex', alignSelf: 'center' }} >
                            Anel direito
                          </div>
                        </div> :
                        <div className={styles.slots} style={{
                          width: '50px', height: '50px',
                          display: 'flex', justifyContent: 'center', padding: '2px', fontSize: '12px'
                        }} >
                          Anel direito </div>}
                    </div>
                    <div style={{ display: 'flex', gap: '20px' }} >

                      {statsuser.othersleft?.atk ?
                        <div className={styles.slots} onClick={() => {
                          const updatedUser = { ...statsuser };
                          const index = items.findIndex(item => item.name === statsuser.othersleft?.name);
                          if (index !== -1) {

                            updatedUser.othersleft = '';
                            handleUpdateStats(updatedUser);
                            handleAddItem2(index);
                            setStatsUser(updatedUser);

                          } else {
                            console.log('Item not found!');
                          }

                        }} style={{ display: 'flex', width: '100%', flexDirection: 'column' }}>
                          <img src={statsuser?.othersleft?.url} alt="Item Image" style={{ maxWidth: '50px', height: 'auto', alignSelf: 'center' }} />
                          <div style={{ display: 'flex', justifyContent: 'center', alignContent: 'center', width: '100%' }}  >
                            <div  >
                              <CloseFullscreenIcon />{statsuser.othersleft?.atk}
                            </div>
                            <div>
                              <ShieldIcon />{statsuser.othersleft?.def}
                            </div>

                          </div>
                          <div style={{ display: 'flex', alignSelf: 'center' }} >
                            Utensilios esquerdo
                          </div>
                        </div> :
                        <div className={styles.slots} style={{
                          width: '50px', height: '50px',
                          display: 'flex', justifyContent: 'center', padding: '2px', fontSize: '12px'
                        }} >
                          Utensilios esquerdo </div>}




                      {statsuser.shoes?.atk ?
                        <div className={styles.slots} onClick={() => {
                          const updatedUser = { ...statsuser };
                          const index = items.findIndex(item => item.name === statsuser.shoes?.name);
                          if (index !== -1) {

                            updatedUser.shoes = '';
                            handleUpdateStats(updatedUser);
                            handleAddItem2(index);
                            setStatsUser(updatedUser);

                          } else {
                            console.log('Item not found!');
                          }

                        }} style={{ display: 'flex', width: '100%', flexDirection: 'column' }}>
                          <img src={statsuser?.shoes?.url} alt="Item Image" style={{ maxWidth: '50px', height: 'auto', alignSelf: 'center' }} />
                          <div style={{ display: 'flex', justifyContent: 'center', alignContent: 'center', width: '100%' }}  >
                            <div  >
                              <CloseFullscreenIcon />{statsuser.shoes?.atk}
                            </div>
                            <div>
                              <ShieldIcon />{statsuser.shoes?.def}
                            </div>

                          </div>
                          <div style={{ display: 'flex', alignSelf: 'center' }} >
                            Sapato
                          </div>
                        </div> :
                        <div className={styles.slots} style={{
                          width: '50px', height: '50px',
                          display: 'flex', justifyContent: 'center', padding: '2px', fontSize: '12px'
                        }} >
                          Sapato </div>}


                      {statsuser.othersright?.atk ?
                        <div className={styles.slots} onClick={() => {
                          const updatedUser = { ...statsuser };
                          const index = items.findIndex(item => item.name === statsuser.othersright?.name);
                          if (index !== -1) {

                            updatedUser.othersright = '';
                            handleUpdateStats(updatedUser);
                            handleAddItem2(index);
                            setStatsUser(updatedUser);

                          } else {
                            console.log('Item not found!');
                          }

                        }} style={{ display: 'flex', width: '100%', flexDirection: 'column' }}>
                          <img src={statsuser?.othersright?.url} alt="Item Image" style={{ maxWidth: '50px', height: 'auto', alignSelf: 'center' }} />
                          <div style={{ display: 'flex', justifyContent: 'center', alignContent: 'center', width: '100%' }}  >
                            <div  >
                              <CloseFullscreenIcon />{statsuser.othersright?.atk}
                            </div>
                            <div>
                              <ShieldIcon />{statsuser.othersright?.def}
                            </div>

                          </div>
                          <div style={{ display: 'flex', alignSelf: 'center' }} >
                            Utensilios direito
                          </div>
                        </div> :
                        <div className={styles.slots} style={{
                          width: '50px', height: '50px',
                          display: 'flex', justifyContent: 'center', padding: '2px', fontSize: '12px'
                        }} >
                          Utensilios direito </div>}
                    </div>
                  </div> : null}

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
                    <label htmlFor="typewear">Onde é equipavel:</label><br />
                    <select id="typewear" name="typewear" value={formData.typewear} onChange={handleChange}>
                      <option value="">Selecione uma opção</option>
                      <option value="earing">Earring</option>
                      <option value="head">Head</option>
                      <option value="lefthand">Left Hand</option>
                      <option value="righthand">Right Hand</option>
                      <option value="chest">Chest</option>
                      <option value="ringleft">Ring Left</option>
                      <option value="ringright">Ring Right</option>
                      <option value="pants">Pants</option>
                      <option value="othersleft">Others Left</option>
                      <option value="othersright">Others Right</option>
                      <option value="shoes">Shoes</option>
                    </select>

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
                        <form style={{}} >
                          <div>

                            Nome:
                            <input value={nameselected} onChange={(e) => {
                              setNameSelected(e.target.value)

                            }} />
                          </div>

                          <div >

                            Tile que o NPC irá aparecer
                            <input style={{ width: '10%', minWidth: '15px' }} type='number' value={tileselected} onChange={(e) => {
                              setTileSelected(e.target.value)

                            }} />


                          </div>
                          <button onClick={() => {
                            addnpcpos()

                          }} > Adicionar NPC </button>
                        </form>

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
              <button onClick={() => {
                setShowGrid(!showGrid)
              }}>Mostrar quadriculados do mapa</button>
              <button onClick={() => {
                setShowTile(!showTile)
              }} >Mostrar numero dos tiles</button>
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
                    color: showTile ? 'rgba(236, 233, 233, 0.718)' : 'rgba(236, 233, 233, 0)',
                    border: showGrid ? '1px solid rgba(236, 233, 233, 0.718)' : 'none',
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
                      <div style={{ color: 'white', position: 'relative', top: '-30px' }} >

                        {player.name}
                        <HealthBar useridfind={player.id} playersstatsarray={playersstatsarray} />
                      </div>
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
                     <div style={{color:'white', position:'relative', top:'-30px'}} >

                        {player.name}
                        <HealthBar useridfind={player.id} playersstatsarray={playersstatsarray} />
                      </div>
                    </div>}
                </div>
              ))}
            </div>
          </div>
          <div style={{ position: 'absolute', top: '1200px', maxWidth: '800px' }} >
            <h1 style={{ fontFamily: 'sans-serif' }} > SEU INVENTARIO </h1>
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
            <div style={{ width: '100%', display: 'flex', gap: '25px', flexWrap: 'wrap' }} >
              {inventory?.Items?.map((item, index) => (
                <div
                  className={styles.slotsinv}
                  style={{ maxWidth: '200px', gap: '5px', padding: '5px', borderRadius: '5px', justifyContent: 'space-between', display: 'flex', flexDirection: 'column' }} key={index}>
                  {item?.item?.url ? (
                    <div onClick={() => {
                      if (item?.item?.canequip) {
                        const types = item?.item?.typewear;
                        const updatedUser = { ...statsuser };
                        if (updatedUser[types]) {
                          alert('Desequipe primeiro o item!')
                        } else {
                          updatedUser[types] = inventory?.Items[index].item;
                          handleUpdateQuantity2(index, -1, updatedUser);
                          setStatsUser(updatedUser);



                        }
                      }
                    }} style={{ display: 'flex', justifyContent: 'center' }} >
                      <img src={item?.item?.url} alt="Item Image" style={{ maxWidth: '100px', height: 'auto' }} />

                    </div>
                  ) : null}

                  <div>
                    {item?.item?.name} (<span style={{ fontWeight: 'bold', fontSize: '22px' }}  >{item?.quantity} </span>Unidade(s))
                  </div>
                  {item?.item?.canequip ?
                    <div>
                      <div>
                        <span style={{ fontWeight: 'bold', fontSize: '22px' }}  >
                          {item?.item?.typewear}
                        </span>

                      </div>
                      <div>
                        <CloseFullscreenIcon />  <span style={{ fontWeight: 'bold', fontSize: '22px' }}  >
                          {item?.item?.atk}
                        </span> de ATK
                      </div>
                      <div  >
                        <ShieldIcon /> <span style={{ fontWeight: 'bold', fontSize: '22px' }}  >
                          {item?.item?.def}
                        </span> de DEF
                      </div>
                    </div> : null}
                  {item?.item?.cantrade ?
                    <div>
                      <div>
                        VALOR:  &nbsp;

                        <span style={{ fontWeight: 'bold', fontSize: '22px' }}  >
                          {item?.item?.value}
                        </span>
                        &nbsp; Peças de bronze
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

          </div>

        </div>


        : null}


    </div>
  )
}