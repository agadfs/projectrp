import { useParams } from 'react-router-dom';
import styles from './sessionpage.module.css'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAppContext } from '../AppContext';
import CloseFullscreenIcon from '@mui/icons-material/CloseFullscreen';
import ShieldIcon from '@mui/icons-material/Shield';
import CircularProgress from '@mui/material/CircularProgress';
import { PiCoinsBold } from 'react-icons/pi';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import NpcCreate from '../components/npccreate';
export default function SessionPage() {


  const [randomText, setRandomText] = useState('');
  const [isLoading, setIsLoading] = useState(true);
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
  const gridItems = Array.from({ length: 4096 }); /* 64 x 64 */
  const [titulo, setTitulo] = useState('');
  const { sessionid } = useParams();
  const { user, urlrequest, randomStrings } = useAppContext();
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
    typewear: '',
    weight: '',
    rpgbook: '',
    strength: 0,
    dexterity: 0,
    constitution: 0,
    intelligence: 0,
    wisdom: 0,
    charisma: 0,
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
  const [statsuserequip, setStatsUserEquip] = useState(
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
    const randomIndex = Math.floor(Math.random() * randomStrings.length);
    setRandomText(randomStrings[randomIndex]);

    setTimeout(() => {
      setIsLoading(false);
    }, 2000);


  }, []);



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

        },


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
        let playerarrays = response.data;
        if (playerarrays.length > 0) {
          let playerarray = playerarrays[0];
          setInventory(playerarray);
          console.log(playerarray);
          setStatsUser(playerarray.Stats);
          handleUpdateStats(playerarray.Stats);
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
    let equipstats = { ...statsnew };
    equipstats.atk = 0;
    equipstats.def = 0;
    equipstats.strength = 0;
    equipstats.dexterity = 0;
    equipstats.wisdom = 0;
    equipstats.constitution = 0;
    equipstats.intelligence = 0;
    equipstats.charisma = 0;

    const equipmentSlots = ['earing', 'head', 'lefthand', 'righthand', 'chest', 'ringleft', 'ringright', 'pants', 'othersleft', 'othersright', 'shoes'];
    equipmentSlots.forEach(slot => {

      if (typeof statsnew[slot] === 'object') {
        equipstats.atk += !isNaN(parseInt(equipstats[slot].atk)) ? parseInt(equipstats[slot].atk) : 0;
        equipstats.def += !isNaN(parseInt(equipstats[slot].def)) ? parseInt(equipstats[slot].def) : 0;
        equipstats.strength += !isNaN(parseInt(equipstats[slot].strength)) ? parseInt(equipstats[slot].strength) : 0;
        equipstats.dexterity += !isNaN(parseInt(equipstats[slot].dexterity)) ? parseInt(equipstats[slot].dexterity) : 0;
        equipstats.wisdom += !isNaN(parseInt(equipstats[slot].wisdom)) ? parseInt(equipstats[slot].wisdom) : 0;
        equipstats.constitution += !isNaN(parseInt(equipstats[slot].constitution)) ? parseInt(equipstats[slot].constitution) : 0;
        equipstats.intelligence += !isNaN(parseInt(equipstats[slot].intelligence)) ? parseInt(equipstats[slot].intelligence) : 0;
        equipstats.charisma += !isNaN(parseInt(equipstats[slot].charisma)) ? parseInt(equipstats[slot].charisma) : 0;
      }
    });


    setStatsUserEquip(equipstats);


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
  function GoldCoinBag() {
    return (
      <img
        src='https://png.pngtree.com/png-vector/20230131/ourmid/pngtree-gold-coin-bag-png-image_6204484.png'
        width={60}
        style={{ position: 'relative', top: '20px' }}
        alt="Gold Coin Bag"
      />
    );
  }
  return (
    <div className={styles.body} >

      {showinfo === true && !isLoading ?

        <div className={styles.infobody}>
          <div className={styles.rpgdiv1}>
            ID da sessão: {sessionid}
            {user?.id === playersid[0] ? <div>
              <button onClick={() => {
                deletesession()

              }} className={styles.pushable}>
                <span style={{ fontSize: '10px', width: '116px' }} className={styles.edge}></span>
                <span style={{ fontSize: '12px', width: '90px' }} className={styles.front}>
                  Deletar sessão
                </span>
              </button>

            </div> : null}
          </div>
          <div className={styles.rpgdiv1} style={{ marginTop: '10px' }}>
            <div style={{ justifyContent: 'center', width: '100%', display: 'flex' }} className={styles.medievalsharp}>
              Titulo do jogo: {title}

            </div>

            {user?.id === playersid[0] ?
              <div  >
                <form style={{ width: '100%', justifyContent: 'center', display: 'flex' }}>
                  <input style={{ borderRadius: '5px', backgroundColor: 'hsl(34, 97%, 31%)', color: 'white', fontWeight: 'bold', maxWidth: '250px' }} value={titulo} onChange={(e) => {
                    setTitulo(e.target.value)
                  }} />

                  <button style={{ maxHeight: '50px' }} onClick={() => {
                    if (titulo && titulo.length > 5 && titulo !== title) {
                      updateSession({ title: titulo });
                    } else {
                      alert('O titulo tem que ser maior que 5 caracteres, e diferente do titulo anterior')
                    }
                  }} className={styles.pushable}>
                    <span style={{ fontSize: '12px', width: '136px', height: '50px' }} className={styles.edge}></span>
                    <span style={{ fontSize: '12px', width: '110px', height: '25px' }} className={styles.front}>
                      Mudar nome da sessão
                    </span>
                  </button>


                </form>
              </div> : null}
          </div>
          <div style={{ marginTop: '10px', gap: '10px', display: 'flex', flexDirection: 'column', marginBottom: '10px' }}>
            <div className={styles.rpgdiv1} style={{ height: '100%', display: 'flex', gap: '10px', flexWrap: 'wrap', justifyContent: 'center' }}>
              <h1 style={{ justifyContent: 'center', width: '100%', display: 'flex' }} className={styles.medievalsharp}> Jogadores  </h1>
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
              <div className={styles.rpgdiv1} style={{ marginTop: '10px', gap: '10px', display: 'flex', flexDirection: 'column', marginBottom: '10px' }}>
                <h1 style={{ justifyContent: 'center', width: '100%', display: 'flex' }} className={styles.medievalsharp}> Solicitações para entrar  </h1>
                <div style={{ height: '100%', display: 'flex', gap: '10px', flexWrap: 'wrap', border: '3px solid black', padding: '10px', borderRadius: '5px' }}>
                  {request && request?.length > 0 && request?.map((player, index) => (
                    <div style={{ padding: '10px', border: '1px solid black', width: '100%' }} key={index}>
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
              <div className={styles.rpgdiv1} style={{
                height: '100%', display: 'flex', maxWidth: '100%', gap: '10px', flexWrap: 'wrap',
                flexDirection: 'column'
               }}>


                <div style={{ display: 'flex', flexDirection: 'column' }} >
                  <h3 className={styles.medievalsharp}>Seus Atributos</h3>
                  {inventory.Stats ?
                    <div style={{ display: 'flex', flexDirection: 'row' }} >
                      <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                        <div>
                          Seu level:
                          <input
                            style={{ borderRadius: '5px', backgroundColor: 'hsl(34, 97%, 31%)', color: 'white', fontWeight: 'bold', maxWidth: '50px' }}
                            value={statsuser.level} onChange={(e) => {

                              const updatedUser = { ...statsuser };


                              updatedUser.level = parseInt(e.target.value, 10) || 0;


                              setStatsUser(updatedUser);
                              handleUpdateStats(updatedUser);
                            }} />
                        </div>
                        <div>
                          Experiência:
                          <input
                            style={{ borderRadius: '5px', backgroundColor: 'hsl(34, 97%, 31%)', color: 'white', fontWeight: 'bold', maxWidth: '50px' }}
                            value={statsuser.experience} onChange={(e) => {

                              const updatedUser = { ...statsuser };


                              updatedUser.experience = parseInt(e.target.value, 10) || 0;


                              setStatsUser(updatedUser);
                              handleUpdateStats(updatedUser);
                            }} />


                        </div>
                        <div>
                          Vida atual e máxima:  <input
                            style={{ borderRadius: '5px', backgroundColor: 'hsl(34, 97%, 31%)', color: 'white', fontWeight: 'bold', maxWidth: '50px' }}
                            value={statsuser.health} onChange={(e) => {

                              const updatedUser = { ...statsuser };


                              updatedUser.health = parseInt(e.target.value, 10) || 0;


                              setStatsUser(updatedUser);
                              handleUpdateStats(updatedUser);
                            }} />/ <input
                            style={{ borderRadius: '5px', backgroundColor: 'hsl(34, 97%, 31%)', color: 'white', fontWeight: 'bold', maxWidth: '50px' }}
                            value={statsuser.maxHealth} onChange={(e) => {

                              const updatedUser = { ...statsuser };


                              updatedUser.maxHealth = parseInt(e.target.value, 10) || 0;


                              setStatsUser(updatedUser);
                              handleUpdateStats(updatedUser);
                            }} />

                          <input style={{ width: '100%', maxWidth: '150px' }} type="range" id='barh' min="0" max={statsuser.maxHealth} value={statsuser.health} readOnly />

                        </div>
                        <div>
                          Mana atual e máxima:  <input
                            style={{ borderRadius: '5px', backgroundColor: 'hsl(34, 97%, 31%)', color: 'white', fontWeight: 'bold', maxWidth: '50px' }}
                            value={statsuser.mana} onChange={(e) => {

                              const updatedUser = { ...statsuser };


                              updatedUser.mana = parseInt(e.target.value, 10) || 0;


                              setStatsUser(updatedUser);
                              handleUpdateStats(updatedUser);
                            }} />/ <input
                            style={{ borderRadius: '5px', backgroundColor: 'hsl(34, 97%, 31%)', color: 'white', fontWeight: 'bold', maxWidth: '50px' }}
                            value={statsuser.maxMana} onChange={(e) => {

                              const updatedUser = { ...statsuser };


                              updatedUser.maxMana = parseInt(e.target.value, 10) || 0;


                              setStatsUser(updatedUser);
                              handleUpdateStats(updatedUser);
                            }} />
                          <input style={{ width: '100%', maxWidth: '150px' }} type="range" id='barm' min="0" max={statsuser.maxMana} value={statsuser.mana} readOnly />
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', marginBlock: '5px', width: '60%', gap: '5px', border: '1px solid black', padding: '5px', borderRadius: '5px' }} >
                          Tomar dano
                          <input type='text' style={{ borderRadius: '5px', backgroundColor: 'hsl(34, 97%, 31%)', color: 'white', fontWeight: 'bold', maxWidth: '150px' }} placeholder='Valor do dano' value={takedmg} onChange={(e) => {
                            setTakeDmg(e.target.value)
                          }} />

                          <button onClick={() => {
                            const updatedUser = { ...statsuser };
                            updatedUser.health -= (parseInt(takedmg));
                            if (updatedUser.health < 0) {
                              updatedUser.health = 0;
                            }
                            setStatsUser(updatedUser);
                            handleUpdateStats(updatedUser);
                            setTakeDmg('')

                          }} className={styles.pushable}>
                            <span style={{ fontSize: '10px', width: '96px' }} className={styles.edge}></span>
                            <span style={{ fontSize: '12px', width: '70px' }} className={styles.front}>
                              Acionar dano tomado
                            </span>
                          </button>

                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', marginBlock: '5px', width: '60%', gap: '5px', border: '1px solid black', padding: '5px', borderRadius: '5px' }} >
                          Gastar mana
                          <input style={{ borderRadius: '5px', backgroundColor: 'hsl(34, 97%, 31%)', color: 'white', fontWeight: 'bold', maxWidth: '150px' }} placeholder='Valor do dano' value={takemana} onChange={(e) => {
                            setTakeMana(e.target.value)
                          }} />
                          <button onClick={() => {
                            const updatedUser = { ...statsuser };
                            updatedUser.mana -= (parseInt(takemana));
                            if (updatedUser.mana < 0) {
                              updatedUser.mana = 0;
                            }
                            setStatsUser(updatedUser);
                            handleUpdateStats(updatedUser);
                            setTakeMana('')

                          }} className={styles.pushable}>
                            <span style={{ fontSize: '10px', width: '96px' }} className={styles.edge}></span>
                            <span style={{ fontSize: '12px', width: '70px' }} className={styles.front}>
                              Acionar gasto de mana
                            </span>
                          </button>

                        </div>

                      </div>
                      <div style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
                        <div style={{ width: '190px', justifyContent: 'space-between', display: 'flex', marginBottom: '5px' }}>
                          <div style={{ maxWidth: '70px', fontSize: '10px' }}>
                            Nome
                          </div>
                          <div style={{ maxWidth: '70px', fontSize: '10px' }}>
                            Valor
                          </div>
                          <div style={{ maxWidth: '75px', fontSize: '10px' }} >
                            (Valor + Equipamentos)
                          </div>
                        </div>
                        <div style={{ width: '190px', justifyContent: 'space-between', display: 'flex' }}>
                          Força:
                          <input
                            style={{ borderRadius: '5px', backgroundColor: 'hsl(34, 97%, 31%)', color: 'white', fontWeight: 'bold', maxWidth: '50px' }}
                            value={statsuser.strength} onChange={(e) => {

                              const updatedUser = { ...statsuser };


                              updatedUser.strength = parseInt(e.target.value, 10) || 0;


                              setStatsUser(updatedUser);
                              handleUpdateStats(updatedUser);
                            }} /> ({statsuser.strength + statsuserequip.strength})
                        </div>
                        <div style={{ width: '100%', justifyContent: 'space-between', display: 'flex' }}>
                          Destreza:
                          <input
                            style={{ borderRadius: '5px', backgroundColor: 'hsl(34, 97%, 31%)', color: 'white', fontWeight: 'bold', maxWidth: '50px' }}
                            value={statsuser.dexterity}
                            onChange={(e) => {
                              const updatedUser = { ...statsuser };
                              updatedUser.dexterity = parseInt(e.target.value, 10) || 0;
                              setStatsUser(updatedUser);
                              handleUpdateStats(updatedUser);
                            }}
                          />
                          ({statsuser.dexterity + statsuserequip.dexterity})
                        </div>
                        <div style={{ width: '100%', justifyContent: 'space-between', display: 'flex' }}>
                          Constituição:
                          <input
                            style={{ borderRadius: '5px', backgroundColor: 'hsl(34, 97%, 31%)', color: 'white', fontWeight: 'bold', maxWidth: '50px' }}
                            value={statsuser.constitution}
                            onChange={(e) => {
                              const updatedUser = { ...statsuser };
                              updatedUser.constitution = parseInt(e.target.value, 10) || 0;
                              setStatsUser(updatedUser);
                              handleUpdateStats(updatedUser);
                            }}
                          />
                          ({statsuser.constitution + statsuserequip.constitution})
                        </div>
                        <div style={{ width: '100%', justifyContent: 'space-between', display: 'flex' }}>
                          Inteligência:
                          <input
                            style={{ borderRadius: '5px', backgroundColor: 'hsl(34, 97%, 31%)', color: 'white', fontWeight: 'bold', maxWidth: '50px' }}
                            value={statsuser.intelligence}
                            onChange={(e) => {
                              const updatedUser = { ...statsuser };
                              updatedUser.intelligence = parseInt(e.target.value, 10) || 0;
                              setStatsUser(updatedUser);
                              handleUpdateStats(updatedUser);
                            }}
                          />
                          ({statsuser.intelligence + statsuserequip.intelligence})
                        </div>
                        <div style={{ width: '100%', justifyContent: 'space-between', display: 'flex' }}>
                          Sabedoria:
                          <input
                            style={{ borderRadius: '5px', backgroundColor: 'hsl(34, 97%, 31%)', color: 'white', fontWeight: 'bold', maxWidth: '50px' }}
                            value={statsuser.wisdom}
                            onChange={(e) => {
                              const updatedUser = { ...statsuser };
                              updatedUser.wisdom = parseInt(e.target.value, 10) || 0;
                              setStatsUser(updatedUser);
                              handleUpdateStats(updatedUser);
                            }}
                          />
                          ({statsuser.wisdom + statsuserequip.wisdom})
                        </div>
                        <div style={{ width: '100%', justifyContent: 'space-between', display: 'flex' }}>
                          Carisma:
                          <input
                            style={{ borderRadius: '5px', backgroundColor: 'hsl(34, 97%, 31%)', color: 'white', fontWeight: 'bold', maxWidth: '50px' }}
                            value={statsuser.charisma}
                            onChange={(e) => {
                              const updatedUser = { ...statsuser };
                              updatedUser.charisma = parseInt(e.target.value, 10) || 0;
                              setStatsUser(updatedUser);
                              handleUpdateStats(updatedUser);
                            }}
                          />
                          ({statsuser.charisma + statsuserequip.charisma})
                        </div>
                        <div style={{ width: '100%', justifyContent: 'space-between', display: 'flex' }}>
                          Atk:
                          <input
                            style={{ borderRadius: '5px', backgroundColor: 'hsl(34, 97%, 31%)', color: 'white', fontWeight: 'bold', maxWidth: '50px' }}
                            value={statsuser.atk}
                            onChange={(e) => {
                              const updatedUser = { ...statsuser };
                              updatedUser.atk = parseInt(e.target.value, 10) || 0;
                              setStatsUser(updatedUser);
                              handleUpdateStats(updatedUser);
                            }}
                          />
                          ({statsuser.atk + statsuserequip.atk})
                        </div>
                        <div style={{ width: '100%', justifyContent: 'space-between', display: 'flex' }}>
                          Def:
                          <input
                            style={{ borderRadius: '5px', backgroundColor: 'hsl(34, 97%, 31%)', color: 'white', fontWeight: 'bold', maxWidth: '50px' }}
                            value={statsuser.def}
                            onChange={(e) => {
                              const updatedUser = { ...statsuser };
                              updatedUser.def = parseInt(e.target.value, 10) || 0;
                              setStatsUser(updatedUser);
                              handleUpdateStats(updatedUser);
                            }}
                          />
                          ({statsuser.def + statsuserequip.def})
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '20px' }} >

                          <button type='button' onClick={() => {
                            const updatedUser = { ...statsuser };
                            updatedUser.health = updatedUser.maxHealth;
                            setStatsUser(updatedUser);
                            handleUpdateStats(updatedUser);
                          }} className={styles.pushable}>
                            <span style={{ fontSize: '10px', width: '96px' }} className={styles.edge}></span>
                            <span style={{ fontSize: '12px', width: '70px' }} className={styles.front}>
                              Encher Vida
                            </span>
                          </button>
                          <button type='button' onClick={() => {
                            const updatedUser = { ...statsuser };
                            updatedUser.mana = updatedUser.maxMana;
                            setStatsUser(updatedUser);
                            handleUpdateStats(updatedUser);
                          }} className={styles.pushable}>
                            <span style={{ fontSize: '10px', width: '96px' }} className={styles.edge}></span>
                            <span style={{ fontSize: '12px', width: '70px' }} className={styles.front}>
                              Encher Mana
                            </span>
                          </button>


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
                          <div> {statsuser.earing?.name} </div>
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
                          <div> {statsuser.head?.name} </div>
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
                          <div> {statsuser.lefthand?.name} </div>
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
                          <div> {statsuser.chest?.name} </div>
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
                          <div> {statsuser.righthand?.name} </div>
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
                          <div> {statsuser.ringleft?.name} </div>
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
                          <div> {statsuser.pants?.name} </div>
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
                          <div> {statsuser.ringright?.name} </div>
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
                          <div> {statsuser.othersleft?.name} </div>
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
                          <div> {statsuser.shoes?.name} </div>
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
                          <div> {statsuser.othersright?.name} </div>
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
            <div style={{ marginTop: '10px' }} className={styles.rpgdiv1}>
              <h2 style={{ width: '100%', justifyContent: 'center', display: 'flex' }} className={styles.medievalsharp} >Adicionar Item</h2>
              <form onSubmit={handleSubmit}>
                <label htmlFor="name">Nome:</label><br />
                <input style={{ borderRadius: '5px', backgroundColor: 'hsl(34, 97%, 31%)', color: 'white', fontWeight: 'bold', maxWidth: '150px' }} type="text" id="name" name="name" value={formData.name} onChange={handleChange} required /><br />

                <label htmlFor="description">Descrição:</label><br />
                <textarea style={{ borderRadius: '5px', backgroundColor: 'hsl(34, 97%, 31%)', color: 'white', fontWeight: 'bold', maxWidth: '150px' }} id="description" name="description" value={formData.description} onChange={handleChange} required /><br />

                <label htmlFor="weight">Peso:</label><br />
                <input style={{ borderRadius: '5px', backgroundColor: 'hsl(34, 97%, 31%)', color: 'white', fontWeight: 'bold', maxWidth: '150px' }} id="weight" name="weight" value={formData.weight} onChange={handleChange} required /><br />

                <div>

                  <label htmlFor="rpgbook">Para qual livro de rpg é esse item?:</label><br />
                  <select id="rpgbook" name="rpgbook" value={formData.rpgbook} onChange={handleChange}>
                    <option value="">Selecione uma opção</option>
                    <option value="generic">Genérico</option>
                    <option value="d&d">D&D</option>

                  </select>
                </div>

                <label htmlFor="cantrade">Pode ser negociado
                  <GoldCoinBag />
                  :</label><br />
                <input type="checkbox" id="cantrade" name="cantrade" checked={formData.cantrade} onChange={handleChange} /><br />

                {formData.cantrade ?
                  <div>


                    <label htmlFor="value">Valor:</label><br />
                    <input style={{ borderRadius: '5px', backgroundColor: 'hsl(34, 97%, 31%)', color: 'white', fontWeight: 'bold', maxWidth: '150px' }} type="text" id="value" name="value" value={formData.value} onChange={handleChange} /><br /></div> : null}

                <label htmlFor="canequip">Pode ser equipado:</label><br />
                <input style={{ borderRadius: '5px', backgroundColor: 'hsl(34, 97%, 31%)', color: 'white', fontWeight: 'bold', maxWidth: '150px' }} type="checkbox" id="canequip" name="canequip" checked={formData.canequip} onChange={handleChange} /><br />
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
                    <br />
                    <label htmlFor="atk">Ataque:</label><br />
                    <input style={{ borderRadius: '5px', backgroundColor: 'hsl(34, 97%, 31%)', color: 'white', fontWeight: 'bold', maxWidth: '150px' }} type="text" id="atk" name="atk" value={formData.atk} onChange={handleChange} /><br />

                    <label htmlFor="def">Defesa:</label><br />
                    <input style={{ borderRadius: '5px', backgroundColor: 'hsl(34, 97%, 31%)', color: 'white', fontWeight: 'bold', maxWidth: '150px' }} type="text" id="def" name="def" value={formData.def} onChange={handleChange} /><br />

                    <label htmlFor="strength">Força:</label><br />
                    <input style={{ borderRadius: '5px', backgroundColor: 'hsl(34, 97%, 31%)', color: 'white', fontWeight: 'bold', maxWidth: '150px' }} type="number" id="strength" name="strength" value={formData.strength} onChange={handleChange} /><br />

                    <label htmlFor="dexterity">Destreza:</label><br />
                    <input style={{ borderRadius: '5px', backgroundColor: 'hsl(34, 97%, 31%)', color: 'white', fontWeight: 'bold', maxWidth: '150px' }} type="number" id="dexterity" name="dexterity" value={formData.dexterity} onChange={handleChange} /><br />

                    <label htmlFor="constitution">Constituição:</label><br />
                    <input style={{ borderRadius: '5px', backgroundColor: 'hsl(34, 97%, 31%)', color: 'white', fontWeight: 'bold', maxWidth: '150px' }} type="number" id="constitution" name="constitution" value={formData.constitution} onChange={handleChange} /><br />

                    <label htmlFor="intelligence">Inteligência:</label><br />
                    <input style={{ borderRadius: '5px', backgroundColor: 'hsl(34, 97%, 31%)', color: 'white', fontWeight: 'bold', maxWidth: '150px' }} type="number" id="intelligence" name="intelligence" value={formData.intelligence} onChange={handleChange} /><br />

                    <label htmlFor="wisdom">Sabedoria:</label><br />
                    <input style={{ borderRadius: '5px', backgroundColor: 'hsl(34, 97%, 31%)', color: 'white', fontWeight: 'bold', maxWidth: '150px' }} type="number" id="wisdom" name="wisdom" value={formData.wisdom} onChange={handleChange} /><br />

                    <label htmlFor="charisma">Carisma:</label><br />
                    <input style={{ borderRadius: '5px', backgroundColor: 'hsl(34, 97%, 31%)', color: 'white', fontWeight: 'bold', maxWidth: '150px' }} type="number" id="charisma" name="charisma" value={formData.charisma} onChange={handleChange} /><br />


                    <p>Caso o equipamento tenha debuff ou buff, escreva o nome e em seguida o valor, por exemplo:
                      'slow-1' ou 'speed+2' ou 'sabedoria+4' ou 'destreza-1'. ESCREVA SEM ASPAS
                    </p>

                    <label htmlFor="buff1">Buff ou Debuff 1 :</label><br />
                    <input style={{ borderRadius: '5px', backgroundColor: 'hsl(34, 97%, 31%)', color: 'white', fontWeight: 'bold', maxWidth: '150px' }} type="text" id="buff1" name="buff1" value={formData.buff1} onChange={handleChange} /><br />

                    <label htmlFor="buff2">Buff ou Debuff 2:</label><br />
                    <input style={{ borderRadius: '5px', backgroundColor: 'hsl(34, 97%, 31%)', color: 'white', fontWeight: 'bold', maxWidth: '150px' }} type="text" id="buff2" name="buff2" value={formData.buff2} onChange={handleChange} /><br />

                    <label htmlFor="buff2">Buff ou Debuff 3:</label><br />
                    <input style={{ borderRadius: '5px', backgroundColor: 'hsl(34, 97%, 31%)', color: 'white', fontWeight: 'bold', maxWidth: '150px' }} type="text" id="buff2" name="buff2" value={formData.buff2} onChange={handleChange} /><br />

                  </div> : null}

                <label htmlFor="url">Url imagem:</label><br />
                <textarea id="url" name="url" value={formData.img} onChange={handleChange} /><br />

                <button type="submit">Enviar</button>
              </form>
            </div>
            : null}
          {user?.id === playersid[0] ? <NpcCreate items={items} userid={user.id} sessionid={sessionid} /> : null}
        </div>
        :
        <div>
          {isLoading ?
            <div style={{ display: 'flex', width: '100%', justifyContent: 'center', color: 'white' }} ><CircularProgress /> Carregando...
              <br />
              Dica: {randomText}
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
            </div>}</div>}

      {showinfo === true && !isLoading ?

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
                    <div style={{ bottom: '35px', position: 'relative' }} className={styles.rpgdiv1}>
                      Você é o <span style={{ fontWeight: 'bold', fontSize: '20px' }} >  MESTRE </span>

                      <div style={{ margin: '5px', border: '1px solid black', padding: '5px' }} >
                        <span style={{ fontWeight: 'bold', fontSize: '20px' }} > Crie NPC'S aqui </span>
                        <form style={{}} >
                          <div>

                            Selecione o nome:
                            <input style={{ borderRadius: '5px', backgroundColor: 'hsl(34, 97%, 31%)', color: 'white', fontWeight: 'bold', maxWidth: '150px' }} value={nameselected} onChange={(e) => {
                              setNameSelected(e.target.value)

                            }} />
                          </div>

                          <div >

                            Tile que o NPC irá aparecer &nbsp;
                            <input style={{ borderRadius: '5px', backgroundColor: 'hsl(34, 97%, 31%)', color: 'white', fontWeight: 'bold', maxWidth: '50px' }} type='number' value={tileselected} onChange={(e) => {
                              setTileSelected(e.target.value)

                            }} />


                          </div>
                          <div>


                            <button onClick={() => {
                              if (nameselected) {

                                addnpcpos()
                              } else {
                                alert('O npc deve ter nome!')
                              }

                            }} className={styles.pushable}>
                              <span className={styles.edge}></span>
                              <span className={styles.front}>
                                Adicionar NPC
                              </span>
                            </button>

                            <button type='button' onClick={() => {
                              updateSession({ PlayersPos: [] })

                            }} className={styles.pushable}>
                              <span className={styles.edge}></span>
                              <span className={styles.front}>
                                Limpar mapa de npc e player
                              </span>
                            </button>
                          </div>
                        </form>

                      </div>
                    </div>
                    :
                    <div className={styles.rpgdiv1}>
                      <div>
                        Escolha o tile e clique para adicionar você (Não pode ter nenhum jogador ou npc em cima)
                        <div>
                          <form>
                            <input style={{ borderRadius: '5px', backgroundColor: 'hsl(34, 97%, 31%)', color: 'white', fontWeight: 'bold', maxWidth: '50px' }} type='number' value={tileselected} onChange={(e) => {
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
            <div style={{ bottom: '15px', position: 'relative' }} className={styles.rpgdiv1}>

              <div style={{ width: '100%', justifyContent: 'center', display: 'flex' }} className={styles.medievalsharp}>

                Mapa:  {map?.name}
              </div>

              {user?.id === playersid[0] ?
                <div style={{ display: 'flex', width: '750px', gap: '20px' }} >
                  <div style={{ margin: '5px', padding: '5px' }} >
                    Escolha um mapa:
                    {Array.isArray(mapsarray) && mapsarray.length > 0 && (
                      <div style={{ display: 'flex', flexDirection: 'column' }} >
                        <select style={{ borderRadius: '5px', backgroundColor: 'hsl(34, 97%, 31%)', color: 'white', fontWeight: 'bold', maxWidth: '250px' }} onChange={(e) => {
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

                        }} className={styles.pushable}>
                          <span className={styles.edge}></span>
                          <span className={styles.front}>
                            Deletar Mapa Atual
                          </span>
                        </button>


                        &nbsp;
                        <div> Escala do mapa: {scale}
                        </div>
                        <div>
                        </div>
                      </div>
                    )}



                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }} >
                    <span style={{ fontWeight: 'bold', fontSize: '20px' }}>Crie um mapa novo</span>
                    <form style={{ display: 'flex', flexDirection: 'column', gap: '10px' }} onSubmit={(e) => {
                      e.preventDefault()
                      if (isUrlValid) {
                        addmap()
                      } else {
                        alert('Link não é valido')
                      }
                    }}>
                      <div>

                        Nome:
                        <input style={{ borderRadius: '5px', backgroundColor: 'hsl(34, 97%, 31%)', color: 'white', fontWeight: 'bold', maxWidth: '150px' }} value={nameselectedmap} onChange={(e) => {
                          setNameSelectedMap(e.target.value)

                        }} />
                      </div>
                      <div>

                        Url da foto do mapa:
                        <input style={{ borderRadius: '5px', backgroundColor: 'hsl(34, 97%, 31%)', color: 'white', fontWeight: 'bold', maxWidth: '150px' }} value={urlselectedmap} onChange={(e) => {
                          setUrlSelectedMap(e.target.value)
                          handleUrlChange(e.target.value)
                        }} />
                      </div>
                      <div style={{}} >
                        Escala do mapa:
                        <input
                          style={{ borderRadius: '5px', backgroundColor: 'hsl(34, 97%, 31%)', color: 'white', fontWeight: 'bold', maxWidth: '50px' }}
                          value={newscale}
                          onChange={(e) => {
                            setNewScale(e.target.value);

                          }}
                        />
                        <div>
                          <input

                            step="0.05"
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
                      <button disabled={!isUrlValid} className={styles.pushable}>
                        <span style={{ fontSize: '10px', width: '116px' }} className={styles.edge}></span>
                        <span style={{ fontSize: '10px', width: '90px' }} className={styles.front}>
                          Adicionar Mapa
                        </span>
                      </button>

                    </form>
                  </div>
                  <div className={styles.medievalsharp} >

                    <button onClick={() => {
                      setShowGrid(!showGrid)

                    }} className={styles.pushable}>
                      <span style={{ fontSize: '10px', width: '116px' }} className={styles.edge}></span>
                      <span style={{ fontSize: '10px', width: '90px' }} className={styles.front}>
                        Mostrar quadriculados do mapa
                      </span>
                    </button>
                    <button onClick={() => {
                      setShowTile(!showTile)

                    }} className={styles.pushable}>
                      <span className={styles.edge}></span>
                      <span className={styles.front}>
                        Mostrar numero dos tiles
                      </span>
                    </button>

                  </div>

                </div>
                : null}
            </div>
          </div>
          <div style={{
            backgroundImage: imgprev ? `url('${imgprev}')` : `url('${map?.url}')`,
            backgroundSize: (nameselectedmap ? `${imageWidth * parseFloat(newscale)}px ${imageWidth * parseFloat(newscale)}px` : `${imageWidth * parseFloat(scale)}px ${imageWidth * parseFloat(scale)}px`),
            backgroundRepeat: 'no-repeat'
          }} className={styles.mapcontainer}>
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
                      <div style={{ color: 'white', position: 'relative', top: '-30px' }} >

                        {player.name}
                        <HealthBar useridfind={player.id} playersstatsarray={playersstatsarray} />
                      </div>
                    </div>}
                </div>
              ))}
            </div>
          </div>
          <div className={styles.rpgdiv1} style={{ position: 'absolute', top: '1080px', maxWidth: '1000px' }} >
            <h1 style={{ width: '100%', justifyContent: 'center', display: 'flex' }} className={styles.medievalsharp} > SEU INVENTARIO
              ({inventory?.Items?.length} Items)</h1>
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

            <div className={styles.customScrollDiv} style={{ height: 'auto', width: '50vw', display: 'flex', overflowX: 'scroll', transform: 'scaleY(-1)' }}>
              <div style={{ minWidth: '1600px', display: 'flex', gap: '25px', flexWrap: 'wrap', transform: 'scaleY(-1)', position: 'relative', bottom: '10px', marginTop: '20px' }} >
                {inventory?.Items?.map((item, index) => (
                  <div
                    className={styles.slotsinv}
                    style={{ maxHeight: '350px', maxWidth: '200px', gap: '5px', padding: '5px', borderRadius: '5px', justifyContent: 'space-between', display: 'flex', flexDirection: 'column' }} key={index}>
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
                          <PiCoinsBold size={20} color='rgb(133, 72, 7)' />
                        </div>
                        <div>
                          Peso:  &nbsp;

                          <span style={{ fontWeight: 'bold', fontSize: '22px' }}  >
                            {item?.item?.weight}
                          </span>
                          <FitnessCenterIcon size={20} color='rgb(133, 72, 7)' />
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


        </div>


        : null}


    </div>
  )
}