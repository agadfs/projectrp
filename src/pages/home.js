import { useEffect, useState } from 'react';
import styles from './home.module.css';
import axios from 'axios';
import User from '../server/models/User';
import { useAppContext } from '../AppContext';
import Sessions from '../components/sessions';
import CircularProgress from '@mui/material/CircularProgress';

export default function Home() {
  const [randomText, setRandomText] = useState('');
  const [changed, setChanged] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [name, setName] = useState('')
  const { user, urlrequest, randomStrings } = useAppContext();
  const [userscount, setUsersCount] = useState();
  const [userscountonline, setUserscountonline] = useState();
  const [sessions, setSessions] = useState();
  const [title, setTitle] = useState('');
  const [newName, setNewName] = useState('');

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * randomStrings.length);
    setRandomText(randomStrings[randomIndex]);

    setTimeout(() => {
      setIsLoading(false);
    }, 4000);


  }, []);
  async function getusers() {
    try {
      const response = await axios.get(`${urlrequest}/userscount`, {
        headers: {
          'Content-Type': 'application/json',
          'ngrok-skip-browser-warning': 'true'
        }
      });
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
      const response = await axios.get(`${urlrequest}/userscountonline`, {
        headers: {
          'Content-Type': 'application/json',
          'ngrok-skip-browser-warning': 'true'
        }
      });
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
      const response = await axios.get(`${urlrequest}/sessions`, {
        headers: {
          'Content-Type': 'application/json',
          'ngrok-skip-browser-warning': 'true'
        }
      });
      if (response.data) {
        const data = response.data;
        setSessions(data)


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
    let namenew = newName;
    if (newName === '' || newName.length < 3 && name !== '') {
      namenew = 'Player'
      const response = await axios.post(`${urlrequest}/users/update/${user.id}`, { username: namenew });
      if (response) {
        setNewName('Player')
        alert('Por favor, insira um nome maior que 2 caracteres, seu nome provisório será Player')
      }
    }
    else {
      const response = await axios.post(`${urlrequest}/users/update/${user.id}`, { username: namenew });
      if (response) {
        setName(newName);
      }
    }


  }
  async function getname0() {
    const response = await axios.get(`${urlrequest}/users/${user.id}`, {
      headers: {
        'Content-Type': 'application/json',
        'ngrok-skip-browser-warning': 'true'
      }
    });
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
          setChanged(true);

        } catch (error) {
          console.error('Error sending heartbeat:', error);
        }
      }, 5000);

      return () => clearInterval(intervalId);
    }
  }, [user.id]);

  useEffect(() => {
    if (user.id) {
      getusers();
      getusersonline();
      const intervalId = setInterval(async () => {
        try {

          // Assuming you're updating the user's activity status in your backend
          await axios.post(`${urlrequest}/heartbeat`, { userId: user.id, lastActiveAt: new Date });

          getusers();
          getusersonline();
          getsessions();


        } catch (error) {
          console.error('Error sending heartbeat:', error);
        }
      }, 10000);

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

      const response = await axios.post(`${urlrequest}/sessions`, randomSession);
      if(response){
        window.location.reload()
      }


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
          <div style={{
            borderRadius: '5px',
            display: 'flex', padding: '5px', margin: '5px',
            flexDirection: 'column', border: '3px solid hsl(34, 98%, 25%, 0.5)',
            backgroundColor: '#592c16', boxShadow: '0px 0px 0px 4px hsl(34, 99%, 29%, 0.5)',
            justifyContent: 'center',
            alignContent: 'center',
            alignItems: 'center'
          }}>
            <div className={styles.textmedieval} style={{ color: 'white' }} >

              Nome da sessão nova
            </div>
            <form style={{display:'flex', flexDirection:'column',justifyContent: 'center',
            alignContent: 'center',
            alignItems: 'center'}} onSubmit={(e) => {
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

                style={{ display: 'flex', marginBottom: '10px', borderRadius: '5px', backgroundColor: 'hsl(34, 97%, 31%)', color: 'white', fontWeight: 'bold' }} value={title} onChange={(e) => {
                  setTitle(e.target.value)
                }} />

              <button className={styles.pushable}>
                <span className={styles.edge}></span>
                <span className={styles.front}>
                  Criar Sessão
                </span>
              </button>

            </form>
          </div> : null}

        <div>
          Total de usuários: {userscount}
        </div>
        <div>
          Usuários online procurando sessão: {userscountonline}
        </div>
      </div>

      {user.id && sessions && userscount && userscountonline && !isLoading ?
        <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }} >

          {user.id ?
            <div className={styles.maincontainer}>
              <div style={{ marginBottom: '10px' }} className={styles.rpgdiv1} > SEU NOME: <input  style={{ borderRadius: '5px', backgroundColor: 'hsl(34, 97%, 31%)', color: 'white', fontWeight: 'bold' }} 
              value={newName} onChange={(e) => { setNewName(e.target.value) }} /> 
              Espere o nome a seguir,estar igual ao que você quer: 
              <span style={{color:'white', padding:'5px', fontWeight:'bold'}} >{name}</span></div>
              <div className={styles.maincontainertitle}> BEM VINDO AO PROJECTRP</div>
              {sessions ? <Sessions sessions={sessions} id={user.id} /> :
                <div>

                </div>}

            </div>
            :
            null}

        </div> : <div style={{ display: 'flex', width: '100%', justifyContent: 'center', color: 'white' }} >
          {user.id !== '' ? <div className={styles.rpgdiv2}>
            <div style={{ width: '100%', justifyContent: 'center', display: 'flex' }} >
              <CircularProgress />
              Carregando...
            </div>
            Dica: {randomText}
          </div> : <div className={styles.rpgdiv2}>
            <div style={{ width: '100%', justifyContent: 'center', display: 'flex' }} >
              <CircularProgress />
              Faça o login para ver as sessões!
            </div>
            Dica: {randomText}
          </div>}
        </div>}



    </div>
  );
}
