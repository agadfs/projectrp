import { useState } from 'react';
import styles from '../pages/sessionpage.module.css'


export default function NpcCreate() {
  const [newNpc, setNewNpc] = useState({
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
    Isnpc:false,
    Npcname:'',
    NpcUrlPhoto:''

  });
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewNpc(prevState => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {

      /* const response = await axios.post(`${urlrequest}/item`, formData); */


      console.log(newNpc)


    } catch (error) {
      console.error('Erro ao adicionar item:', error);
      // Trate o erro apropriadamente
    }
  };
  return (
    <div>


      <div style={{ marginTop: '10px' }} className={styles.rpgdiv1}>
        <h2 style={{ width: '100%', justifyContent: 'center', display: 'flex' }} className={styles.medievalsharp} >
          Adicionar NPC</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Nome:</label><br />
          <input style={{ borderRadius: '5px', backgroundColor: 'hsl(34, 97%, 31%)', color: 'white', fontWeight: 'bold', maxWidth: '150px' }} type="text" id="name" name="name"
            value={newNpc.Npcname} onChange={handleChange} required /><br />

          <label htmlFor="description">Inventario:</label><br />
         {/*  <textarea style={{
            borderRadius: '5px', backgroundColor: 'hsl(34, 97%, 31%)', color: 'white',
            fontWeight: 'bold', maxWidth: '150px'
          }} id="description" name="description" value={formData.description} onChange={handleChange} required /><br />
 */}
          <label htmlFor="weight">Status:</label><br />
         {/*  <input style={{
            borderRadius: '5px', backgroundColor: 'hsl(34, 97%, 31%)', color: 'white',
            fontWeight: 'bold', maxWidth: '150px'
          }} id="weight" name="weight" value={formData.weight} onChange={handleChange} required /><br /> */}
          <div>
            <label htmlFor="rpgbook">Para qual livro de rpg é esse npc?:</label><br />
            <select id="rpgbook" name="rpgbook"
              value={formData.rpgbook} onChange={handleChange}>
              <option value="">Selecione uma opção</option>
              <option value="generic">Genérico</option>
              <option value="d&d">D&D</option>

            </select>
          </div>

          <label htmlFor="url">Url da foto do npc:</label><br />
          <textarea id="url" name="url"
            value={newNpc.NpcUrlPhoto} onChange={handleChange} /><br />

          <button type="submit">Enviar</button>
        </form>
      </div>

    </div>
  )
}