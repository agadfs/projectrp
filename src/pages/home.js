import { useEffect, useState } from 'react';
import styles from './home.module.css';
import axios from 'axios';
import User from '../server/models/User';
import { useAppContext } from '../AppContext';
import Sessions from '../components/sessions';

export default function Home() {
  const [changed, setChanged] = useState(false);
  const [name, setName] = useState('')
  const { user, urlrequest } = useAppContext();
  const [userscount, setUsersCount] = useState();
  const [userscountonline, setUserscountonline] = useState();
  const [sessions, setSessions] = useState();
  const [title, setTitle] = useState('');
  const [newName, setNewName] = useState('');
  async function getusers() {
    try {
      const response = await axios.get(`${urlrequest}/userscount`,{headers: {
        'Content-Type': 'application/json',
        'ngrok-skip-browser-warning': 'true'
      }});
      if (response.data) {
        const count = response.data;
        setUsersCount(count)

      }
    } catch (error) {
      console.error('Error fetch users', error)
    }
  }
  async function getusersonline() {
    try {
      const response = await axios.get(`${urlrequest}/userscountonline`,{headers: {
        'Content-Type': 'application/json',
        'ngrok-skip-browser-warning': 'true'
      }});
      if (response.data > 0) {
        const count = response.data;
        setUserscountonline(count)


      } else {
        setUserscountonline(0)
      }

    } catch (error) {
      console.error('Error fetch users', error)
    }
  }
  async function getsessions() {
    try {
      const response = await axios.get(`${urlrequest}/sessions`, {headers: {
        'Content-Type': 'application/json',
        'ngrok-skip-browser-warning': 'true'
      }});
      if (response.data) {
        const data = response.data;
        setSessions(data)
        console.log(response.data)

      }
    } catch (error) {
      console.error('Error fetching sessions ', error)
    }
  }
  useEffect(() => {
    getusers();
    getusersonline();
    getsessions();

  }, [])



  async function setname() {
    const response = await axios.post(`${urlrequest}/users/update/${user.id}`, { username: newName });

    setName(newName);

  }
  async function getname0() {
    const response = await axios.get(`${urlrequest}/users/${user.id}`,{headers: {
      'Content-Type': 'application/json',
      'ngrok-skip-browser-warning': 'true'
    }});
    if (response.data) {
      const data = response.data;
      const username = data.username;
      setNewName(username);
      setName(username);

    }
  }

  useEffect(() => {
    if (changed === true) {

      setname();
      setChanged(false);
    }
  }, [changed])

  useEffect(() => {
    if (user.id) {
      getname0();
      const intervalId = setInterval(async () => {
        try {

          // Assuming you're updating the user's activity status in your backend
          await axios.post(`${urlrequest}/heartbeat`, { userId: user.id, lastActiveAt: new Date });

          getusers();
          getusersonline();
          getsessions();
          setChanged(true);

        } catch (error) {
          console.error('Error sending heartbeat:', error);
        }
      }, 5000);

      return () => clearInterval(intervalId);
    }
  }, [user.id]);


  async function createRandomSession() {
    try {
      // Generate random user data
      const randomSession = {
        idsession: generateRandomId(),
        title: title,
        players: [user.id],
      };

      await axios.post(`${urlrequest}/sessions`, randomSession);


    } catch (error) {
      console.error('Error creating session:', error);
    }
  }

  function generateRandomId() {
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let id = '';
    for (let i = 0; i < 16; i++) {
      id += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return id;
  }



  return (
    <div className={styles.body}>
      <div className={styles.datashow}>

        {user.id ?
          <div style={{ display: 'flex', border: '1px solid black', padding: '5px', margin: '5px' }}>
            Nome da sessão nova
            <form onSubmit={(e) => {
              if (title) {
                const existingSessionWithUser = sessions.find(session => session.players && session.players.length > 0 && session.players[0] === user.id)
                if (!existingSessionWithUser) {

                  createRandomSession()
                } else {
                  alert('Você já tem uma sessão aberta')
                }
              } else {
                alert('Por favor preencha o nome da sessão')
              }
              e.preventDefault();
            }} >
              <input 

              style={{ display: 'flex', marginBottom: '10px' }} value={title} onChange={(e) => {
                setTitle(e.target.value)
              }} />
              <button className={styles.simplebutton} >
                Criar Sessão
              </button>
            </form>
          </div> : null}
        {userscount ? null : <div>Carregando, por favor aguarde, isso pode levar até 1 minuto para inicializar o servidor</div>}
        <div>
          Total de usuários: {userscount}
        </div>
        <div>
          Usuários online procurando sessão: {userscountonline}
        </div>
      </div>


      {user.id ?
        <div className={styles.maincontainer}>
          <div> SEU NOME: <input value={newName} onChange={(e) => { setNewName(e.target.value) }} /> Espere o nome a seguir,estar igual ao que você quer: {name}</div>
          <div className={styles.maincontainertitle}> BEM VINDO AO PROJECTRP</div>
          {sessions ? <Sessions sessions={sessions} id={user.id} /> : null}

        </div>
        :
        null}



    </div>
  );
}
