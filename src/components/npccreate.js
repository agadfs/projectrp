import { useEffect, useState } from 'react';
import styles from '../pages/sessionpage.module.css'
import CloseFullscreenIcon from '@mui/icons-material/CloseFullscreen';
import ShieldIcon from '@mui/icons-material/Shield';
import { PiCoinsBold } from 'react-icons/pi';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import axios from 'axios';

import { useAppContext } from '../AppContext';
export default function NpcCreate({ userid, sessionid, items }) {
  const { urlrequest } = useAppContext();
  const [newNpc, setNewNpc] = useState({
    ownerId: userid,
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
    Npcname: '',
    NpcUrlPhoto: '',
    NpcBook: ''

  });
  const [statsuserequip, setStatsUserEquip] = useState({
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

    });
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewNpc({ ...newNpc, [name]: value });

  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {

       const response = await axios.post(`${urlrequest}/npcscreate`, newNpc); 


      console.log(newNpc)
      if(response.data){
        console.log('Npc Criado com Sucesso!')
      }else{
        console.log('Criação do Npc deu errado, tente novamente!')
      }

    } catch (error) {
      console.error('Erro ao adicionar item:', error);
      // Trate o erro apropriadamente
    }
  };
  function handleAddItem2(event) {
    const selectedId = event;
    handleAdd(selectedId);
    
  }
  async function handleAdd(index) {

    try {
      const randomItem = items[index];
      const newItem = {
        item: randomItem,
        quantity: 1
      };

      const existingItemIndex = newNpc.Items.findIndex(item => item.item.name === randomItem.name);

      if (existingItemIndex !== -1) {

        newNpc.Items[existingItemIndex].quantity++;
      } else {

        newNpc.Items.push(newItem);
      }

      
    } catch (error) {
      console.error('Error updating newNpc:', error);
    }
  };
  async function updatenewNpc() {
    try {
      const randomItem = items[Math.floor(Math.random() * items?.length)];
      const newItem = {
        item: randomItem,
        quantity: 1
      };

      const existingItemIndex = newNpc.Items.findIndex(item => item.item.name === randomItem.name);

      if (existingItemIndex !== -1) {

        newNpc.Items[existingItemIndex].quantity++;
      } else {

        newNpc.Items.push(newItem);
      }





    } catch (error) {
      console.error('Error updating newNpc:', error);
    }
  }
  function handleAddItem(event) {
    const selectedId = event.target.value;
    handleAdd(selectedId);
    
  }
  const handleUpdateQuantity2 = (index, quantityChange, updateddata) => {

    const updatedItems = newNpc.Items.map((item, itemIndex) => {
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

    setNewNpc({ ...newNpc, Items: updatedItems, Stats: updateddata })
    handleUpdateStats(updateddata)

  };
  const handleDelete = (index) => {

    const updatedItems = newNpc.Items.filter((_, itemIndex) => itemIndex !== index);

    setNewNpc({ ...newNpc, Items: updatedItems })
  };

  const handleUpdateQuantity = (index, quantityChange) => {
    const updatedItems = newNpc.Items.map((item, itemIndex) => {
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
    setNewNpc({ ...newNpc, Stats: updatedItems })



  };

  useEffect(() => {
    handleUpdateStats(newNpc.Stats);

  },[newNpc.Items, newNpc.Stats])

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



  };

  return (
    <div>


      <div style={{ marginTop: '10px' }} className={styles.rpgdiv1}>
        <h2 style={{ width: '100%', justifyContent: 'center', display: 'flex' }} className={styles.medievalsharp} >
          Adicionar NPC</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="Npcname">Nome:</label><br />
          <input style={{ borderRadius: '5px', backgroundColor: 'hsl(34, 97%, 31%)', color: 'white', fontWeight: 'bold', maxWidth: '150px' }} type="text" id="Npcname" name="Npcname"
            value={newNpc.Npcname} onChange={handleChange} required /><br />

          <label htmlFor="description">Inventario:</label><br />

          <div className={styles.rpgdiv1} >
            <h1 style={{ width: '100%', justifyContent: 'center', display: 'flex' }} className={styles.medievalsharp} > SEU INVENTARIO
              ({newNpc?.Items?.length} Items)</h1>
            <div>

              <button style={{ marginTop: '10px', marginBottom: '20px' }} onClick={() => {
                if (items.length > 0) {

                  updatenewNpc()
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
                {newNpc?.Items?.map((item, index) => (
                  <div
                    className={styles.slotsinv}
                    style={{ maxHeight: '350px', maxWidth: '200px', gap: '5px', padding: '5px', borderRadius: '5px', justifyContent: 'space-between', display: 'flex', flexDirection: 'column' }} key={index}>
                    {item?.item?.url ? (
                      <div onClick={() => {
                        if (item?.item?.canequip) {
                          const types = item?.item?.typewear;
                          const updatedUser = { ...newNpc.Stats };
                          if (updatedUser[types]) {
                            alert('Desequipe primeiro o item!')
                          } else {
                            updatedUser[types] = newNpc?.Items[index].item;
                            handleUpdateQuantity2(index, -1, updatedUser);


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

          <label htmlFor="weight">Status:</label><br />
          <div className={styles.rpgdiv1} style={{
            height: '100%', display: 'flex', maxWidth: '100%', gap: '10px', flexWrap: 'wrap',
            flexDirection: 'column'
          }}>


            <div style={{ display: 'flex', flexDirection: 'column' }} >
              <h3 className={styles.medievalsharp}>Seus Atributos</h3>
              {newNpc?.Stats ?
                <div style={{ display: 'flex', flexDirection: 'row' }} >
                  <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                    <div>
                      Seu level:
                      <input
                        style={{ borderRadius: '5px', backgroundColor: 'hsl(34, 97%, 31%)', color: 'white', fontWeight: 'bold', maxWidth: '50px' }}
                        value={newNpc.Stats.level} onChange={(e) => {

                          const updatedUser = { ...newNpc.Stats };


                          updatedUser.level = parseInt(e.target.value, 10) || 0;


                          setNewNpc({ ...newNpc, Stats: updatedUser })

                        }} />
                    </div>
                    <div>
                      Experiência:
                      <input
                        style={{ borderRadius: '5px', backgroundColor: 'hsl(34, 97%, 31%)', color: 'white', fontWeight: 'bold', maxWidth: '50px' }}
                        value={newNpc.Stats.experience} onChange={(e) => {

                          const updatedUser = { ...newNpc.Stats };


                          updatedUser.experience = parseInt(e.target.value, 10) || 0;


                          setNewNpc({ ...newNpc, Stats: updatedUser })

                        }} />


                    </div>
                    <div>
                      Vida atual e máxima:  <input
                        style={{ borderRadius: '5px', backgroundColor: 'hsl(34, 97%, 31%)', color: 'white', fontWeight: 'bold', maxWidth: '50px' }}
                        value={newNpc.Stats.health} onChange={(e) => {

                          const updatedUser = { ...newNpc.Stats };


                          updatedUser.health = parseInt(e.target.value, 10) || 0;


                          setNewNpc({ ...newNpc, Stats: updatedUser })

                        }} />/ <input
                        style={{ borderRadius: '5px', backgroundColor: 'hsl(34, 97%, 31%)', color: 'white', fontWeight: 'bold', maxWidth: '50px' }}
                        value={newNpc.Stats.maxHealth} onChange={(e) => {

                          const updatedUser = { ...newNpc.Stats };


                          updatedUser.maxHealth = parseInt(e.target.value, 10) || 0;


                          setNewNpc({ ...newNpc, Stats: updatedUser })

                        }} />

                      <input style={{ width: '100%', maxWidth: '150px' }} type="range" id='barh' min="0" max={newNpc.Stats.maxHealth} value={newNpc.Stats.health} readOnly />

                    </div>
                    <div>
                      Mana atual e máxima:  <input
                        style={{ borderRadius: '5px', backgroundColor: 'hsl(34, 97%, 31%)', color: 'white', fontWeight: 'bold', maxWidth: '50px' }}
                        value={newNpc.Stats.mana} onChange={(e) => {

                          const updatedUser = { ...newNpc.Stats };


                          updatedUser.mana = parseInt(e.target.value, 10) || 0;


                          setNewNpc({ ...newNpc, Stats: updatedUser })

                        }} />/ <input
                        style={{ borderRadius: '5px', backgroundColor: 'hsl(34, 97%, 31%)', color: 'white', fontWeight: 'bold', maxWidth: '50px' }}
                        value={newNpc.Stats.maxMana} onChange={(e) => {

                          const updatedUser = { ...newNpc.Stats };


                          updatedUser.maxMana = parseInt(e.target.value, 10) || 0;


                          setNewNpc({ ...newNpc, Stats: updatedUser })

                        }} />
                      <input style={{ width: '100%', maxWidth: '150px' }} type="range" id='barm' min="0" max={newNpc.Stats.maxMana} value={newNpc.Stats.mana} readOnly />
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
                        value={newNpc.Stats?.strength} onChange={(e) => {

                          const updatedUser = { ...newNpc.Stats };


                          updatedUser.strength = parseInt(e.target.value, 10) || 0;


                          setNewNpc({ ...newNpc, Stats: updatedUser })

                        }} /> ({newNpc.Stats?.strength + statsuserequip?.strength})
                    </div>
                    <div style={{ width: '100%', justifyContent: 'space-between', display: 'flex' }}>
                      Destreza:
                      <input
                        style={{ borderRadius: '5px', backgroundColor: 'hsl(34, 97%, 31%)', color: 'white', fontWeight: 'bold', maxWidth: '50px' }}
                        value={newNpc.Stats.dexterity}
                        onChange={(e) => {
                          const updatedUser = { ...newNpc.Stats };
                          updatedUser.dexterity = parseInt(e.target.value, 10) || 0;
                          setNewNpc({ ...newNpc, Stats: updatedUser })

                        }}
                      />
                      ({newNpc?.Stats.dexterity + statsuserequip?.dexterity})
                    </div>
                    <div style={{ width: '100%', justifyContent: 'space-between', display: 'flex' }}>
                      Constituição:
                      <input
                        style={{ borderRadius: '5px', backgroundColor: 'hsl(34, 97%, 31%)', color: 'white', fontWeight: 'bold', maxWidth: '50px' }}
                        value={newNpc.Stats.constitution}
                        onChange={(e) => {
                          const updatedUser = { ...newNpc.Stats };
                          updatedUser.constitution = parseInt(e.target.value, 10) || 0;
                          setNewNpc({ ...newNpc, Stats: updatedUser })

                        }}
                      />
                      ({newNpc.Stats.constitution + statsuserequip?.constitution})
                    </div>
                    <div style={{ width: '100%', justifyContent: 'space-between', display: 'flex' }}>
                      Inteligência:
                      <input
                        style={{ borderRadius: '5px', backgroundColor: 'hsl(34, 97%, 31%)', color: 'white', fontWeight: 'bold', maxWidth: '50px' }}
                        value={newNpc.Stats.intelligence}
                        onChange={(e) => {
                          const updatedUser = { ...newNpc.Stats };
                          updatedUser.intelligence = parseInt(e.target.value, 10) || 0;
                          setNewNpc({ ...newNpc, Stats: updatedUser })

                        }}
                      />
                      ({newNpc.Stats.intelligence + statsuserequip?.intelligence})
                    </div>
                    <div style={{ width: '100%', justifyContent: 'space-between', display: 'flex' }}>
                      Sabedoria:
                      <input
                        style={{ borderRadius: '5px', backgroundColor: 'hsl(34, 97%, 31%)', color: 'white', fontWeight: 'bold', maxWidth: '50px' }}
                        value={newNpc.Stats.wisdom}
                        onChange={(e) => {
                          const updatedUser = { ...newNpc.Stats };
                          updatedUser.wisdom = parseInt(e.target.value, 10) || 0;
                          setNewNpc({ ...newNpc, Stats: updatedUser })

                        }}
                      />
                      ({newNpc.Stats.wisdom + statsuserequip?.wisdom})
                    </div>
                    <div style={{ width: '100%', justifyContent: 'space-between', display: 'flex' }}>
                      Carisma:
                      <input
                        style={{ borderRadius: '5px', backgroundColor: 'hsl(34, 97%, 31%)', color: 'white', fontWeight: 'bold', maxWidth: '50px' }}
                        value={newNpc.Stats.charisma}
                        onChange={(e) => {
                          const updatedUser = { ...newNpc.Stats };
                          updatedUser.charisma = parseInt(e.target.value, 10) || 0;
                          setNewNpc({ ...newNpc, Stats: updatedUser })

                        }}
                      />
                      ({newNpc.Stats.charisma + statsuserequip?.charisma})
                    </div>
                    <div style={{ width: '100%', justifyContent: 'space-between', display: 'flex' }}>
                      Atk:
                      <input
                        style={{ borderRadius: '5px', backgroundColor: 'hsl(34, 97%, 31%)', color: 'white', fontWeight: 'bold', maxWidth: '50px' }}
                        value={newNpc.Stats.atk}
                        onChange={(e) => {
                          const updatedUser = { ...newNpc.Stats };
                          updatedUser.atk = parseInt(e.target.value, 10) || 0;
                          setNewNpc({ ...newNpc, Stats: updatedUser })

                        }}
                      />
                      ({newNpc.Stats.atk + statsuserequip?.atk})
                    </div>
                    <div style={{ width: '100%', justifyContent: 'space-between', display: 'flex' }}>
                      Def:
                      <input
                        style={{ borderRadius: '5px', backgroundColor: 'hsl(34, 97%, 31%)', color: 'white', fontWeight: 'bold', maxWidth: '50px' }}
                        value={newNpc.Stats.def}
                        onChange={(e) => {
                          const updatedUser = { ...newNpc.Stats };
                          updatedUser.def = parseInt(e.target.value, 10) || 0;
                          setNewNpc({ ...newNpc, Stats: updatedUser })

                        }}
                      />
                      ({newNpc.Stats.def + statsuserequip?.def})
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '20px' }} >

                      <button type='button' onClick={() => {
                        const updatedUser = { ...newNpc.Stats };
                        updatedUser.health = updatedUser.maxHealth;
                        setNewNpc({ ...newNpc, Stats: updatedUser })

                      }} className={styles.pushable}>
                        <span style={{ fontSize: '10px', width: '96px' }} className={styles.edge}></span>
                        <span style={{ fontSize: '12px', width: '70px' }} className={styles.front}>
                          Encher Vida
                        </span>
                      </button>
                      <button type='button' onClick={() => {
                        const updatedUser = { ...newNpc.Stats };
                        updatedUser.mana = updatedUser.maxMana;
                        setNewNpc({ ...newNpc, Stats: updatedUser })

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
            {newNpc.Stats ?
              <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignContent: 'center', width: '100%', alignItems: 'center', gap: '20px' }}>
                <div style={{ display: 'flex', gap: '20px' }} >
                  {newNpc.Stats.earing?.atk ?
                    <div className={styles.slots} onClick={() => {
                      const updatedUser = { ...newNpc.Stats };
                      const index = items.findIndex(item => item.name === newNpc.Stats.earing?.name);
                      if (index !== -1) {

                        updatedUser.earing = '';

                        handleAddItem2(index);
                        setNewNpc({ ...newNpc, Stats: updatedUser })



                      } else {
                        console.log('Item not found!');
                      }

                    }} style={{ display: 'flex', width: '100%', flexDirection: 'column' }}>
                      <div> {newNpc.Stats.earing?.name} </div>
                      <img src={newNpc.Stats?.earing?.url} alt="Item Image" style={{ maxWidth: '50px', height: 'auto', alignSelf: 'center' }} />
                      <div style={{ display: 'flex', justifyContent: 'center', alignContent: 'center', width: '100%' }}  >
                        <div  >
                          <CloseFullscreenIcon />{newNpc.Stats.earing?.atk}
                        </div>
                        <div>
                          <ShieldIcon />{newNpc.Stats.earing?.def}
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


                  {newNpc.Stats.head?.atk ?
                    <div className={styles.slots} onClick={() => {
                      const updatedUser = { ...newNpc.Stats };
                      const index = items.findIndex(item => item.name === newNpc.Stats.head?.name);
                      if (index !== -1) {

                        updatedUser.head = '';

                        handleAddItem2(index);
                        setNewNpc({ ...newNpc, Stats: updatedUser })

                      } else {
                        console.log('Item not found!');
                      }

                    }} style={{ display: 'flex', width: '100%', flexDirection: 'column' }}>
                      <div> {newNpc.Stats.head?.name} </div>
                      <img src={newNpc.Stats?.head?.url} alt="Item Image" style={{ maxWidth: '50px', height: 'auto', alignSelf: 'center' }} />
                      <div style={{ display: 'flex', justifyContent: 'center', alignContent: 'center', width: '100%' }}  >
                        <div  >
                          <CloseFullscreenIcon />{newNpc.Stats.head?.atk}
                        </div>
                        <div>
                          <ShieldIcon />{newNpc.Stats.head?.def}
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

                  {newNpc.Stats.lefthand?.atk ?
                    <div className={styles.slots} onClick={() => {
                      const updatedUser = { ...newNpc.Stats };
                      const index = items.findIndex(item => item.name === newNpc.Stats.lefthand?.name);
                      if (index !== -1) {

                        updatedUser.lefthand = '';

                        handleAddItem2(index);
                        setNewNpc({ ...newNpc, Stats: updatedUser })

                      } else {
                        console.log('Item not found!');
                      }

                    }} style={{ display: 'flex', width: '100%', flexDirection: 'column' }}>
                      <div> {newNpc.Stats.lefthand?.name} </div>
                      <img src={newNpc.Stats?.lefthand?.url} alt="Item Image" style={{ maxWidth: '50px', height: 'auto', alignSelf: 'center' }} />
                      <div style={{ display: 'flex', justifyContent: 'center', alignContent: 'center', width: '100%' }}  >
                        <div  >
                          <CloseFullscreenIcon />{newNpc.Stats.lefthand?.atk}
                        </div>
                        <div>
                          <ShieldIcon />{newNpc.Stats.lefthand?.def}
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


                  {newNpc.Stats.chest?.atk ?
                    <div className={styles.slots} onClick={() => {
                      const updatedUser = { ...newNpc.Stats };
                      const index = items.findIndex(item => item.name === newNpc.Stats.chest?.name);
                      if (index !== -1) {

                        updatedUser.chest = '';

                        handleAddItem2(index);
                        setNewNpc({ ...newNpc, Stats: updatedUser })

                      } else {
                        console.log('Item not found!');
                      }

                    }} style={{ display: 'flex', width: '100%', flexDirection: 'column' }}>
                      <div> {newNpc.Stats.chest?.name} </div>
                      <img src={newNpc.Stats?.chest?.url} alt="Item Image" style={{ maxWidth: '50px', height: 'auto', alignSelf: 'center' }} />
                      <div style={{ display: 'flex', justifyContent: 'center', alignContent: 'center', width: '100%' }}  >
                        <div  >
                          <CloseFullscreenIcon />{newNpc.Stats.chest?.atk}
                        </div>
                        <div>
                          <ShieldIcon />{newNpc.Stats.chest?.def}
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



                  {newNpc.Stats.righthand?.atk ?
                    <div className={styles.slots} onClick={() => {
                      const updatedUser = { ...newNpc.Stats };
                      const index = items.findIndex(item => item.name === newNpc.Stats.righthand?.name);
                      if (index !== -1) {

                        updatedUser.righthand = '';

                        handleAddItem2(index);
                        setNewNpc({ ...newNpc, Stats: updatedUser })

                      } else {
                        console.log('Item not found!');
                      }

                    }} style={{ display: 'flex', width: '100%', flexDirection: 'column' }}>
                      <div> {newNpc.Stats.righthand?.name} </div>
                      <img src={newNpc.Stats?.righthand?.url} alt="Item Image" style={{ maxWidth: '50px', height: 'auto', alignSelf: 'center' }} />
                      <div style={{ display: 'flex', justifyContent: 'center', alignContent: 'center', width: '100%' }}  >
                        <div  >
                          <CloseFullscreenIcon />{newNpc.Stats.righthand?.atk}
                        </div>
                        <div>
                          <ShieldIcon />{newNpc.Stats.righthand?.def}
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

                  {newNpc.Stats.ringleft?.atk ?
                    <div className={styles.slots} onClick={() => {
                      const updatedUser = { ...newNpc.Stats };
                      const index = items.findIndex(item => item.name === newNpc.Stats.ringleft?.name);
                      if (index !== -1) {

                        updatedUser.ringleft = '';

                        handleAddItem2(index);
                        setNewNpc({ ...newNpc, Stats: updatedUser })

                      } else {
                        console.log('Item not found!');
                      }

                    }} style={{ display: 'flex', width: '100%', flexDirection: 'column' }}>
                      <div> {newNpc.Stats.ringleft?.name} </div>
                      <img src={newNpc.Stats?.ringleft?.url} alt="Item Image" style={{ maxWidth: '50px', height: 'auto', alignSelf: 'center' }} />
                      <div style={{ display: 'flex', justifyContent: 'center', alignContent: 'center', width: '100%' }}  >
                        <div  >
                          <CloseFullscreenIcon />{newNpc.Stats.ringleft?.atk}
                        </div>
                        <div>
                          <ShieldIcon />{newNpc.Stats.ringleft?.def}
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



                  {newNpc.Stats.pants?.atk ?
                    <div className={styles.slots} onClick={() => {
                      const updatedUser = { ...newNpc.Stats };
                      const index = items.findIndex(item => item.name === newNpc.Stats.pants?.name);
                      if (index !== -1) {
                        updatedUser.pants = '';

                        handleAddItem2(index);
                        setNewNpc({ ...newNpc, Stats: updatedUser })
                      } else {
                        console.log('Item not found!');
                      }

                    }} style={{ display: 'flex', width: '100%', flexDirection: 'column' }}>
                      <div> {newNpc.Stats.pants?.name} </div>
                      <img src={newNpc.Stats?.pants?.url} alt="Item Image" style={{ maxWidth: '50px', height: 'auto', alignSelf: 'center' }} />
                      <div style={{ display: 'flex', justifyContent: 'center', alignContent: 'center', width: '100%' }}  >
                        <div  >
                          <CloseFullscreenIcon />{newNpc.Stats.pants?.atk}
                        </div>
                        <div>
                          <ShieldIcon />{newNpc.Stats.pants?.def}
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


                  {newNpc.Stats.ringright?.atk ?
                    <div className={styles.slots} onClick={() => {
                      const updatedUser = { ...newNpc.Stats };
                      const index = items.findIndex(item => item.name === newNpc.Stats.ringright?.name);
                      if (index !== -1) {

                        updatedUser.ringright = '';

                        handleAddItem2(index);
                        setNewNpc({ ...newNpc, Stats: updatedUser })

                      } else {
                        console.log('Item not found!');
                      }

                    }} style={{ display: 'flex', width: '100%', flexDirection: 'column' }}>
                      <div> {newNpc.Stats.ringright?.name} </div>
                      <img src={newNpc.Stats?.ringright?.url} alt="Item Image" style={{ maxWidth: '50px', height: 'auto', alignSelf: 'center' }} />
                      <div style={{ display: 'flex', justifyContent: 'center', alignContent: 'center', width: '100%' }}  >
                        <div  >
                          <CloseFullscreenIcon />{newNpc.Stats.ringright?.atk}
                        </div>
                        <div>
                          <ShieldIcon />{newNpc.Stats.ringright?.def}
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

                  {newNpc.Stats.othersleft?.atk ?
                    <div className={styles.slots} onClick={() => {
                      const updatedUser = { ...newNpc.Stats };
                      const index = items.findIndex(item => item.name === newNpc.Stats.othersleft?.name);
                      if (index !== -1) {

                        updatedUser.othersleft = '';

                        handleAddItem2(index);
                        setNewNpc({ ...newNpc, Stats: updatedUser })

                      } else {
                        console.log('Item not found!');
                      }

                    }} style={{ display: 'flex', width: '100%', flexDirection: 'column' }}>
                      <div> {newNpc.Stats.othersleft?.name} </div>
                      <img src={newNpc.Stats?.othersleft?.url} alt="Item Image" style={{ maxWidth: '50px', height: 'auto', alignSelf: 'center' }} />
                      <div style={{ display: 'flex', justifyContent: 'center', alignContent: 'center', width: '100%' }}  >
                        <div  >
                          <CloseFullscreenIcon />{newNpc.Stats.othersleft?.atk}
                        </div>
                        <div>
                          <ShieldIcon />{newNpc.Stats.othersleft?.def}
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




                  {newNpc.Stats.shoes?.atk ?
                    <div className={styles.slots} onClick={() => {
                      const updatedUser = { ...newNpc.Stats };
                      const index = items.findIndex(item => item.name === newNpc.Stats.shoes?.name);
                      if (index !== -1) {

                        updatedUser.shoes = '';

                        handleAddItem2(index);
                        setNewNpc({ ...newNpc, Stats: updatedUser })

                      } else {
                        console.log('Item not found!');
                      }

                    }} style={{ display: 'flex', width: '100%', flexDirection: 'column' }}>
                      <div> {newNpc.Stats.shoes?.name} </div>
                      <img src={newNpc.Stats?.shoes?.url} alt="Item Image" style={{ maxWidth: '50px', height: 'auto', alignSelf: 'center' }} />
                      <div style={{ display: 'flex', justifyContent: 'center', alignContent: 'center', width: '100%' }}  >
                        <div  >
                          <CloseFullscreenIcon />{newNpc.Stats.shoes?.atk}
                        </div>
                        <div>
                          <ShieldIcon />{newNpc.Stats.shoes?.def}
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


                  {newNpc.Stats.othersright?.atk ?
                    <div className={styles.slots} onClick={() => {
                      const updatedUser = { ...newNpc.Stats };
                      const index = items.findIndex(item => item.name === newNpc.Stats.othersright?.name);
                      if (index !== -1) {

                        updatedUser.othersright = '';

                        handleAddItem2(index);
                        setNewNpc({ ...newNpc, Stats: updatedUser })

                      } else {
                        console.log('Item not found!');
                      }

                    }} style={{ display: 'flex', width: '100%', flexDirection: 'column' }}>
                      <div> {newNpc.Stats.othersright?.name} </div>
                      <img src={newNpc.Stats?.othersright?.url} alt="Item Image" style={{ maxWidth: '50px', height: 'auto', alignSelf: 'center' }} />
                      <div style={{ display: 'flex', justifyContent: 'center', alignContent: 'center', width: '100%' }}  >
                        <div  >
                          <CloseFullscreenIcon />{newNpc.Stats.othersright?.atk}
                        </div>
                        <div>
                          <ShieldIcon />{newNpc.Stats.othersright?.def}
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
          <div>
            <label htmlFor="NpcBook">Para qual livro de rpg é esse npc?:</label><br />
            <select id="NpcBook" name="NpcBook"
              value={newNpc.NpcBook} onChange={handleChange}>
              <option value="">Selecione uma opção</option>
              <option value="generic">Genérico</option>
              <option value="d&d">D&D</option>

            </select>
          </div>

          <label htmlFor="NpcUrlPhoto">Url da foto do npc:</label><br />
          <textarea id="NpcUrlPhoto" name="NpcUrlPhoto"
            value={newNpc.NpcUrlPhoto} onChange={handleChange} /><br />

          <button type="submit">Enviar</button>
        </form>
      </div>

    </div>
  )
}