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
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import ItemGenerator from '../components/itemGenerator';


export default function SessionPage() {
  window.addEventListener('contextmenu', function (event) {
    event.preventDefault();
  });
  const [wallocator, setWallLocator] = useState([]);
  const [wallocatornew, setWallLocatornew] = useState([]);
  const [trap1locator, settrap1Locator] = useState([]);
  const [trap1locatornew, settrap1Locatornew] = useState([]);
  const [door1locator, setdoor1Locator] = useState([]);
  const [door1locatornew, setdoor1Locatornew] = useState([]);
  const [selectedItem, setSelectedItem] = useState('');
  const [selectedItemRarity, setSelectedItemRarity] = useState('');
  const [selectedItemBook, setSelectedItemBook] = useState('');
  const [selectedItemLevel, setSelectedItemLevel] = useState('');
  const [buttonAddItem, setButtonAddItem] = useState(false);
  const [buttonInfoSession, setButtonInfoSession] = useState(false);
  const [buttonAddNpc, setButtonAddNpc] = useState(false);
  const [buttonPlaceNpc, setButtonPlaceNpc] = useState(false);
  const [buttonShowMapInfo, setButtonShowMapInfo] = useState(false);
  const [buttonShowInvInfo, setButtonShowInvInfo] = useState(false);
  const [buttonShowWallTool, setButtonShowWallTool] = useState(false);
  const [cantupdate, setCantUpdate] = useState(false);
  const [images1, setImages1] = useState([]);
  const [images2, setImages2] = useState([]);
  const [images3, setImages3] = useState([]);
  const [images4, setImages4] = useState([]);
  const [images5, setImages5] = useState([]);
  const [images6, setImages6] = useState([]);
  const [images7, setImages7] = useState([]);
  const [images8, setImages8] = useState([]);

  const [ReqKeeper, setReqKeeper] = useState(false);
  const [tile, setTile] = useState('');
  const [npcmap, setNpcMap] = useState({});
  const [npcid, setNpcId] = useState('');
  const [nameuser, setNameUser] = useState('')
  const [urlphotouser, setUrlPhotoUser] = useState('')
  const [selectedNpc, setSelectedNpc] = useState({});
  const [npcssession, setNpcSession] = useState([]);
  const [npcs, setNpcs] = useState([]);
  const [randomText, setRandomText] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [disableUpdate, setDisableUpdate] = useState(false);
  const [showGrid, setShowGrid] = useState(false);
  const [showTile, setShowTile] = useState(false);
  const [takedmg, setTakeDmg] = useState('');
  const [takemana, setTakeMana] = useState('');
  const [scale, setScale] = useState(1);
  const [newscale, setNewScale] = useState(1);
  const [blockscale, setblockScale] = useState(1);
  const [blocknewscale, setblockNewScale] = useState(1);
  const [isUrlValid, setIsUrlValid] = useState(false);
  const [urlselectedmap, setUrlSelectedMap] = useState('');
  const [nameselectedmap, setNameSelectedMap] = useState('');
  const [imageWidth, setImageWidth] = useState(null);
  const [imageHeight, setImageHeight] = useState(null);

  const [gridItems, setGridItems] = useState(Array.from({ length: 4096 }));
  const [titulo, setTitulo] = useState('');
  const { sessionid } = useParams();
  const { user, urlrequest, randomStrings } = useAppContext();
  const [players, setPlayers] = useState([]);
  const [playersid, setPlayersid] = useState([]);
  const [request, setRequest] = useState([]);
  const [requestNames, setRequestNames] = useState([])
  const [inventory, setInventory] = useState([]);
  const [map, setMap] = useState('');
  const [mapsarray, setMapsArray] = useState([]);
  const [title, setTitle] = useState('');
  const [bookrpg, setBookRpg] = useState('');
  const [newbookrpg, setNewBookRpg] = useState('');
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
  const [playerlocation, setPlayerLocation] = useState([
  ]);
  const [looks, setLooks] = useState([])
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



  function showWallTool() {
    setButtonShowMapInfo(false);
    setButtonShowWallTool(true);
    setShowGrid(true);
  }

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * randomStrings.length);
    setRandomText(randomStrings[randomIndex]);

    setTimeout(() => {
      setIsLoading(false);
    }, 2000);


  }, []);


  async function AddPlayerToMap() {
    let pos = playerlocation;
    const response = await axios.get(`${urlrequest}/sessions/${sessionid}`, {
      headers: {
        'Content-Type': 'application/json',
        'ngrok-skip-browser-warning': 'true'
      }
    });
    if (response.data) {
      pos = response.data.PlayersPos;

    }
    let posnpc = { npcmap: npcssession.find(player => player.ownerId === user?.id), tile }
    pos.push(posnpc)

    updateSession({ PlayersPos: pos })
    setTile('')
  }

  useEffect(() => {
    const importImages = async () => {
      try {
        const headImages = [];
        for (let i = 1; i <= 7; i++) {
          const image = await import(`../components/head/head${i}.png`);
          headImages.push(image.default);
        }
        setImages1(headImages);
      } catch (error) {
        console.error('Error importing images:', error);
      }


    };

    const importImages1 = async () => {

      try {
        const headImages = [];
        for (let i = 1; i <= 6; i++) {
          const image = await import(`../components/torso/torso${i}.png`);
          headImages.push(image.default);
        }
        setImages2(headImages);
      } catch (error) {
        console.error('Error importing images:', error);
      }

    };
    const importImages2 = async () => {

      try {
        const headImages = [];
        for (let i = 1; i <= 4; i++) {
          const image = await import(`../components/zlower/lower${i}.png`);
          headImages.push(image.default);
        }
        setImages3(headImages);
      } catch (error) {
        console.error('Error importing images:', error);
      }

    };
    const importImages3 = async () => {


      const headImages = [];
      for (let i = 1; i <= 4; i++) {
        try {
          const image = await import(`../components/lefthand/lefthand${i}.png`);
          headImages.push(image.default);
        } catch (pngError) {
       
          try {
            const gifImage = await import(`../components/lefthand/lefthand${i}.gif`);
            headImages.push(gifImage.default);
          } catch (gifError) {
           
            // Optionally, you can push a default image or null if both imports fail
            headImages.push(null);
          }
        }
      }
      setImages4(headImages);


    };
    const importImages4 = async () => {

      const headImages = [];
      for (let i = 1; i <= 4; i++) {
        try {
          const image = await import(`../components/righthand/righthand${i}.png`);
          headImages.push(image.default);
        } catch (pngError) {
      
          try {
            const gifImage = await import(`../components/righthand/righthand${i}.gif`);
            headImages.push(gifImage.default);
          } catch (gifError) {
           
            // Optionally, you can push a default image or null if both imports fail
            headImages.push(null);
          }
        }
      }
      setImages5(headImages);

    };

    const importImages5 = async () => {

      const headImages = [];

      for (let i = 1; i <= 4; i++) {
        try {
          const image = await import(`../components/helmet/helmet${i}.png`);
          headImages.push(image.default);
        } catch (pngError) {
       
          try {
            const gifImage = await import(`../components/helmet/helmet${i}.gif`);
            headImages.push(gifImage.default);
          } catch (gifError) {
          
            // Optionally, you can push a default image or null if both imports fail
            headImages.push(null);
          }
        }
      }
      setImages6(headImages)

    };
    const importImages6 = async () => {

      const headImages = [];

      for (let i = 1; i <= 3; i++) {
        try {
          const image = await import(`../components/icons/icons${i}.png`);
          headImages.push(image.default);
        } catch (pngError) {
        
          try {
            const gifImage = await import(`../components/icons/icons${i}.gif`);
            headImages.push(gifImage.default);
          } catch (gifError) {
         
            // Optionally, you can push a default image or null if both imports fail
            headImages.push(null);
          }
        }
      }
      setImages7(headImages)
    };
    const importImages7 = async () => {
      const headImages = [];

      for (let i = 1; i <= 3; i++) {
        try {
          const image = await import(`../components/pet/pet${i}.png`);
          headImages.push(image.default);
        } catch (pngError) {
         
          try {
            const gifImage = await import(`../components/pet/pet${i}.gif`);
            headImages.push(gifImage.default);
          } catch (gifError) {
           
            // Optionally, you can push a default image or null if both imports fail
            headImages.push(null);
          }
        }
      }

      // Assuming setImages8 is a useState setter from a functional component
      setImages8(headImages);
    };

    importImages();
    importImages1();
    importImages2();
    importImages3();
    importImages4();
    importImages5();
    importImages6();
    importImages7();
  }, []);
  useEffect(() => {

    const interval = setInterval(() => {
      if (user.id) {
       /*  getSession() */

      } else {

      }

    }, 3000);

    return () => clearInterval(interval);
  }, [user, disableUpdate]);

  useEffect(() => {

    const interval = setInterval(() => {
      if (user.id) {
        setReqKeeper(false);

      } else {

      }

    }, 3000);

    return () => clearInterval(interval);
  }, [user, disableUpdate]);

  async function updateInventory() {
    try {
      const randomItem = items[Math.floor(Math.random() * items?.length)];
      const newItem = {
        item: randomItem,
        quantity: 1
      };
      const existingItemIndex = inventory.findIndex(item => item.item.name === randomItem.name);
      if (existingItemIndex !== -1) {
        inventory[existingItemIndex].quantity++;
      } else {
        inventory.push(newItem);
      }
    } catch (error) {
      console.error('Error updating inventory:', error);
    }
  }
  async function deleteInventoryItem2(updateddata) {
    try {
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

        },
        Isnpc: false,
        Npcname: nameuser,
        NpcUrlPhoto: urlphotouser,
        NpcBook: ''



      };

      const response = await axios.post(`${urlrequest}/npcscreate`, randomUser);

      if (response.data) {

        let newnpcs = [...npcssession];
        newnpcs.push(randomUser);
        updateSession({ Npcs: newnpcs });


      }
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

  async function getPlayers(data) {
    let playerarray = [];

    try {
      if (data && data.join(',') !== playersid.join(',')) {

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

  useEffect(() => {
    if (user.id && playerlocation.length > 0 && npcssession.length > 0) {
      const updatedPlayerLocation = [...playerlocation];
      const olddata = playerlocation.map(pl => ({
        ...pl,
        npcmap: { ...pl.npcmap }
      }));

      for (let i = 0; i < updatedPlayerLocation.length; i++) {
        const indexInNpcSession = npcssession?.findIndex(npc => npc?.idtrack === updatedPlayerLocation[i].npcmap?.idtrack);
        if (indexInNpcSession !== -1) {
          updatedPlayerLocation[i].npcmap = npcssession[indexInNpcSession];
        }
      }
      if (JSON.stringify(playerlocation) !== JSON.stringify(olddata)) {

        updateSession({ PlayersPos: updatedPlayerLocation });


      }
    }
  }, [user, playerlocation, npcssession]);

  useEffect(() => {
    if (user.id) {
      if (map) {
        if (wallocator.length === 0) {

          getWalls();
        }
      }
    }
  }, [user, map, wallocator])

  async function getWalls() {


    const response = await axios.get(`${urlrequest}/mapget`, {
      params: {
        name: map.name,
        id: map.id,
        url: map.url
      },
      headers: {
        'Content-Type': 'application/json',
        'ngrok-skip-browser-warning': 'any'
      }
    });
    if (response.data) {
      setWallLocator(response.data.walls)
    }
  }

  async function getFullMap() {

    console.log(map.name)
    console.log(map.id)
    console.log(map.url)
    const response = await axios.get(`${urlrequest}/mapget`, {
      params: {
        name: map.name,
        id: map.id,
        url: map.url
      },
      headers: {
        'Content-Type': 'application/json',
        'ngrok-skip-browser-warning': 'any'
      }
    });
   
    if (response.data) {

      setNewScale(response.data.scale)
      setUrlSelectedMap(response.data.url)
      setNameSelectedMap(response.data.name)
      removemap(map?.name)
      setWallLocatornew(response.data.walls)
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
          setNpcSession(data.Npcs);
          setPlayerLocation(data.PlayersPos);


          if (data.Npcs.some(npc => npc.ownerId === user.id)) {
            const existingNPC = data.Npcs.find(npc => npc.ownerId === user.id);

            if (disableUpdate) {


            } else {
              if (user?.id !== playersid[0]) {

                setStatsUser(existingNPC.Stats);
                setInventory(existingNPC.Items);
              }
            }
          }

          setTitle(data.title);
          setBookRpg(data.bookrpg);
          if(nameselectedmap === '' && urlselectedmap === ''){
            setMapsArray(data.Maps);
            setMap(data.Maps[0]);
            console.log(nameselectedmap)
            setScale(data.Maps[0]?.scale);
            setblockScale(data.Maps[0]?.blockscale)

            setblockNewScale(data.Maps[0]?.blockscale)
            setNewScale(data.Maps[0]?.scale)
          }
          getPlayers(data.players);
          setShowInfo(true);
          setPlayersid(data.players);



        } else {
          console.log("User is not authorized for this session.");


        }
      }
    } catch (error) {
      console.error('Error fetching the session: ', error)
    }
  }

  useEffect(() => {

    const timeout = setTimeout(() => {

      if (user.id && !cantupdate) {
        getChars(npcssession);
        setCantUpdate(true);
      }
    }, 1000);

    return () => clearTimeout(timeout);
  }, [user, cantupdate, npcssession, looks]);

  async function updateSession(newData) {

    try {
      const response = await axios.post(`${urlrequest}/sessions/update/${sessionid}`, newData);

      getSession()
    } catch (error) {
      console.error('Error fetching the session: ', error)
    }
  }
  function updateNpcs() {
    setDisableUpdate(true);



  }

  async function updateNpcs1() {
    setDisableUpdate(false);


    if (user.id !== playersid[0]) {
      /* PLAYER */
      let targetuser = npcssession.filter(npc => npc.ownerId === user.id).map(npc => {
        if (npc.ownerId === user.id) {
          return { ...npc };
        }
        return npc;
      });
      let newData = targetuser[0]
      let id = newData.idtrack;
      newData.Stats = statsuser;
      newData.Items = inventory;

      try {
        const response = await axios.get(`${urlrequest}/npcsGET`, {
          headers: {
            'Content-Type': 'application/json',
            'ngrok-skip-browser-warning': 'true'
          }
        });
        if (response.data) {
          const data = response.data;
          let targetuser = data.find(npc => npc.ownerId === newData.ownerId &&
            npc.gameId === newData.gameId);
          id = targetuser._id;
          newData.idtrack = targetuser._id;
          try {

            const response = await axios.post(`${urlrequest}/npcsupdate/${id}`, newData);
            if (response.data) {
              const res = await axios.get(`${urlrequest}/sessions/${sessionid}`, {
                headers: {
                  'Content-Type': 'application/json',
                  'ngrok-skip-browser-warning': 'true'
                }
              })
              if (res.data) {
                let updatedNpcs = res.data.Npcs;


                const index = updatedNpcs.findIndex(npc => npc.ownerId === newData.ownerId && npc.gameId === newData.gameId);


                if (index !== -1) {
                  updatedNpcs[index] = { ...updatedNpcs[index], ...newData };
                }

                updateSession({ Npcs: updatedNpcs });
              }

            }


          } catch (error) {
            console.error('Error updating user or npc data: ', error)
          }
        }
      } catch (error) {
        console.error('Error fetching sessions ', error)
      }








    } else {
      /* MESTRE */
      let targetuser = npcssession.filter(npc => npc._id === npcid).map(npc => {
        if (npc._id === npcid) {
          return { ...npc };
        }
        return npc;
      });

      let newData = targetuser[0]
      let id = npcid;
      newData.Stats = statsuser;
      newData.Items = inventory;


      try {
        const response = await axios.get(`${urlrequest}/npcsGET`, {
          headers: {
            'Content-Type': 'application/json',
            'ngrok-skip-browser-warning': 'true'
          }
        });
        if (response.data) {
          const data = response.data;
          let targetuser = data.map(npc => {
            if (npc._id === npcid) {
              return { ...npc };
            }
            return npc;
          });
          let theuser = targetuser[0];
          newData.idtrack = npcid;

        }
      } catch (error) {
        console.error('Error fetching sessions ', error)
      }
      try {

        const response = await axios.post(`${urlrequest}/npcsupdate/${id}`, newData);
        if (response.data) {

          const updatedNpcs = npcssession.map(npc => {
            if (npc._id === npcid) {
              return { ...npc, ...newData };
            }
            return npc;
          });
          updateSession({ Npcs: updatedNpcs });




        }


      } catch (error) {
        console.error('Error updating user or npc data: ', error)
      }

    }





  }

  useEffect(() => {
    if (user.id) {
      getItems()
      getSession()

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

  async function handleAdd(index) {

    try {
      const randomItem = items[index];
      const newItem = {
        item: randomItem,
        quantity: 1
      };

      const existingItemIndex = inventory.findIndex(item => item.item.name === randomItem.name);

      if (existingItemIndex !== -1) {

        inventory[existingItemIndex].quantity++;
      } else {

        inventory.push(newItem);
      }

      let targetuser = npcssession.map(npc => {
        if (npc.ownerId === user.id) {
          return { ...npc };
        }
        return npc;
      });

      let newData = targetuser[0];
      newData.Stats = statsuser;
      newData.Items = inventory;

      if (disableUpdate) {

        try {
          const response = await axios.post(`${urlrequest}/npcsupdate/${newData.idtrack}`, newData);
          if (response.data) {

            const updatedNpcs = npcssession.map(npc => {
              if (npc.idtrack === newData.idtrack) {
                return { ...npc, ...newData };
              }
              return npc;
            });



          }


        } catch (error) {
          console.error('Error fetching the session: ', error)
        }
      }





    } catch (error) {
      console.error('Error updating inventory:', error);
    }
  };
  useEffect(() => {
    if (statsuser) {
      handleUpdateStats(statsuser)
    }
  }, [statsuser])
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

      if (statsnew[slot] && typeof statsnew[slot] === 'object') {
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

  };
  function handleAddItem(event) {
    const selectedId = event.target.value;
    handleAdd(selectedId)
    updateNpcs()


  }
  function handleAddItem2(event) {
    const selectedId = event;
    handleAdd(selectedId)
    updateNpcs()

  }
  const handleUpdateQuantity2 = (index, quantityChange, updateddata) => {

    const updatedItems = inventory.map((item, itemIndex) => {
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
    setInventory(updatedItems)

    deleteInventoryItem2(updatedItems, updateddata);



  };

  const handleUpdateQuantity = (index, quantityChange) => {
    const updatedItems = inventory.map((item, itemIndex) => {
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
    setInventory(updatedItems)
    updateNpcs()


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
    console.log(position)

  };


  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = async (e, targetIndex) => {
    console.log(targetIndex)
    const draggedItemType = e.dataTransfer.getData('text/plain');

    if (draggedItemType === 'wall') {
      console.log(`Dropped a wall at tile ${targetIndex}`);
      wallocatornew.push(`${targetIndex}`)
    } else {



      const newPosition = parseInt(e.dataTransfer.getData('position'));

      let updatedPlayerLocations = [...playerlocation];
      const response = await axios.get(`${urlrequest}/sessions/${sessionid}`, {
        headers: {
          'Content-Type': 'application/json',
          'ngrok-skip-browser-warning': 'true'
        }
      });
      if (response.data) {
        updatedPlayerLocations = response.data.PlayersPos


      }
      const draggedPlayerIndex = updatedPlayerLocations.findIndex(player => parseInt(player.tile) === parseInt(newPosition));

      if (draggedPlayerIndex !== -1) {
        updatedPlayerLocations[draggedPlayerIndex].tile = targetIndex;
      }


      let verticalMovement;
      let horizontalMovement;
      let oldrow;
      let newrow;
      let oldcolumn;
      let newcolumn;

      oldrow = Math.floor(newPosition / 64);
      newrow = Math.floor(updatedPlayerLocations[0].tile / 64);
      oldcolumn = newPosition % 64;
      newcolumn = updatedPlayerLocations[0].tile % 64;

      horizontalMovement = newcolumn - oldcolumn;
      verticalMovement = newrow - oldrow;





      let proceed = true;
      let typeblock = '';
      let blocksmoved = 0;
      let multiplier = 1;
      let savenpcfinalgrid = targetIndex;

      function isPathBlocked(start, end, walls, horizontalMovement, verticalMovement) {


        if (verticalMovement > 0) {
          for (let i = 0; i < verticalMovement + 1; i++) {
            let numbercheck = start + (64 * i)
            if (walls.includes(numbercheck.toString())) {
              console.log("Wall found at:", numbercheck);
              proceed = false;
              typeblock = 'vertical';
              blocksmoved = numbercheck;
              break;

            }
          }

        } else if (verticalMovement < 0) {
          for (let i = 0; i < -verticalMovement + 1; i++) {
            let numbercheck = start - (64 * i); // Subtract for negative movement
            if (walls.includes(numbercheck.toString())) {
              console.log("Wall found at:", numbercheck);
              proceed = false;
              typeblock = 'vertical'
              blocksmoved = numbercheck;
              multiplier = -1;
              break;

            }
          }
        }
        if (proceed === true) {


          if (horizontalMovement > 0) {
            for (let i = 0; i < horizontalMovement + 1; i++) {
              let numbercheck = (start + (64 * verticalMovement * multiplier)) + (1 * i)

              if (walls.includes(numbercheck.toString())) {
                console.log("Wall found at:", numbercheck);
                proceed = false;
                typeblock = 'horizontal'
                blocksmoved = numbercheck;
                break;

              }
            }

          } else if (horizontalMovement < 0) {

            for (let i = 0; i < -horizontalMovement + 1; i++) {
              let numbercheck = (start + (64 * verticalMovement * multiplier)) - (1 * i); // Subtract for negative movement

              if (walls.includes(numbercheck.toString())) {
                console.log("Wall found at:", numbercheck);
                proceed = false;
                typeblock = 'horizontal'
                blocksmoved = numbercheck;
                multiplier = -1;
                break;

              }
            }
          }

        }




      }
      if (draggedItemType !== 'wall') {

      }
      const check = isPathBlocked(newPosition, updatedPlayerLocations[draggedPlayerIndex]?.tile, wallocator, horizontalMovement, verticalMovement);
      if (proceed === true && updatedPlayerLocations[draggedPlayerIndex]?.npcmap?.Isnpc === false) {


        setPlayerLocation(updatedPlayerLocations);
        updateSession({ PlayersPos: updatedPlayerLocations });
      } else {
        if (typeblock === 'vertical') {
          let location = parseInt(updatedPlayerLocations[draggedPlayerIndex].tile);
          location = blocksmoved - (64 * multiplier);
          console.log(location);
          updatedPlayerLocations[draggedPlayerIndex].tile = location;
          setPlayerLocation(updatedPlayerLocations);
          updateSession({ PlayersPos: updatedPlayerLocations });

        }
        if (typeblock === 'horizontal') {
          let location = parseInt(updatedPlayerLocations[draggedPlayerIndex].tile)
          location = blocksmoved - (1 * multiplier);
          console.log(location);
          updatedPlayerLocations[draggedPlayerIndex].tile = location;
          setPlayerLocation(updatedPlayerLocations);
          updateSession({ PlayersPos: updatedPlayerLocations });

        }
      }
      if (updatedPlayerLocations[draggedPlayerIndex]?.npcmap?.Isnpc === true) {
        updatedPlayerLocations[draggedPlayerIndex].tile = savenpcfinalgrid;

        setPlayerLocation(updatedPlayerLocations);
        updateSession({ PlayersPos: updatedPlayerLocations });

      }



    }

  };


  async function addmap() {
    let mapsdata = [...mapsarray]
    mapsdata.push({ name: nameselectedmap, url: urlselectedmap, id: user.id, scale: newscale, blockscale: blocknewscale })
    updateSession({ Maps: mapsdata }).then(() => {
     window.location.reload()
    });

    let newmap = { name: nameselectedmap, url: urlselectedmap, id: user.id, scale: newscale, walls: wallocatornew, blockscale: blocknewscale }
    console.log(newmap)
    const response = await axios.post(`${urlrequest}/mapcreate`, newmap);
    if (response.data) {
      console.log(response.data)
    }

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
  useEffect(() => {

    if (user.id) {

      if (imgprev === '' && !isLoading) {
        const image = new Image();
        image.src = map?.url;
        image.onload = function () {
         
          setImageWidth(image.width);
          setImageHeight(image.height);

          const maxtile1 = Math.ceil(image.width / (60 * blocknewscale))
          const maxtile2 = Math.ceil(image.height / (60 * blocknewscale))
          
          const size = maxtile1*maxtile2;
          console.log(size)

          if(size > 0 && size < 4096){

            setGridItems(Array.from({length: size}))
          }

        }
      }

    };
  }, [imgprev, imageWidth, imageHeight, user, isLoading])
  const checkImageUrlValidity = (url) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve({ width: img.width, height: img.height });
      img.onerror = () => reject(false);
      img.src = url;
    });
  };

  const handleUrlChange = async (e) => {
    const url = e;
    setUrlSelectedMap(url);
    try {
      await checkImageUrlValidity(url).then(({ width, height }) => {
        setImageWidth(width);
        setImageHeight(height);
        const aspectRatio = width / height;
        console.log('Aspect Ratio:', aspectRatio);
      });
      setIsUrlValid(true);
    } catch (error) {
      setIsUrlValid(false);
    }
    setImgPrev(url);
  };
  function HealthBar({ useridfind }) {


    let playerStats = playerlocation?.find(player => player.npcmap.idtrack === useridfind);
    playerStats = playerStats?.npcmap;


    if (playerStats && playerStats?.Stats) {
      const { health, maxHealth } = playerStats?.Stats;


      return (
        <div >
          <div>
            Level: {playerStats?.Stats.level}
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
  function getChars(npcs) {
    let chars = npcs?.filter(npc => npc.Isnpc === false);

    chars?.forEach(async char => {

      const response = await axios.get(`${urlrequest}/users/${char.ownerId}`, {
        headers: {
          'Content-Type': 'application/json',
          'ngrok-skip-browser-warning': 'true'
        }
      });
      if (response.data) {
        const data = response.data;
        let newlook = { idofuser: data._id, thelooks: data.charCreate }

        setLooks(prevLooks => {

          return [...prevLooks, newlook];
        });




      }
    });

  }


  function CharGet({ ownerId }) {

    let filterlooks = looks?.find(user => user.idofuser === ownerId)


    let headSliderimg;
    let torsoSliderimg;
    let lowerSliderimg;
    let lefthandSliderimg;
    let righthandSliderimg;
    let petSliderimg;
    let iconSliderimg;
    let helmetSliderimg;

    if (filterlooks) {

      if (filterlooks.thelooks[0] === null) {
        filterlooks.thelooks[0] = 1;
      }
      if (filterlooks.thelooks[1] === null) {
        filterlooks.thelooks[1] = 1;
      }
      if (filterlooks.thelooks[2] === null) {
        filterlooks.thelooks[2] = 1;
      }
      if (filterlooks.thelooks[3] === null) {
        filterlooks.thelooks[3] = 1;
      }
      if (filterlooks.thelooks[4] === null) {
        filterlooks.thelooks[4] = 1;
      }
      if (filterlooks.thelooks[5] === null) {
        filterlooks.thelooks[5] = 1;
      }
      if (filterlooks.thelooks[6] === null) {
        filterlooks.thelooks[6] = 1;
      }
      if (filterlooks.thelooks[7] === null) {
        filterlooks.thelooks[7] = 1;
      }

      const one = parseInt(filterlooks.thelooks[0])
      const two = parseInt(filterlooks.thelooks[1])
      const three = parseInt(filterlooks.thelooks[2])
      const four = parseInt(filterlooks.thelooks[3])
      const five = parseInt(filterlooks.thelooks[4])
      const six = parseInt(filterlooks.thelooks[5])
      const seven = parseInt(filterlooks.thelooks[6])
      const eight = parseInt(filterlooks.thelooks[7])
      headSliderimg = images1[one - 1]
      torsoSliderimg = images2[two - 1]
      lowerSliderimg = images3[three - 1]
      lefthandSliderimg = images4[four - 1]
      righthandSliderimg = images5[five - 1]
      helmetSliderimg = images6[six - 1]
      iconSliderimg = images7[seven - 1]
      petSliderimg = images8[eight - 1]


    }

    return (
      <div style={{ position: 'absolute', top: '25px', left: '16px', zIndex: '999' }} >
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}  >

          <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '-6px' }}>
            <img width={26} height={26} src={headSliderimg} alt={`head`} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '0px' }}>
            <img width={28} height={28} src={torsoSliderimg} alt={`torso`} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>

            <img width={28} height={20} src={lowerSliderimg} alt={`lower`} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', position: 'relative', bottom: '60px', left: '-13px', height: '0px', zIndex: '2' }}>

            <img width={'auto'} height={45} src={lefthandSliderimg} alt={`lefthand${lefthandSliderimg}`} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', position: 'relative', bottom: '50px', left: '13px', height: '0px' }}>

            <img width={30} height={30} src={righthandSliderimg} alt={`righthand${righthandSliderimg}`} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', position: 'relative', bottom: '75px', left: '0px', height: '0px' }}>
            <img width={35} height={35} src={helmetSliderimg} alt={`helmet${helmetSliderimg}`} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', position: 'relative', bottom: '70px', left: '40px', height: '0px' }}>

            <img width={30} height={30} src={iconSliderimg} alt={`icon${iconSliderimg}`} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', position: 'relative', bottom: '25px', left: '20px', height: '0px', width: '0px' }}>

            <img width={45} height={45} src={petSliderimg} alt={`pet${petSliderimg}`} />
          </div>




        </div>
      </div>
    );
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
  async function getNpcs() {
    try {
      const response = await axios.get(`${urlrequest}/npcsGET`, {
        headers: {
          'Content-Type': 'application/json',
          'ngrok-skip-browser-warning': 'true'
        }
      });
      if (response.data) {
        const data = response.data;
        setNpcs(data)

      }
    } catch (error) {
      console.error('Error fetching sessions ', error)
    }
  }


  /* AI */

  function generateItem(e) {
    e.preventDefault();

    const theItem = ItemGenerator(selectedItemRarity, selectedItemBook, selectedItem, selectedItemLevel)


    console.log('O item gerado : ', theItem)

  }


  /* AI */

  return (
    <div className={styles.body} >
      {user?.id === playersid[0] && !isLoading ?
        <div style={{
          top: '10px', left: '0px', zIndex: '9999',
          position: 'fixed', maxWidth: '700px', width: '460px', color: 'white', display: buttonPlaceNpc ? 'block' : 'none'
        }} className={styles.rpgdiv5}>
          Você é o <span style={{ fontWeight: 'bold', fontSize: '20px' }} >  MESTRE </span>
          Players e Npc's inseridos na sessão:
          <div>
            {npcssession?.map((npc, index) => (
              <div key={index} value={npc}>
                {npc?.Isnpc ? 'NPC ' : 'Player '}
                {npc?.Npcname}
                {npc?.Isnpc ? ' Do livro ' : null}
                {npc?.Isnpc ? npc?.Npcbook : null}



              </div>
            ))}
          </div>


          <div style={{ margin: '5px', padding: '5px' }} >
            <div className={styles.rpgdiv5} style={{ display: 'flex' }} >
              <div style={{ display: 'flex', flexDirection: 'column' }} >
                <span style={{ fontWeight: 'bold', fontSize: '20px' }} > Crie NPC'S aqui </span>
                <button onClick={() => {
                  getNpcs()
                }}>Carregar lista de npcs de {bookrpg}</button>

              </div>

              <form style={{ display: 'flex' }} onSubmit={async (e) => {
                e.preventDefault()
                if (selectedNpc.Npcname) {

                  const response = await axios.get(`${urlrequest}/npcsGET`, {
                    headers: {
                      'Content-Type': 'application/json',
                      'ngrok-skip-browser-warning': 'true'
                    }
                  });
                  let newnpcs = [];
                  if (response.data) {
                    const data = response.data;
                    newnpcs = data;

                  }
                  newnpcs.push(selectedNpc);
                  updateSession({ Npcs: newnpcs })
                } else {
                  alert('Selecione o npc!')
                }

              }} >
                <div style={{ display: 'flex', flexDirection: 'column', marginRight: '15px' }} >
                  Selecione o npc criado de {bookrpg}
                  <select style={{
                    borderRadius: '5px',
                    backgroundColor: 'hsl(34, 97%, 31%)', color: 'white',
                    fontWeight: 'bold', width: '200px'
                  }} onChange={(e) => {

                    setSelectedNpc(npcs.filter(npc => npc.Isnpc && npc.NpcBook === bookrpg)[e.target.selectedIndex]);

                  }}>

                    {npcs?.filter(npc => npc.Isnpc && npc.NpcBook === bookrpg).map((npc, index) => (
                      <option key={index} value={npc}>
                        {npc?.Npcname}
                      </option>
                    ))}
                  </select>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  NPC selecionado: {selectedNpc.Npcname}

                  <button className={styles.pushable}>
                    <span className={styles.edge}></span>
                    <span className={styles.front}>
                      Adicionar NPC
                    </span>
                  </button>


                </div>
              </form>

            </div>

            <div className={styles.rpgdiv5} style={{ display: 'flex', marginTop: '10px' }} >
              <p onClick={() => {

              }} >Adicionar Npc no mapa</p>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                Nome do NPC
                <select style={{
                  borderRadius: '5px',
                  backgroundColor: 'hsl(34, 97%, 31%)', color: 'white',
                  fontWeight: 'bold', width: '150px'
                }} onChange={(e) => {

                  setNpcMap(npcssession.filter(npc => npc.Isnpc && npc.NpcBook === bookrpg)[e.target.selectedIndex]);

                }}>

                  {npcssession?.filter(npc => npc.Isnpc && npc.NpcBook === bookrpg).map((npc, index) => (
                    <option key={index} value={npc}>
                      {npc?.Npcname}
                    </option>
                  ))}
                </select>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                Tile para spawnar npc


                <input type='number' value={tile} onChange={(e) => {
                  setTile(e.target.value)
                }} />
              </div>

            </div>
            <button type='button' onClick={() => {
              if (npcmap.Npcname && tile) {

                let pos = playerlocation;
                let posnpc = { npcmap, tile }
                pos.push(posnpc)
                updateSession({ PlayersPos: pos })
              }
              else {
                alert('Selecione um npc e um tile para spawnar!')
              }

            }} className={styles.pushable}>
              <span className={styles.edge}></span>
              <span className={styles.front}>
                Adicionar npc: {npcmap.Npcname} no tile {tile}
              </span>
            </button>
          </div>
          Clique abaixo para abrir inventário do npc
          {npcssession?.filter(npc => npc.Isnpc && npc.NpcBook === bookrpg).map((npc, index) => (
            <div className={styles.rpgdiv1} onClick={() => {
              setStatsUser(npc?.Stats)
              setInventory(npc?.Items)
              setNpcId(npc?._id)
              updateNpcs()
            }} style={{ marginBlock: '10px' }} key={index} value={npc}>
              {npc?.Isnpc ? 'NPC ' : 'Player '}
              {npc?.Npcname}
              {npc?.Isnpc ? ' Do livro: ' : null}
              {npc?.Isnpc ? npc?.NpcBook : null}

            </div>
          ))}
          {npcid ?
            <div className={styles.rpgdiv4} style={{
              height: '100%', maxWidth: '100%', gap: '10px', flexWrap: 'wrap',
              flexDirection: 'column', position: 'fixed', zIndex: '9999', top: '0', right: '0px', marginBottom: '30px',
            }}>
              <div style={{ color: 'black', display: 'flex', flexDirection: 'column' }} >
                <h3 className={styles.medievalsharp}>Atributos do NPC </h3>
                <p>{npcid}</p>
                {user?.id === playersid[0] ?
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

                            updateNpcs()



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

                            updateNpcs()
                          }} />


                      </div>
                      <div>
                        Vida atual e máxima:  <input
                          style={{ borderRadius: '5px', backgroundColor: 'hsl(34, 97%, 31%)', color: 'white', fontWeight: 'bold', maxWidth: '50px' }}
                          value={statsuser.health} onChange={(e) => {

                            const updatedUser = { ...statsuser };


                            updatedUser.health = parseInt(e.target.value, 10) || 0;


                            setStatsUser(updatedUser);

                            updateNpcs()
                          }} />/ <input
                          style={{ borderRadius: '5px', backgroundColor: 'hsl(34, 97%, 31%)', color: 'white', fontWeight: 'bold', maxWidth: '50px' }}
                          value={statsuser.maxHealth} onChange={(e) => {

                            const updatedUser = { ...statsuser };


                            updatedUser.maxHealth = parseInt(e.target.value, 10) || 0;


                            setStatsUser(updatedUser);

                            updateNpcs()
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

                            updateNpcs()
                          }} />/ <input
                          style={{ borderRadius: '5px', backgroundColor: 'hsl(34, 97%, 31%)', color: 'white', fontWeight: 'bold', maxWidth: '50px' }}
                          value={statsuser.maxMana} onChange={(e) => {

                            const updatedUser = { ...statsuser };


                            updatedUser.maxMana = parseInt(e.target.value, 10) || 0;


                            setStatsUser(updatedUser);

                            updateNpcs()
                          }} />
                        <input style={{ width: '100%', maxWidth: '150px' }} type="range" id='barm' min="0" max={statsuser.maxMana} value={statsuser.mana} readOnly />
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', marginBlock: '5px', width: '60%', gap: '5px', border: '1px solid black', padding: '5px', borderRadius: '5px' }} >
                        Tomar dano
                        <input type='text' style={{ borderRadius: '5px', backgroundColor: 'hsl(34, 97%, 31%)', color: 'white', fontWeight: 'bold', maxWidth: '150px' }} placeholder='Valor do dano' value={takedmg} onChange={(e) => {
                          setTakeDmg(e.target.value)
                          updateNpcs()
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
                          updateNpcs()

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

                            updateNpcs()
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

                            updateNpcs()
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

                            updateNpcs()
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

                            updateNpcs()
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

                            updateNpcs()
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

                            updateNpcs()
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

                            updateNpcs()
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
                            updateNpcs()
                          }}
                        />
                        ({statsuser.def + statsuserequip.def})
                      </div>
                      <div style={{
                        display: 'flex',
                        gap: '15px', marginTop: '20px', position: 'relative', top: '-350px'
                      }} >

                        <button type='button' onClick={() => {
                          const updatedUser = { ...statsuser };
                          updatedUser.health = updatedUser.maxHealth;
                          setStatsUser(updatedUser);
                          handleUpdateStats(updatedUser);
                          updateNpcs()
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
                          updateNpcs()
                        }} className={styles.pushable}>
                          <span style={{ fontSize: '10px', width: '96px' }} className={styles.edge}></span>
                          <span style={{ fontSize: '12px', width: '70px' }} className={styles.front}>
                            Encher Mana
                          </span>
                        </button>
                        <div style={{ display: 'flex' }} >

                          <button style={{ display: ReqKeeper ? 'none' : 'flex' }} type='button' onClick={() => {
                            updateNpcs1();
                            setReqKeeper(true);


                          }} className={styles.pushable}>
                            <span style={{ fontSize: '10px', width: '116px' }} className={styles.edge}></span>
                            <span style={{ fontSize: '12px', width: '90px', color: disableUpdate ? '#D70040' : 'white' }} className={styles.front}>
                              Salvar Informações
                            </span>
                          </button>
                          <div style={{ position: 'relative', left: '10px', color: '#D70040' }} >

                            {disableUpdate ? <KeyboardBackspaceIcon /> : null}
                          </div>
                        </div>
                      </div>
                    </div>


                  </div> : null}


              </div>
              {user?.id === playersid[0] ?
                <div style={{
                  color: 'black', display: 'flex', justifyContent: 'center', flexDirection: 'column',
                  alignContent: 'center', width: '100%', alignItems: 'center', gap: '20px', position: 'relative', bottom: '200px', left: '100px'
                }}>
                  <div style={{ display: 'flex', gap: '20px' }} >
                    {statsuser.earing?.atk ?
                      <div className={styles.slots} onClick={() => {
                        const updatedUser = { ...statsuser };
                        const index = items.findIndex(item => item.name === statsuser.earing?.name);
                        if (index !== -1) {

                          updatedUser.earing = '';
                          handleAddItem2(index);
                          setStatsUser(updatedUser);
                          handleUpdateStats(updatedUser)

                          updateNpcs()


                        } else {
                          console.log('Item not found!');
                        }

                      }} style={{ display: 'flex', width: '100%', flexDirection: 'column' }}>
                        <div> {statsuser.earing?.name} </div>
                        <img src={statsuser?.earing?.url} alt="Gear" style={{ maxWidth: '50px', height: 'auto', alignSelf: 'center' }} />
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
                          handleAddItem2(index);
                          setStatsUser(updatedUser);
                          handleUpdateStats(updatedUser)
                          updateNpcs()
                        } else {
                          console.log('Item not found!');
                        }

                      }} style={{ display: 'flex', width: '100%', flexDirection: 'column' }}>
                        <div> {statsuser.head?.name} </div>
                        <img src={statsuser?.head?.url} alt="Gear" style={{ maxWidth: '50px', height: 'auto', alignSelf: 'center' }} />
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
                          handleAddItem2(index);
                          setStatsUser(updatedUser);
                          handleUpdateStats(updatedUser)


                          updateNpcs()
                        } else {
                          console.log('Item not found!');
                        }

                      }} style={{ display: 'flex', width: '100%', flexDirection: 'column' }}>
                        <div> {statsuser.lefthand?.name} </div>
                        <img src={statsuser?.lefthand?.url} alt="Gear" style={{ maxWidth: '50px', height: 'auto', alignSelf: 'center' }} />
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
                          handleAddItem2(index);
                          setStatsUser(updatedUser);
                          handleUpdateStats(updatedUser)
                          updateNpcs()
                        } else {
                          console.log('Item not found!');
                        }

                      }} style={{ display: 'flex', width: '100%', flexDirection: 'column' }}>
                        <div> {statsuser.chest?.name} </div>
                        <img src={statsuser?.chest?.url} alt="Gear" style={{ maxWidth: '50px', height: 'auto', alignSelf: 'center' }} />
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
                          handleAddItem2(index);
                          setStatsUser(updatedUser);
                          handleUpdateStats(updatedUser)
                          updateNpcs()
                        } else {
                          console.log('Item not found!');
                        }

                      }} style={{ display: 'flex', width: '100%', flexDirection: 'column' }}>
                        <div> {statsuser.righthand?.name} </div>
                        <img src={statsuser?.righthand?.url} alt="Gear" style={{ maxWidth: '50px', height: 'auto', alignSelf: 'center' }} />
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
                          handleAddItem2(index);
                          setStatsUser(updatedUser);
                          handleUpdateStats(updatedUser)
                          updateNpcs()
                        } else {
                          console.log('Item not found!');
                        }

                      }} style={{ display: 'flex', width: '100%', flexDirection: 'column' }}>
                        <div> {statsuser.ringleft?.name} </div>
                        <img src={statsuser?.ringleft?.url} alt="Gear" style={{ maxWidth: '50px', height: 'auto', alignSelf: 'center' }} />
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
                          handleAddItem2(index);
                          setStatsUser(updatedUser);
                          handleUpdateStats(updatedUser)
                          updateNpcs()
                        } else {
                          console.log('Item not found!');
                        }

                      }} style={{ display: 'flex', width: '100%', flexDirection: 'column' }}>
                        <div> {statsuser.pants?.name} </div>
                        <img src={statsuser?.pants?.url} alt="Gear" style={{ maxWidth: '50px', height: 'auto', alignSelf: 'center' }} />
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
                          handleAddItem2(index);
                          setStatsUser(updatedUser);
                          handleUpdateStats(updatedUser)
                          updateNpcs()

                        } else {
                          console.log('Item not found!');
                        }

                      }} style={{ display: 'flex', width: '100%', flexDirection: 'column' }}>
                        <div> {statsuser.ringright?.name} </div>
                        <img src={statsuser?.ringright?.url} alt="Gear" style={{ maxWidth: '50px', height: 'auto', alignSelf: 'center' }} />
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
                          handleAddItem2(index);
                          setStatsUser(updatedUser);
                          handleUpdateStats(updatedUser)
                          updateNpcs()
                        } else {
                          console.log('Item not found!');
                        }

                      }} style={{ display: 'flex', width: '100%', flexDirection: 'column' }}>
                        <div> {statsuser.othersleft?.name} </div>
                        <img src={statsuser?.othersleft?.url} alt="Gear" style={{ maxWidth: '50px', height: 'auto', alignSelf: 'center' }} />
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
                          handleAddItem2(index);
                          setStatsUser(updatedUser);
                          handleUpdateStats(updatedUser)
                          updateNpcs()

                        } else {
                          console.log('Item not found!');
                        }

                      }} style={{ display: 'flex', width: '100%', flexDirection: 'column' }}>
                        <div> {statsuser.shoes?.name} </div>
                        <img src={statsuser?.shoes?.url} alt="Gear" style={{ maxWidth: '50px', height: 'auto', alignSelf: 'center' }} />
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
                          handleAddItem2(index);
                          setStatsUser(updatedUser);
                          handleUpdateStats(updatedUser)
                          updateNpcs()

                        } else {
                          console.log('Item not found!');
                        }

                      }} style={{ display: 'flex', width: '100%', flexDirection: 'column' }}>
                        <div> {statsuser.othersright?.name} </div>
                        <img src={statsuser?.othersright?.url} alt="Gear" style={{ maxWidth: '50px', height: 'auto', alignSelf: 'center' }} />
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
              {user?.id === playersid[0] ?
                <div className={styles.rpgdiv4} style={{ position: 'absolute', top: '0px', right: '950px', maxWidth: '500px' }} >
                  <h1 style={{ width: '100%', justifyContent: 'center', display: 'flex' }} className={styles.medievalsharp} > Inventario do Npc
                    ({inventory?.length || 0} Items)</h1>
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

                  <div className={styles.customScrollDiv} style={{
                    height: 'auto',
                    width: '20vw', display: 'flex',
                    overflowX: 'scroll', transform: 'scaleY(-1)'
                  }}>
                    <div style={{ minWidth: '1600px', display: 'flex', gap: '25px', flexWrap: 'wrap', transform: 'scaleY(-1)', position: 'relative', bottom: '10px', marginTop: '20px' }} >
                      {inventory?.map((item, index) => (
                        <div
                          className={styles.slotsinv}
                          style={{ color: 'black', maxHeight: '350px', maxWidth: '200px', gap: '5px', padding: '5px', borderRadius: '5px', justifyContent: 'space-between', display: 'flex', flexDirection: 'column' }} key={index}>
                          {item?.item?.url ? (
                            <div onClick={() => {
                              if (item?.item?.canequip) {
                                const types = item?.item?.typewear;
                                const updatedUser = { ...statsuser };
                                if (updatedUser[types]) {
                                  alert('Desequipe primeiro o item!')
                                } else {
                                  updatedUser[types] = inventory[index]?.item;
                                  handleUpdateQuantity2(index, -1, updatedUser);
                                  setStatsUser(updatedUser);
                                  handleUpdateStats(updatedUser);
                                  updateNpcs()
                                }
                              }
                            }} style={{ display: 'flex', justifyContent: 'center' }} >
                              <img src={item?.item?.url} alt="Gear" style={{ maxWidth: '100px', height: 'auto' }} />

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

                          <button onClick={() => handleUpdateQuantity(index, -item?.quantity)} style={{ backgroundColor: 'red', color: 'white', cursor: 'pointer' }}>
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



                </div> : null}

            </div>



            : null}

        </div>
        :
        null


      }


      {showinfo === true && !isLoading ?

        <div className={styles.mapbody}>
          <div className={styles.maptitle}>
            <div>
              {user?.id !== playersid[0] ?
                <div className={styles.rpgdiv4} style={{ marginRight: '30px', position: 'fixed', zIndex: '9999', top: '0px', display: buttonShowMapInfo ? 'block' : 'none' }}>
                  {playerlocation?.find(obj => obj.npcmap.ownerId === user?.id) ?
                    <div>

                      Você já criou seu personagem e está no mapa no tile {playerlocation?.find(obj => obj.npcmap.ownerId === user?.id).tile}

                    </div>
                    :
                    <div>
                      Adicionar personagem no mapa
                      <input placeholder='numero do tile' type='number' value={tile} onChange={(e) => {
                        setTile(e.target.value)
                      }} />
                      <button onClick={() => {
                        if (tile && inventory) {

                          AddPlayerToMap()
                        }
                      }} type='button' >Adicionar</button>


                    </div>
                  }



                </div> : null}



            </div>
            <div style={{ position: 'fixed', zIndex: '9999', top: '0px', left: '600px', display: buttonShowMapInfo ? 'block' : 'none' }} className={styles.rpgdiv5}>

              <div style={{ width: '100%', justifyContent: 'center', display: 'flex' }} className={styles.medievalsharp}>

                Mapa:  {map?.name}
              </div>

              {user?.id === playersid[0] ?
                <div style={{ display: 'flex', width: '550px', gap: '20px' }} >
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
                          getFullMap()
                         


                        }} className={styles.pushable}>
                          <span className={styles.edge}></span>
                          <span className={styles.front}>
                            Editar Mapa Atual
                          </span>
                        </button>

                        <button onClick={() => {
                          removemap(map?.name)

                        }} className={styles.pushable}>
                          <span className={styles.edge}></span>
                          <span className={styles.front}>
                            Deletar Mapa Atual
                          </span>
                        </button>

                        <button onClick={() => {
                          updateSession({ PlayersPos: [] })

                        }} className={styles.pushable}>
                          <span className={styles.edge}></span>
                          <span className={styles.front}>
                            Limpar mapa
                          </span>
                        </button>
                        &nbsp;
                        <div> Escala do mapa: {scale}
                        </div>
                        &nbsp;
                        <div> 
                          Escala dos blocos: {blockscale}
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
                      <div  >
                        Escala do mapa (Mexa primeiro na escala dos blocos abaixo desse):
                        <input
                          style={{ borderRadius: '5px', backgroundColor: 'hsl(34, 97%, 31%)', color: 'white', fontWeight: 'bold', maxWidth: '50px' }}
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
                      <div  >
                        Escala dos blocos da grid:
                        <input
                          style={{ borderRadius: '5px', backgroundColor: 'hsl(34, 97%, 31%)', color: 'white', fontWeight: 'bold', maxWidth: '50px' }}
                          value={blocknewscale}
                          onChange={(e) => {
                            setblockNewScale(e.target.value);
                           
                            const maxtile1 = Math.ceil(imageWidth / (60 * e.target.value) * newscale)
                            const maxtile2 = Math.ceil(imageHeight / (60 * e.target.value) * newscale)

                            const size = maxtile1*maxtile2;
                            console.log(size)
                            if(size > 0 && size < 4096){

                              setGridItems(Array.from({length: size}))
                            }

                          }}
                        />
                        <div>
                          <input

                            step="0.01"
                            type="range"
                            min="0.1"
                            max="2"
                            value={blocknewscale}
                            onChange={(e) => {
                              setblockNewScale(e.target.value);
                            console.log(gridItems)
                            const maxtile1 = Math.ceil(imageWidth / (60 * e.target.value) * newscale)
                            const maxtile2 = Math.ceil(imageHeight / (60 * e.target.value) * newscale)

                            const size = maxtile1*maxtile2;
                            console.log(size)
                            if(size > 0 && size < 4096){

                              setGridItems(Array.from({length: size}))
                            }

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
                      <button type='button' onClick={() => {

                        showWallTool()
                      }} className={styles.pushable}>
                        <span style={{ fontSize: '10px', width: '116px' }} className={styles.edge}></span>
                        <span style={{ fontSize: '10px', width: '90px' }} className={styles.front}>
                          PREMIUM: Spawners, traps, walls
                        </span>
                      </button>

                    </form>
                  </div>


                </div>
                : null}
              <div className={styles.medievalsharp} >

                <button style={{ marginRight: '20px' }} onClick={() => {
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
                  <span style={{ fontSize: '10px', width: '116px' }} className={styles.edge}></span>
                  <span style={{ fontSize: '10px', width: '90px' }} className={styles.front}>
                    Mostrar numero dos tiles
                  </span>
                </button>

              </div>
            </div>
          </div>
          <div style={{
            backgroundImage: imgprev ? `url('${imgprev}')` : `url('${map?.url}')`,
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat'


          }} className={styles.mapcontainer}>
            <div className={styles.mapgrid} style={{
              position: 'relative', gridTemplateRows: `repeat(${Math.ceil(imageHeight / (60 * blocknewscale))}, 1fr)`,
              gridTemplateColumns: `repeat(${Math.ceil(imageWidth / (60 * blocknewscale))}, 1fr)`,
            }}>
              {gridItems.map((_, index) => (
                <div
                  key={index}
                  className={styles.gridItem}
                  style={{
                    color: showTile ? 'rgba(236, 233, 233, 0.718)' : 'rgba(236, 233, 233, 0)',
                    border: showGrid ? '1px solid rgba(236, 233, 233, 0.718)' : 'none',
                    width: `${60 * blocknewscale * newscale}px`,
                    height: `${60 * blocknewscale * newscale}px`,
                    boxSizing: 'border-box',


                  }}

                  onDragOver={handleDragOver}
                  onDrop={(e) =>
                    handleDrop(e, index)

                  }
                >
                  Tile {index}
                </div>
              ))}
              {playerlocation.map((player, index) => (
                <div key={index}>
                  {player.npcmap.ownerId === user.id ?
                    <div
                      className={styles.gridPlayer}
                      style={{
                        backgroundImage: player.npcmap.Isnpc ? `url(${player.npcmap.NpcUrlPhoto})` : null,
                        position: 'absolute',
                        borderRadius: '50%',
                        position: 'absolute',
                        top: `${Math.floor(parseInt(player.tile) / Math.ceil(imageWidth / (60 * blocknewscale) )) * 60 * blocknewscale * newscale}px`,
                        left: `${parseInt(player.tile) % Math.ceil(imageWidth / (60 * blocknewscale) ) * 60 * blocknewscale * newscale}px`,
                       width: `${60 * blocknewscale * newscale}px`,
                        height: `${60 * blocknewscale * newscale}px`,
                        border: player.npcmap.ownerId === user.id ? '1px solid red' : '1px solid blue',
                        transition: 'top 1.5s, left 1.5s 1.5s',
                        zIndex: 9999,
                      }}
                      draggable
                      onDragStart={(e) => handleDragStart(e, parseInt(player.tile))}
                    >

                      <div style={{ color: 'white', position: 'relative', top: '-30px' }} >
                        {!player.npcmap.Isnpc ?
                          <CharGet ownerId={player.npcmap.ownerId} />

                          : null}
                        {player.npcmap.Npcname}
                        <HealthBar useridfind={player.npcmap.idtrack} />
                      </div>
                    </div>
                    :
                    <div
                      key={player.npcmap.idtrack}
                      className={styles.gridPlayer}
                      style={{
                        backgroundImage: player.npcmap.Isnpc ? `url(${player.npcmap.NpcUrlPhoto})` : null,
                        position: 'absolute',
                        borderRadius: '50%',
                        top: `${Math.floor(parseInt(player.tile) / Math.ceil(imageWidth / (60 * blocknewscale) )) * 60 * blocknewscale * newscale}px`,
                        left: `${parseInt(player.tile) % Math.ceil(imageWidth / (60 * blocknewscale) ) * 60 * blocknewscale * newscale}px`,
                       width: `${60 * blocknewscale * newscale}px`,
                        height: `${60 * blocknewscale * newscale}px`,
                        border: player.npcmap.ownerId === user.id ? '1px solid red' : '1px solid blue',
                        transition: 'top 1.5s, left 1.5s 1.5s',
                      }}
                      onDragStart={(e) => handleDragStart(e, parseInt(player.tile))}
                    >

                      <div style={{ color: 'white', position: 'relative', top: '-30px' }} >
                        {!player.npcmap.Isnpc ?
                          <CharGet ownerId={player.npcmap.ownerId} /> : null}
                        {player.npcmap.Npcname}
                        <HealthBar useridfind={player.npcmap.idtrack} />
                      </div>
                    </div>}
                </div>
              ))}
              {wallocator.map((wall, index) => (

                <div
                  key={index}

                  style={{

                    position: 'absolute',
                    boxSizing: 'border-box',
                    top: `${Math.floor(parseInt(wall) / Math.ceil(imageWidth / (60 * blocknewscale))) * 60 * blocknewscale * newscale}px`,
                    left: `${parseInt(wall) % Math.ceil(imageWidth / (60 * blocknewscale)) * 60 * blocknewscale * newscale}px`,
                    width: `${60 * blocknewscale * newscale}px`,
                    height: `${60 * blocknewscale * newscale}px`,
                    display: imgprev ? 'none' : 'flex',
                    transition: 'top 1.5s, left 1.5s 1.5s',
                    backgroundColor: 'rgb(0, 0, 0, 0.5)',
                    border:'1px solid gray'

                  }}

                >
                </div>

              ))}
              {wallocatornew.map((wall, index) => (

                <div
                  key={index}

                  style={{

                    position: 'absolute',
                    boxSizing: 'border-box',
                    top: `${Math.floor(parseInt(wall) / Math.ceil(imageWidth / (60 * blocknewscale))) * 60 * blocknewscale * newscale}px`,
                    left: `${parseInt(wall) % Math.ceil(imageWidth / (60 * blocknewscale)) * 60 * blocknewscale * newscale}px`,
                   width: `${60 * blocknewscale * newscale}px`,
                    height: `${60 * blocknewscale * newscale}px`,
                    display: !imgprev ? 'none' : 'flex',
                    transition: 'top 1.5s, left 1.5s 1.5s',
                    backgroundColor: 'rgb(0, 0, 0, 0.5)',
                    border:'1px solid gray'

                  }}

                >
                </div>

              ))}
            </div>
          </div>
          {user?.id !== playersid[0] ?
            <div className={styles.rpgdiv4} style={{ zIndex: '9999', position: 'fixed', top: '0px', maxWidth: '1100px', left: '850px', display: buttonShowInvInfo ? 'block' : 'none' }} >
              <h1 style={{ width: '100%', justifyContent: 'center', display: 'flex' }} className={styles.medievalsharp} > SEU INVENTARIO
                ({inventory?.length || 0} Items)</h1>
              <div>

                <select disabled={!npcssession.some(npc => npc.ownerId === user.id)} id="itemSelect" onChange={handleAddItem}>
                  <option value="">Adicione um item</option>
                  {items?.map((item, index) => (
                    <option key={index} value={index}>{item.name}</option>
                  ))}
                </select>
              </div>

              <div className={styles.customScrollDiv} style={{ height: 'auto', width: '50vw', display: 'flex', overflowX: 'scroll', transform: 'scaleY(-1)' }}>
                <div style={{
                  color: 'black', minWidth: '1600px',
                  display: 'flex', gap: '25px', flexWrap: 'wrap',
                  transform: 'scaleY(-1)', position: 'relative', bottom: '10px',
                  marginTop: '20px'
                }} >
                  {inventory?.map((item, index) => (
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
                              updatedUser[types] = inventory[index]?.item;
                              handleUpdateQuantity2(index, -1, updatedUser);
                              setStatsUser(updatedUser);
                              handleUpdateStats(updatedUser)
                              updateNpcs()
                            }
                          }
                        }} style={{ display: 'flex', justifyContent: 'center' }} >
                          <img src={item?.item?.url} alt="Gear" style={{ maxWidth: '100px', height: 'auto' }} />

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

                      <button onClick={() => handleUpdateQuantity(index, -item?.quantity)} style={{ backgroundColor: 'red', color: 'white', cursor: 'pointer' }}>
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



            </div> : null}




        </div>


        : null}
      {showinfo === true && !isLoading ?

        <div className={styles.infobody}>
          <div style={{ position: 'fixed', zIndex: '9999', bottom: '70px', left: '0', display: buttonInfoSession ? 'block' : 'none' }} className={styles.rpgdiv4}>
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
          <div className={styles.rpgdiv4} style={{ marginTop: '10px', position: 'fixed', zIndex: '9999', bottom: '265px', left: '520px', display: buttonInfoSession ? 'block' : 'none' }}>
            <div style={{ justifyContent: 'center', width: '100%', display: 'flex' }} className={styles.medievalsharp}>
              Titulo do jogo: {title}

            </div>
            <div style={{ justifyContent: 'center', width: '100%', display: 'flex' }} className={styles.medievalsharp}>
              Livro de RPG: {bookrpg}

            </div>

            {user?.id === playersid[0] ?
              <div  >
                <form onSubmit={(e) => {
                  e.preventDefault()
                  if (titulo.length > 3 && titulo !== title) {
                    updateSession({ title: titulo });
                  } else {
                    alert('O titulo tem que ser maior que 5 caracteres, e diferente do titulo anterior')
                  }
                }} style={{ width: '100%', justifyContent: 'center', display: 'flex' }}>
                  <input style={{ borderRadius: '5px', backgroundColor: 'hsl(34, 97%, 31%)', color: 'white', fontWeight: 'bold', maxWidth: '250px' }} value={titulo} onChange={(e) => {
                    setTitulo(e.target.value)
                  }} />

                  <button type='button' style={{ maxHeight: '50px' }} onClick={() => {
                    if (titulo.length > 3 && titulo !== title) {
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

            {user?.id === playersid[0] ?
              <div  >
                <form onSubmit={(e) => {
                  e.preventDefault()
                  if (newbookrpg && newbookrpg.length > 1 && newbookrpg !== bookrpg) {
                    updateSession({ bookrpg: newbookrpg });
                  } else {
                    alert('Nome inválido para livro de rpg')
                  }
                }} style={{ width: '100%', justifyContent: 'center', display: 'flex' }}>
                  <select style={{ borderRadius: '5px', backgroundColor: 'hsl(34, 97%, 31%)', color: 'white', fontWeight: 'bold', maxWidth: '250px' }} value={newbookrpg} onChange={(e) => {
                    setNewBookRpg(e.target.value)
                  }}>
                    <option value="">Selecione uma opção</option>
                    <option value="generic">Genérico</option>
                    <option value="d&d">D&D</option>

                  </select>

                  <button type='button' style={{ maxHeight: '50px' }} onClick={() => {
                    if (newbookrpg && newbookrpg.length > 1 && newbookrpg !== bookrpg) {
                      updateSession({ bookrpg: newbookrpg });
                    } else {
                      alert('Nome inválido para livro de rpg')
                    }
                  }} className={styles.pushable}>
                    <span style={{ fontSize: '12px', width: '136px', height: '50px' }} className={styles.edge}></span>
                    <span style={{ fontSize: '12px', width: '110px', height: '25px' }} className={styles.front}>
                      Mudar o livro da sessão
                    </span>
                  </button>


                </form>
              </div> : null}
          </div>
          <div style={{ marginTop: '10px', gap: '10px', flexDirection: 'column', marginBottom: '10px', position: 'fixed', zIndex: '9999', bottom: '220px', maxWidth: '500px', left: '0', display: buttonInfoSession ? 'flex' : 'none' }}>
            <div className={styles.rpgdiv4} style={{ height: '100%', display: 'flex', gap: '10px', flexWrap: 'wrap', justifyContent: 'center' }}>
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
              <div className={styles.rpgdiv4} style={{ marginTop: '10px', gap: '10px', flexDirection: 'column', marginBottom: '10px', position: 'fixed', zIndex: '9999', bottom: '70px', left: '400px', display: buttonInfoSession ? 'flex' : 'none' }}>
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
          {user?.id !== playersid[0] ?
            <div style={{ position: 'fixed', top: '0px', left: '10px', display: buttonShowInvInfo ? 'block' : 'none', zIndex: '9999' }} >
              {!npcssession.some(npc => npc.ownerId === user.id) ?
                <div className={styles.rpgdiv5} >
                  <input placeholder='Seu Nome' value={nameuser} onChange={(e) => { setNameUser(e.target.value) }} />
                  <input disabled={!nameuser} placeholder='Foto do personagem' value={urlphotouser} onChange={(e) => { setUrlPhotoUser(e.target.value) }} />
                  {urlphotouser !== '' ?
                    <img src={urlphotouser} alt='personagem' width={40} height={40} /> : null}
                  <button disabled={!urlphotouser} onClick={() => {
                    createInventory()
                  }} >Criar inventário</button>

                </div>
                :
                <div className={styles.rpgdiv1} style={{
                  height: '100%', display: 'flex', maxWidth: '100%', gap: '5px', flexWrap: 'wrap',
                  flexDirection: 'column', position: 'relative', right: '0px'
                }}>
                  <div style={{ display: 'flex', flexDirection: 'column' }} >
                    <div className={styles.medievalsharp}>Seus Atributos </div>
                    {user?.id !== playersid[0] ?
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

                                updateNpcs()


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

                                updateNpcs()
                              }} />


                          </div>
                          <div>
                            Vida atual e máxima:  <input
                              style={{ borderRadius: '5px', backgroundColor: 'hsl(34, 97%, 31%)', color: 'white', fontWeight: 'bold', maxWidth: '50px' }}
                              value={statsuser.health} onChange={(e) => {

                                const updatedUser = { ...statsuser };


                                updatedUser.health = parseInt(e.target.value, 10) || 0;


                                setStatsUser(updatedUser);

                                updateNpcs()
                              }} />/ <input
                              style={{ borderRadius: '5px', backgroundColor: 'hsl(34, 97%, 31%)', color: 'white', fontWeight: 'bold', maxWidth: '50px' }}
                              value={statsuser.maxHealth} onChange={(e) => {

                                const updatedUser = { ...statsuser };


                                updatedUser.maxHealth = parseInt(e.target.value, 10) || 0;


                                setStatsUser(updatedUser);

                                updateNpcs()
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

                                updateNpcs()
                              }} />/ <input
                              style={{ borderRadius: '5px', backgroundColor: 'hsl(34, 97%, 31%)', color: 'white', fontWeight: 'bold', maxWidth: '50px' }}
                              value={statsuser.maxMana} onChange={(e) => {

                                const updatedUser = { ...statsuser };


                                updatedUser.maxMana = parseInt(e.target.value, 10) || 0;


                                setStatsUser(updatedUser);

                                updateNpcs()
                              }} />
                            <input style={{ width: '100%', maxWidth: '150px' }} type="range" id='barm' min="0" max={statsuser.maxMana} value={statsuser.mana} readOnly />
                          </div>
                          <div style={{ display: 'flex', flexDirection: 'column', marginBlock: '5px', width: '60%', gap: '5px', border: '1px solid black', padding: '5px', borderRadius: '5px' }} >
                            Tomar dano
                            <input type='text' style={{ borderRadius: '5px', backgroundColor: 'hsl(34, 97%, 31%)', color: 'white', fontWeight: 'bold', maxWidth: '150px' }} placeholder='Valor do dano' value={takedmg} onChange={(e) => {
                              setTakeDmg(e.target.value)
                              updateNpcs()
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
                              updateNpcs()

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

                                updateNpcs()
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

                                updateNpcs()
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

                                updateNpcs()
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

                                updateNpcs()
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

                                updateNpcs()
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

                                updateNpcs()
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

                                updateNpcs()
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
                                updateNpcs()
                              }}
                            />
                            ({statsuser.def + statsuserequip.def})
                          </div>
                          <div style={{ display: 'flex', gap: '15px', marginTop: '20px' }} >

                            <button type='button' onClick={() => {
                              const updatedUser = { ...statsuser };
                              updatedUser.health = updatedUser.maxHealth;
                              setStatsUser(updatedUser);
                              handleUpdateStats(updatedUser);
                              updateNpcs()
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
                              updateNpcs()
                            }} className={styles.pushable}>
                              <span style={{ fontSize: '10px', width: '96px' }} className={styles.edge}></span>
                              <span style={{ fontSize: '12px', width: '70px' }} className={styles.front}>
                                Encher Mana
                              </span>
                            </button>
                            <div style={{ display: 'flex' }} >

                              <button style={{ display: ReqKeeper ? 'none' : 'flex' }} type='button' onClick={() => {
                                updateNpcs1();



                              }} className={styles.pushable}>
                                <span style={{ fontSize: '10px', width: '116px' }} className={styles.edge}></span>
                                <span style={{ fontSize: '12px', width: '90px', color: disableUpdate ? '#D70040' : 'white' }} className={styles.front}>
                                  Salvar Informações
                                </span>
                              </button>
                              <div style={{ position: 'relative', left: '10px', color: '#D70040' }} >

                                {disableUpdate ? <KeyboardBackspaceIcon /> : null}
                              </div>
                            </div>
                          </div>
                        </div>


                      </div> : null}


                  </div>
                  {user?.id !== playersid[0] ?
                    <div style={{
                      color: 'black', display: 'flex', justifyContent: 'center', flexDirection: 'column',
                      alignContent: 'center', width: '100%', alignItems: 'center', gap: '20px', position: 'relative', bottom: '115px', left: '80px'
                    }}>
                      <div style={{ display: 'flex', gap: '20px' }} >
                        {statsuser.earing?.atk ?
                          <div className={styles.slots} onClick={() => {
                            const updatedUser = { ...statsuser };
                            const index = items.findIndex(item => item.name === statsuser.earing?.name);
                            if (index !== -1) {

                              updatedUser.earing = '';
                              handleAddItem2(index);
                              setStatsUser(updatedUser);
                              handleUpdateStats(updatedUser)

                              updateNpcs()


                            } else {
                              console.log('Item not found!');
                            }

                          }} style={{ display: 'flex', maxHeight: '120px', flexDirection: 'column' }}>

                            <img src={statsuser?.earing?.url} alt="Gear" style={{ maxWidth: '60px', height: 'auto', alignSelf: 'center' }} />
                            <div style={{ display: 'flex', justifyContent: 'center', alignContent: 'center', width: '100%' }}  >
                              <div  >
                                <CloseFullscreenIcon />{statsuser.earing?.atk}
                              </div>
                              <div>
                                <ShieldIcon />{statsuser.earing?.def}
                              </div>

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
                              handleAddItem2(index);
                              setStatsUser(updatedUser);
                              handleUpdateStats(updatedUser)
                              updateNpcs()
                            } else {
                              console.log('Item not found!');
                            }

                          }} style={{ display: 'flex', width: '100%', flexDirection: 'column' }}>

                            <img src={statsuser?.head?.url} alt="Gear" style={{ maxWidth: '60px', height: 'auto', alignSelf: 'center' }} />
                            <div style={{ display: 'flex', justifyContent: 'center', alignContent: 'center', width: '100%' }}  >
                              <div  >
                                <CloseFullscreenIcon />{statsuser.head?.atk}
                              </div>
                              <div>
                                <ShieldIcon />{statsuser.head?.def}
                              </div>

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
                              handleAddItem2(index);
                              setStatsUser(updatedUser);
                              handleUpdateStats(updatedUser)
                              handleUpdateStats(updatedUser)

                              updateNpcs()
                            } else {
                              console.log('Item not found!');
                            }

                          }} style={{ display: 'flex', width: '100%', flexDirection: 'column' }}>

                            <img src={statsuser?.lefthand?.url} alt="Gear" style={{ maxWidth: '60px', height: 'auto', alignSelf: 'center' }} />
                            <div style={{ display: 'flex', justifyContent: 'center', alignContent: 'center', width: '100%' }}  >
                              <div  >
                                <CloseFullscreenIcon />{statsuser.lefthand?.atk}
                              </div>
                              <div>
                                <ShieldIcon />{statsuser.lefthand?.def}
                              </div>

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
                              handleAddItem2(index);
                              setStatsUser(updatedUser);
                              handleUpdateStats(updatedUser)
                              updateNpcs()
                            } else {
                              console.log('Item not found!');
                            }

                          }} style={{ display: 'flex', width: '100%', flexDirection: 'column' }}>

                            <img src={statsuser?.chest?.url} alt="Gear" style={{ maxWidth: '60px', height: 'auto', alignSelf: 'center' }} />
                            <div style={{ display: 'flex', justifyContent: 'center', alignContent: 'center', width: '100%' }}  >
                              <div  >
                                <CloseFullscreenIcon />{statsuser.chest?.atk}
                              </div>
                              <div>
                                <ShieldIcon />{statsuser.chest?.def}
                              </div>

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
                              handleAddItem2(index);
                              setStatsUser(updatedUser);
                              handleUpdateStats(updatedUser)
                              updateNpcs()
                            } else {
                              console.log('Item not found!');
                            }

                          }} style={{ display: 'flex', width: '100%', flexDirection: 'column' }}>

                            <img src={statsuser?.righthand?.url} alt="Gear" style={{ maxWidth: '60px', height: 'auto', alignSelf: 'center' }} />
                            <div style={{ display: 'flex', justifyContent: 'center', alignContent: 'center', width: '100%' }}  >
                              <div  >
                                <CloseFullscreenIcon />{statsuser.righthand?.atk}
                              </div>
                              <div>
                                <ShieldIcon />{statsuser.righthand?.def}
                              </div>

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
                              handleAddItem2(index);
                              setStatsUser(updatedUser);
                              handleUpdateStats(updatedUser)
                              updateNpcs()
                            } else {
                              console.log('Item not found!');
                            }

                          }} style={{ display: 'flex', width: '100%', flexDirection: 'column' }}>

                            <img src={statsuser?.ringleft?.url} alt="Gear" style={{ maxWidth: '60px', height: 'auto', alignSelf: 'center' }} />
                            <div style={{ display: 'flex', justifyContent: 'center', alignContent: 'center', width: '100%' }}  >
                              <div  >
                                <CloseFullscreenIcon />{statsuser.ringleft?.atk}
                              </div>
                              <div>
                                <ShieldIcon />{statsuser.ringleft?.def}
                              </div>

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
                              handleAddItem2(index);
                              setStatsUser(updatedUser);
                              handleUpdateStats(updatedUser)
                              updateNpcs()
                            } else {
                              console.log('Item not found!');
                            }

                          }} style={{ display: 'flex', width: '100%', flexDirection: 'column' }}>

                            <img src={statsuser?.pants?.url} alt="Gear" style={{ maxWidth: '60px', height: 'auto', alignSelf: 'center' }} />
                            <div style={{ display: 'flex', justifyContent: 'center', alignContent: 'center', width: '100%' }}  >
                              <div  >
                                <CloseFullscreenIcon />{statsuser.pants?.atk}
                              </div>
                              <div>
                                <ShieldIcon />{statsuser.pants?.def}
                              </div>

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
                              handleAddItem2(index);
                              setStatsUser(updatedUser);
                              handleUpdateStats(updatedUser)
                              updateNpcs()

                            } else {
                              console.log('Item not found!');
                            }

                          }} style={{ display: 'flex', width: '100%', flexDirection: 'column' }}>

                            <img src={statsuser?.ringright?.url} alt="Gear" style={{ maxWidth: '60px', height: 'auto', alignSelf: 'center' }} />
                            <div style={{ display: 'flex', justifyContent: 'center', alignContent: 'center', width: '100%' }}  >
                              <div  >
                                <CloseFullscreenIcon />{statsuser.ringright?.atk}
                              </div>
                              <div>
                                <ShieldIcon />{statsuser.ringright?.def}
                              </div>

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
                              handleAddItem2(index);
                              setStatsUser(updatedUser);
                              handleUpdateStats(updatedUser)
                              updateNpcs()
                            } else {
                              console.log('Item not found!');
                            }

                          }} style={{ display: 'flex', width: '100%', flexDirection: 'column' }}>

                            <img src={statsuser?.othersleft?.url} alt="Gear" style={{ maxWidth: '60px', height: 'auto', alignSelf: 'center' }} />
                            <div style={{ display: 'flex', justifyContent: 'center', alignContent: 'center', width: '100%' }}  >
                              <div  >
                                <CloseFullscreenIcon />{statsuser.othersleft?.atk}
                              </div>
                              <div>
                                <ShieldIcon />{statsuser.othersleft?.def}
                              </div>

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
                              handleAddItem2(index);
                              setStatsUser(updatedUser);
                              handleUpdateStats(updatedUser)
                              updateNpcs()

                            } else {
                              console.log('Item not found!');
                            }

                          }} style={{ display: 'flex', width: '100%', flexDirection: 'column' }}>

                            <img src={statsuser?.shoes?.url} alt="Gear" style={{ maxWidth: '60px', height: 'auto', alignSelf: 'center' }} />
                            <div style={{ display: 'flex', justifyContent: 'center', alignContent: 'center', width: '100%' }}  >
                              <div  >
                                <CloseFullscreenIcon />{statsuser.shoes?.atk}
                              </div>
                              <div>
                                <ShieldIcon />{statsuser.shoes?.def}
                              </div>

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
                              handleAddItem2(index);
                              setStatsUser(updatedUser);
                              handleUpdateStats(updatedUser)
                              updateNpcs()

                            } else {
                              console.log('Item not found!');
                            }

                          }} style={{ display: 'flex', width: '100%', flexDirection: 'column' }}>

                            <img src={statsuser?.othersright?.url} alt="Gear" style={{ maxWidth: '60px', height: 'auto', alignSelf: 'center' }} />
                            <div style={{ display: 'flex', justifyContent: 'center', alignContent: 'center', width: '100%' }}  >
                              <div  >
                                <CloseFullscreenIcon />{statsuser.othersright?.atk}
                              </div>
                              <div>
                                <ShieldIcon />{statsuser.othersright?.def}
                              </div>

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
              }

            </div> : null}
          {user?.id === playersid[0] ?
            <div style={{ marginTop: '10px', zIndex: '9999', position: 'fixed', top: '0px', maxWidth: '1100px', right: '0px', display: buttonAddItem ? 'block' : 'none' }} className={styles.rpgdiv4}>

              <h2 style={{ width: '100%', justifyContent: 'center', display: 'flex' }} className={styles.medievalsharp} >Adicionar Item</h2>
              <form style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }} onSubmit={handleSubmit}>
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
                  <div style={{
                    display: 'flex', width: '300px', marginLeft: '400px',
                    flexDirection: 'column', position: 'relative', right: '400px', bottom: '550px', height: '0px'
                  }} >
                    <label htmlFor="typewear">Onde é equipavel:</label><br />
                    <select style={{ maxHeight: '30px', maxWidth: '150px' }} id="typewear" name="typewear" value={formData.typewear} onChange={handleChange}>
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
                    <input style={{ borderRadius: '5px', backgroundColor: 'hsl(34, 97%, 31%)', color: 'white', fontWeight: 'bold', maxWidth: '150px', maxHeight: '30px' }} type="text" id="atk" name="atk" value={formData.atk} onChange={handleChange} /><br />

                    <label htmlFor="def">Defesa:</label><br />
                    <input style={{ borderRadius: '5px', backgroundColor: 'hsl(34, 97%, 31%)', color: 'white', fontWeight: 'bold', maxWidth: '150px', maxHeight: '30px' }} type="text" id="def" name="def" value={formData.def} onChange={handleChange} /><br />

                    <label htmlFor="strength">Força:</label><br />
                    <input style={{ borderRadius: '5px', backgroundColor: 'hsl(34, 97%, 31%)', color: 'white', fontWeight: 'bold', maxWidth: '150px', maxHeight: '30px' }} type="number" id="strength" name="strength" value={formData.strength} onChange={handleChange} /><br />

                    <label htmlFor="dexterity">Destreza:</label><br />
                    <input style={{ borderRadius: '5px', backgroundColor: 'hsl(34, 97%, 31%)', color: 'white', fontWeight: 'bold', maxWidth: '150px', maxHeight: '30px' }} type="number" id="dexterity" name="dexterity" value={formData.dexterity} onChange={handleChange} /><br />

                    <label htmlFor="constitution">Constituição:</label><br />
                    <input style={{ borderRadius: '5px', backgroundColor: 'hsl(34, 97%, 31%)', color: 'white', fontWeight: 'bold', maxWidth: '150px', maxHeight: '30px' }} type="number" id="constitution" name="constitution" value={formData.constitution} onChange={handleChange} /><br />

                    <label htmlFor="intelligence">Inteligência:</label><br />
                    <input style={{ borderRadius: '5px', backgroundColor: 'hsl(34, 97%, 31%)', color: 'white', fontWeight: 'bold', maxWidth: '150px', maxHeight: '30px' }} type="number" id="intelligence" name="intelligence" value={formData.intelligence} onChange={handleChange} /><br />

                    <label htmlFor="wisdom">Sabedoria:</label><br />
                    <input style={{ borderRadius: '5px', backgroundColor: 'hsl(34, 97%, 31%)', color: 'white', fontWeight: 'bold', maxWidth: '150px', maxHeight: '30px' }} type="number" id="wisdom" name="wisdom" value={formData.wisdom} onChange={handleChange} /><br />

                    <label htmlFor="charisma">Carisma:</label><br />
                    <input style={{ borderRadius: '5px', backgroundColor: 'hsl(34, 97%, 31%)', color: 'white', fontWeight: 'bold', maxWidth: '150px', maxHeight: '30px' }} type="number" id="charisma" name="charisma" value={formData.charisma} onChange={handleChange} /><br />




                  </div> : null}

                <label htmlFor="url">Url imagem:</label><br />
                <textarea id="url" name="url" value={formData.img} onChange={handleChange} /><br />

                <button type="submit">Enviar</button>
              </form>
            </div>
            : null}
          {user?.id === playersid[0] ?
            <div style={{ display: 'flex', position: 'fixed', top: '0px', left: '300px', zIndex: '9999' }} >
              {buttonAddNpc ?
                <NpcCreate items={items} userid={user.id} sessionid={sessionid} />
                : null}


            </div>

            : null}
        </div>
        :
        <div>
          {isLoading ?
            <div style={{ display: 'flex', width: '100%', justifyContent: 'center', color: 'white' }} ><CircularProgress /> Carregando...
              <br />
              Dica: {randomText}
            </div>
            :
            <div style={{ color: 'white' }} >
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
      <div style={{ position: 'fixed', bottom: '0px', width: '100%', zIndex: '9999', display: isLoading ? 'none' : 'flex', height: '50px', gap: '20px', justifyContent: 'center', marginBottom: '50px' }} >

        <button style={{ display: user?.id !== playersid[0] ? 'block' : 'none' }} disabled={user?.id === playersid[0]} onClick={() => {
          setButtonShowInvInfo(!buttonShowInvInfo)
        }} type='button' className={styles.pushable2}>
          <span className={styles.edge2}></span>
          <span className={styles.front2}>
            Inventário
          </span>
        </button>

        <button onClick={() => {
          setButtonShowMapInfo(!buttonShowMapInfo)
        }} type='button' className={styles.pushable2}>
          <span className={styles.edge2}></span>
          <span className={styles.front2}>
            Info mapa
          </span>
        </button>
        <div style={{ display: buttonShowWallTool ? 'flex' : 'none' }} >
          <div data-type="wall" draggable onDragStart={(e) => {
            e.dataTransfer.setData('text/plain', 'wall'); // Set the index as the drag data
          }}
            style={{ border: '2px solid red', cursor: 'pointer', backgroundColor: 'black', color: 'white' }} >
            Parede
          </div>
          <div style={{ border: '2px solid red', cursor: 'pointer', backgroundColor: 'black', color: 'white' }}>
            Trap1
          </div>
          <div style={{ border: '2px solid red', cursor: 'pointer', backgroundColor: 'black', color: 'white' }}>
            Trap2
          </div>
          <div style={{ border: '2px solid red', cursor: 'pointer', backgroundColor: 'black', color: 'white' }}>
            Trap3
          </div>
          <div onClick={() => {
            setButtonShowWallTool(false)
          }} style={{ border: '2px solid red', cursor: 'pointer', backgroundColor: 'black', color: 'white' }}>
            Fechar
          </div>
        </div>
        <button onClick={() => {
          setButtonInfoSession(!buttonInfoSession)
        }} type='button' className={styles.pushable2}>
          <span className={styles.edge2}></span>
          <span className={styles.front2}>
            Info sessão
          </span>
        </button>


        <button style={{ display: user?.id === playersid[0] ? 'block' : 'none' }} disabled={user?.id !== playersid[0]}
          onClick={() => {
            setButtonAddItem(!buttonAddItem)
          }} type='button' className={styles.pushable2}>
          <span className={styles.edge2}></span>
          <span className={styles.front2}>
            Criar Item
          </span>
        </button>
        <button style={{ display: user?.id === playersid[0] ? 'block' : 'none' }}
          disabled={user?.id !== playersid[0]} onClick={() => {
            setButtonAddNpc(!buttonAddNpc)
          }} type='button' className={styles.pushable2}>
          <span className={styles.edge2}></span>
          <span className={styles.front2}>
            Criar Personagem
          </span>
        </button>
        <button style={{ display: user?.id === playersid[0] ? 'block' : 'none' }}
          disabled={user?.id !== playersid[0]} onClick={() => {
            setButtonPlaceNpc(!buttonPlaceNpc)
          }} type='button' className={styles.pushable2}>
          <span className={styles.edge2}></span>
          <span className={styles.front2}>
            Editar ou adicionar personagem no jogo
          </span>
        </button>

      </div>

    </div>
  )
}