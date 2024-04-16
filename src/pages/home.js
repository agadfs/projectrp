import { useEffect, useState } from 'react';
import styles from './home.module.css';
import axios from 'axios';
import { useAppContext } from '../AppContext';
import Sessions from '../components/sessions';
import CircularProgress from '@mui/material/CircularProgress';


export default function Home() {
  const [keeper, setKeeper] = useState(false);
  const [headSlider, setHeadSlider] = useState(1);
  const [torsoSlider, setTorsoSlider] = useState(1);
  const [lowerSlider, setLowerSlider] = useState(1);
  const [headSliderimg, setHeadSliderimg] = useState('');
  const [torsoSliderimg, setTorsoSliderimg] = useState('');
  const [lowerSliderimg, setLowerSliderimg] = useState('');

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
      setHeadSlider(parseInt(data.charCreate[0]))
      setTorsoSlider(parseInt(data.charCreate[1]))
      setLowerSlider(parseInt(data.charCreate[2]))

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

  useEffect(() => {
    if (user.id) {

      const intervalId = setInterval(async () => {
        setKeeper(false);
      }, 3000);

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
      if (response) {
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

  useEffect(() => {
    import(`../components/head/head${headSlider}.png`)
      .then(image => {
        setHeadSliderimg(image.default);
      })
      .catch(error => {
        console.error('Error loading head image:', error);
      });
  }, [headSlider])
  useEffect(() => {
    import(`../components/torso/torso${torsoSlider}.png`)
      .then(image => {
        setTorsoSliderimg(image.default);
      })
      .catch(error => {
        console.error('Error loading head image:', error);
      });
  }, [torsoSlider])
  useEffect(() => {
    import(`../components/zlower/lower${lowerSlider}.png`)
      .then(image => {
        setLowerSliderimg(image.default);
      })
      .catch(error => {
        console.error('Error loading head image:', error);
      });
  }, [lowerSlider])
  async function saveOutfit() {
    try {
      const newOutfit = [headSlider, torsoSlider, lowerSlider]
      console.log(newOutfit)
      const response = await axios.post(`${urlrequest}/heartbeat`, { userId: user.id, charCreate: newOutfit });
    }
    catch (error) {
      console.log(error)
    }
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
            <form style={{
              display: 'flex', flexDirection: 'column', justifyContent: 'center',
              alignContent: 'center',
              alignItems: 'center'
            }} onSubmit={(e) => {
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
              <div style={{ marginBottom: '10px' }} className={styles.rpgdiv1} > SEU NOME: <input style={{ borderRadius: '5px', backgroundColor: 'hsl(34, 97%, 31%)', color: 'white', fontWeight: 'bold' }}
                value={newName} onChange={(e) => { setNewName(e.target.value) }} />
              <div style={{ display: 'flex' }} >

                <div style={{ display: 'flex', flexDirection: 'column', justifyContent:'center', alignContent:'center', alignItems:'center' }}  >

                  <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '-6px' }}>
                    <img width={30} height={30} src={headSliderimg} alt={`head${headSliderimg}`} />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '-20px' }}>
                    <img width={30} height={30} src={torsoSliderimg} alt={`head${torsoSliderimg}`} />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>

                    <img width={30} height={30} src={lowerSliderimg} alt={`lower${lowerSliderimg}`} />
                  </div>
                 

                  
                </div>

                <div style={{ display: 'flex', flexDirection: 'column' }}  >
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    Cabeça: {headSlider}
                    <input
                      type="range"
                      min="1"
                      max="3"
                      value={headSlider}
                      onChange={(e) => {
                        setHeadSlider(e.target.value)
                      }}
                    />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    Torso {torsoSlider}
                    <input
                      type="range"
                      min="1"
                      max="3"
                      value={torsoSlider}
                      onChange={(e) => {
                        setTorsoSlider(e.target.value)
                      }}
                    />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    Pernas {lowerSlider}
                    <input
                      type="range"
                      min="1"
                      max="3"
                      value={lowerSlider}
                      onChange={(e) => {
                        setLowerSlider(e.target.value)
                      }}
                    />
                  </div>


                </div>
                <button style={{ marginTop: '45px' }} disabled={keeper} type='button' onClick={() => {
                    saveOutfit();
                    setKeeper(true);
                  }} className={styles.pushable}>
                    <span className={styles.edge}></span>
                    <span className={styles.front}>
                    Salvar Skin
                    </span>
                  </button>
              </div>
                Espere o nome a seguir estar igual ao desejado:
                <span style={{ color: 'white', padding: '5px', fontWeight: 'bold' }} >{name}</span></div>


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
