import { useEffect, useState } from 'react'
import styles from './login.module.css'
import axios from 'axios'
import { useAppContext } from '../AppContext'

export default function Login() {
  const [logintype, setLoginType] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { user, setUser, urlrequest } = useAppContext();

  useEffect(() => {
    if(user.id){
      window.location.href = '/'
    }
  },[user])
  
  function generateRandomUsername() {
    return `user${Math.floor(Math.random() * 1000)}`;
  }

  async function createUser() {
    try {
      // Generate random user data
      const randomUser = {
        username: generateRandomUsername(),
        email: email,
        password: password,
        isOn: false,
        lastActiveAt: new Date,
      };


      await axios.post(`${urlrequest}/users`, randomUser)
      .then(() => {
        fetchUserData()
      })

    } catch (error) {
      console.error('Error creating user:', error);
    }
  }

  async function fetchUserData() {
    try {
      const queryParams = {
        headers: {
          'Content-Type': 'application/json',
          'ngrok-skip-browser-warning': 'true',

        }
      };
      
      console.log(queryParams)
  
      const response = await axios.get(`${urlrequest}/usersget/${email}/${password}`, queryParams);
  
      if (response) {
        
        if(response.data.length > 0){

          console.log('Conta encontrada:', response.data);
          const userId = response.data[0]._id;
          setUser({ id: userId });
        }else{
          console.log('Nenhuma conta encontrada')
        }
      }
    } catch (error) {
      console.error('Erro ao buscar dados:', error);
    }
  }
  
  return (
    <div className={styles.body} >
      {logintype ?
        <div className={styles.logincontainer}>
          <div>
            Faça o login aqui
          </div>
          <div>
            <form onSubmit={(e) => {
              e.preventDefault()
              fetchUserData()
            }} className={styles.logincontainer}>
              <p>Email existente</p>
              <input placeholder='email' type='email' value={email} onChange={(e) => {
                setEmail(e.target.value)
              } } />
              <p>Senha existente</p>
              <input placeholder='password' type='password' value={password} onChange={(e) => {
                setPassword(e.target.value)
              } } />
              <button>
                Fazer login
              </button>
            </form>
          </div>
          <button onClick={() => {
            setLoginType(!logintype)
          }}>
            Não possui uma conta?
          </button>

        </div>
        :
        <div className={styles.logincontainer}>

          <div>
            Crie sua conta aqui
          </div>
          <div>
          <form onSubmit={(e) => {
              e.preventDefault()
              createUser()
            }} className={styles.logincontainer}>
              <p>Email novo</p>
              <input placeholder='email' type='email' value={email} onChange={(e) => {
                setEmail(e.target.value)
              } } />
              <p>Senha nova</p>
              <input placeholder='password' type='password' value={password} onChange={(e) => {
                setPassword(e.target.value)
              } } />
              <button>
                Criar conta
              </button>
            </form>
          </div>
          <button onClick={() => {
            setLoginType(!logintype)
          }}>
            Já possui uma conta?
          </button>

        </div>}







    </div>
  )
}