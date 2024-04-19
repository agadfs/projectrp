import { useEffect, useState } from 'react';
import styles from './home.module.css';
import axios from 'axios';
import { useAppContext } from '../AppContext';
import Sessions from '../components/sessions';
import CircularProgress from '@mui/material/CircularProgress';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import coin from './staticcoin.png'
export default function Home() {
  const [keeper, setKeeper] = useState(false);
  const [headSlider, setHeadSlider] = useState(1);
  const [torsoSlider, setTorsoSlider] = useState(1);
  const [lowerSlider, setLowerSlider] = useState(1);
  const [lefthandSlider, setlefthandSlider] = useState(1);
  const [righthandSlider, setrighthandSlider] = useState(1);
  const [petSlider, setpetSlider] = useState(1);
  const [helmetSlider, setHelmetSlider] = useState(1);
  const [iconSlider, setIconSlider] = useState(1);
  const [lefthandSliderimg, setlefthandSliderimg] = useState('');
  const [righthandSliderimg, setrighthandSliderimg] = useState('');
  const [petSliderimg, setpetSliderimg] = useState('');
  const [helmetSliderimg, setHelmetSliderimg] = useState('');
  const [iconSliderimg, setIconSliderimg] = useState('');
  const [headSliderimg, setHeadSliderimg] = useState('');
  const [torsoSliderimg, setTorsoSliderimg] = useState('');
  const [lowerSliderimg, setLowerSliderimg] = useState('');
  const [isPremium, setIsPremium] = useState(false);
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
      setlefthandSlider(parseInt(data.charCreate[3]))
      setrighthandSlider(parseInt(data.charCreate[4]))
      setHelmetSlider(parseInt(data.charCreate[5]))
      setIconSlider(parseInt(data.charCreate[6]))
      setpetSlider(parseInt(data.charCreate[7]))
      if (data.premium === true) {

        setIsPremium(data.premium)
      }

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
    const loadImage = (fileType) => {
      return import(`../components/head/head${headSlider}.${fileType}`)
        .then(image => {
          setHeadSliderimg(image.default);
          return true;
        })
        .catch(error => {
          console.error(`Error loading ${fileType} image:`, error);
          return false;
        });
    };

    loadImage('png').then(success => {
      if (!success) {
        loadImage('gif');
      }
    });
  }, [headSlider]);

  useEffect(() => {
    const loadImage = (fileType) => {
      return import(`../components/torso/torso${torsoSlider}.${fileType}`)
        .then(image => {
          setTorsoSliderimg(image.default);
          return true;
        })
        .catch(error => {
          console.error(`Error loading ${fileType} image:`, error);
          return false;
        });
    };

    loadImage('png').then(success => {
      if (!success) {
        loadImage('gif');
      }
    });
  }, [torsoSlider]);

  useEffect(() => {
    const loadImage = (fileType) => {
      return import(`../components/zlower/lower${lowerSlider}.${fileType}`)
        .then(image => {
          setLowerSliderimg(image.default);
          return true;
        })
        .catch(error => {
          console.error(`Error loading ${fileType} image:`, error);
          return false;
        });
    };

    loadImage('png').then(success => {
      if (!success) {
        loadImage('gif');
      }
    });
  }, [lowerSlider]);

  useEffect(() => {
    const loadImage = (fileType) => {
      return import(`../components/lefthand/lefthand${lefthandSlider}.${fileType}`)
        .then(image => {
          setlefthandSliderimg(image.default);
          return true;
        })
        .catch(error => {
          console.error(`Error loading ${fileType} image:`, error);
          return false;
        });
    };

    loadImage('png').then(success => {
      if (!success) {
        loadImage('gif');
      }
    });
  }, [lefthandSlider]);

  useEffect(() => {
    const loadImage = (fileType) => {
      return import(`../components/righthand/righthand${righthandSlider}.${fileType}`)
        .then(image => {
          setrighthandSliderimg(image.default);
          return true;
        })
        .catch(error => {
          console.error(`Error loading ${fileType} image:`, error);
          return false;
        });
    };

    loadImage('png').then(success => {
      if (!success) {
        loadImage('gif');
      }
    });
  }, [righthandSlider]);

  useEffect(() => {
    const loadImage = (fileType) => {
      return import(`../components/icons/icons${iconSlider}.${fileType}`)
        .then(image => {
          setIconSliderimg(image.default);
          return true;
        })
        .catch(error => {
          console.error(`Error loading ${fileType} image:`, error);
          return false;
        });
    };

    loadImage('png').then(success => {
      if (!success) {
        loadImage('gif');
      }
    });
  }, [iconSlider]);

  useEffect(() => {
    const loadImage = (fileType) => {
      return import(`../components/helmet/helmet${helmetSlider}.${fileType}`)
        .then(image => {
          setHelmetSliderimg(image.default);
          return true;
        })
        .catch(error => {
          console.error(`Error loading ${fileType} image:`, error);
          return false;
        });
    };

    loadImage('png').then(success => {
      if (!success) {
        loadImage('gif');
      }
    });
  }, [helmetSlider]);

  useEffect(() => {
    // Function to attempt loading an image file
    const loadImage = (fileType) => {
      return import(`../components/pet/pet${petSlider}.${fileType}`)
        .then(image => {
          setpetSliderimg(image.default);
          return true;  // Indicate success
        })
        .catch(error => {
          console.error(`Error loading ${fileType} image:`, error);
          return false;  // Indicate failure
        });
    };

    // First try to load PNG, if it fails, then try GIF
    loadImage('png').then(success => {
      if (!success) {
        loadImage('gif');
      }
    });
  }, [petSlider]);
  async function saveOutfit() {
    try {
      const newOutfit = [headSlider, torsoSlider, lowerSlider, lefthandSlider, righthandSlider, helmetSlider, iconSlider, petSlider]
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
            flexDirection: 'column',
            justifyContent: 'center',
            alignContent: 'center',
            alignItems: 'center'
          }}>
            <div className={styles.rpgdiv4} >
              Status da conta:
              {isPremium ?
                <div style={{ display: 'flex' }} >


                  <div style={{ position: 'relative' }}>
                    <img src={coin} width={50} height={50} style={{ display: 'block' }} />
                    <span className={styles.fontplay} style={{ position: 'absolute', top: '15px', left: '50%', transform: 'translateX(-50%)' }}>
                      P
                      </span>
                  </div>
                  <div style={{ position: 'relative' }}>
                    <img src={coin} width={50} height={50} style={{ display: 'block' }} />
                    <span className={styles.fontplay} style={{ position: 'absolute', top: '15px', left: '50%', transform: 'translateX(-50%)' }}>
                      R
                      </span>
                  </div>
                  <div style={{ position: 'relative' }}>
                    <img src={coin} width={50} height={50} style={{ display: 'block' }} />
                    <span className={styles.fontplay} style={{ position: 'absolute', top: '15px', left: '50%', transform: 'translateX(-50%)' }}>
                      E
                      </span>
                  </div>
                  <div style={{position: 'relative' }}>
                    <img src={coin} width={50} height={50} style={{ display: 'block' }} />
                    <span className={styles.fontplay} style={{ position: 'absolute', top: '15px', left: '50%', transform: 'translateX(-50%)' }}>
                      M
                      </span>
                  </div>
                  <div style={{ position: 'relative' }}>
                    <img src={coin} width={50} height={50} style={{ display: 'block' }} />
                    <span className={styles.fontplay} style={{ position: 'absolute', top: '15px', left: '50%', transform: 'translateX(-50%)' }}>
                      I
                      </span>
                  </div>
                  <div style={{position: 'relative' }}>
                    <img src={coin} width={50} height={50} style={{ display: 'block' }} />
                    <span className={styles.fontplay} style={{ position: 'absolute', top: '15px', left: '50%', transform: 'translateX(-50%)' }}>
                      U
                      </span>
                  </div>
                  <div style={{position: 'relative' }}>
                    <img src={coin} width={50} height={50} style={{ display: 'block' }} />
                    <span className={styles.fontplay} style={{ position: 'absolute', top: '15px', left: '50%', transform: 'translateX(-50%)' }}>
                     M
                      </span>
                  </div>

                </div>


                :
                <div style={{ display: 'flex' }} >


                  <div style={{ margin: '10px' }} className={styles.fontplay}  >
                    F R E E
                  </div>

                </div>
              }

            </div>
            <div style={{ width: '350px', padding: '5px', marginBottom: '10px' }} className={styles.rpgdiv4} > SEU NOME: <input style={{ borderRadius: '5px', backgroundColor: 'hsl(34, 97%, 31%)', color: 'white', fontWeight: 'bold' }}
              value={newName} onChange={(e) => { setNewName(e.target.value) }} />
              <div style={{ display: 'flex' }} >

                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignContent: 'center', alignItems: 'center', marginRight: '60px', marginLeft: '10px' }}  >

                  <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '-6px', zIndex: '101' }}>
                    <img width={30} height={30} src={headSliderimg} alt={`head${headSliderimg}`} />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '-20px', zIndex: '102' }}>
                    <img width={30} height={30} src={torsoSliderimg} alt={`torso${torsoSliderimg}`} />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', zIndex: '101', position: 'relative', bottom: '-20px', zIndex: '101' }}>

                    <img width={30} height={20} src={lowerSliderimg} alt={`lower${lowerSliderimg}`} />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', position: 'relative', bottom: '60px', left: '-15px', zIndex: '103', height: '30px' }}>

                    <img width={'auto'} height={45} src={lefthandSliderimg} alt={`lefthand${lefthandSliderimg}`} />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', position: 'relative', bottom: '70px', left: '15px', zIndex: '103' }}>

                    <img width={30} height={30} src={righthandSliderimg} alt={`righthand${righthandSliderimg}`} />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', position: 'relative', bottom: '80px', left: '40px', zIndex: '103' }}>

                    <img width={45} height={45} src={petSliderimg} alt={`pet${petSliderimg}`} />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', position: 'relative', bottom: '180px', left: '40px', zIndex: '103' }}>

                    <img width={30} height={30} src={iconSliderimg} alt={`icon${iconSliderimg}`} />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', position: 'relative', bottom: '195px', left: '0px', zIndex: '102' }}>
                    <img width={37} height={37} src={helmetSliderimg} alt={`helmet${helmetSliderimg}`} />
                  </div>



                </div>

                <div style={{ display: 'flex', flexDirection: 'column' }}  >
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    Cabeça: {headSlider}
                    <input
                      type="range"
                      min="1"
                      max="7"
                      value={headSlider || 1}
                      onChange={(e) => {
                        setHeadSlider(e.target.value)
                      }}

                    />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    Torso {torsoSlider || 1}
                    <input
                      type="range"
                      min="1"
                      max="6"
                      value={torsoSlider || 1}
                      onChange={(e) => {
                        setTorsoSlider(e.target.value)
                      }}
                    />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    Pernas {lowerSlider || 1}
                    <input
                      type="range"
                      min="1"
                      max="4"
                      value={lowerSlider || 1}
                      onChange={(e) => {
                        setLowerSlider(e.target.value)
                      }}
                    />
                  </div>
                  <div style={{ textAlign: 'center', marginBlock: '10px' }} > <ArrowDownwardIcon style={{ color: 'yellow' }} /> PREMIUM <ArrowDownwardIcon style={{ color: 'yellow' }} /> </div>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    Braço esquerdo {lefthandSlider || 1}
                    <input
                      type="range"
                      min="1"
                      max="4"
                      value={lefthandSlider || 1}
                      onChange={(e) => {
                        setlefthandSlider(e.target.value)
                      }}
                      disabled={!isPremium}
                    />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    Braço direito {righthandSlider || 1}
                    <input
                      type="range"
                      min="1"
                      max="3"
                      value={righthandSlider || 1}
                      onChange={(e) => {
                        setrighthandSlider(e.target.value)
                      }}
                      disabled={!isPremium}
                    />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    Capacete {helmetSlider || 1}
                    <input
                      type="range"
                      min="1"
                      max="4"
                      value={helmetSlider || 1}
                      onChange={(e) => {
                        setHelmetSlider(e.target.value)
                      }}
                      disabled={!isPremium}
                    />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    Icone {iconSlider || 1}
                    <input
                      type="range"
                      min="1"
                      max="3"
                      value={iconSlider || 1}
                      onChange={(e) => {
                        setIconSlider(e.target.value)
                      }}
                      disabled={!isPremium}
                    />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    Pet {petSlider || 1}
                    <input
                      type="range"
                      min="1"
                      max="3"
                      value={petSlider || 1}
                      onChange={(e) => {
                        setpetSlider(e.target.value)
                      }}
                      disabled={!isPremium}
                    />
                  </div>



                </div>
                <button style={{ maxHeight: '60px', marginTop: '45px' }} disabled={keeper} type='button' onClick={() => {
                  saveOutfit();
                  setKeeper(true);
                }} className={styles.pushable}>
                  <span className={styles.edge}></span>
                  <span className={styles.front}>
                    Salvar Skin
                  </span>
                </button>
              </div>
              <p>
                Espere o nome em branco igual ao desejado:

                <span style={{ color: 'white', padding: '5px', fontWeight: 'bold' }} >{name}</span>
              </p>
              <p>
                Quer ser premium? basta apoiar o projeto!


              </p>
            </div>
            <div style={{ width: '250px', padding: '5px' }} className={styles.rpgdiv4}>


              <div className={styles.textmedieval} style={{ color: 'black', fontWeight: '1000', textAlign: 'center' }} >

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
            </div>
          </div> : null}

        <div style={{ color: 'white' }} >
          Total de usuários: {userscount}
        </div>
        <div style={{ color: 'white' }}>
          Usuários online procurando sessão: {userscountonline}
        </div>

      </div>

      <div style={{ display: 'flex', flexDirection: 'column', marginLeft: '240px' }} >

        {user.id && sessions && userscount && userscountonline && !isLoading ?
          <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }} >

            {user.id ?
              <div className={styles.maincontainer}>

                <div className={styles.maincontainertitle}> BEM VINDO AO PROJECTRP</div>
                <div style={{ overflowY: 'scroll', height: '200px', overflowX: 'hidden' }}  >

                  {sessions ? <Sessions sessions={sessions} id={user.id} /> :
                    <div>

                    </div>}
                </div>

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
        <div style={{ display: 'flex', gap: '5%' }} >

          <div className={styles.homechat}>
            <div>
              <h1 style={{ color: 'white', textAlign: 'center' }} >
                Botões Úteis
              </h1>

            </div>

          </div>
          <div style={{ maxWidth: '600px', width: '600px' }} className={styles.homechat}>
            <div style={{ width: '100%', display: 'flex', flexDirection: 'column' }} >
              <h1 style={{ color: 'white', textAlign: 'center' }} >
                CHAT
              </h1>
              <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }} >
                <div style={{
                  color: 'white',
                  border: '1px solid white',
                  height: '160px', width: '100%',
                  backgroundColor: 'grey', marginBottom: '10px'
                }} >

                </div>

              </div>
              <div>
                <input style={{ width: '85%', marginRight: '10px' }} placeholder='Escreva aqui' />
                <button>Enviar</button>
              </div>

            </div>
            <div style={{
              color: 'white',
              display: 'flex', flexDirection: 'column',
              border: '1px solid blue', padding: '5px',
              width: '100px', gap: '10px'
            }}>

              <div>
                Amigo 1
              </div>
              <div>
                Amigo 2
              </div>
              <div>
                Amigo 3
              </div>
            </div>
          </div>
        </div>
      </div>




    </div>
  );
}
