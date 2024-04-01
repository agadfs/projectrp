import styles from './navbar.module.css';
import { useAppContext } from '../AppContext';
import { useEffect } from 'react';

export default function Navbar() {
  const { user, setUser } = useAppContext();
  useEffect(() => {
    if(user.id){
      localStorage.setItem('userid', user.id)
    }
    else{
      const id = localStorage.getItem('userid')
      if(id){
        setUser({id:id})
      }
    }
  },[user])
  return (
    <div className={styles.body} >

      <div>{user.id ?
        <div>
          <div> 
          Seu id: {user.id}
          </div>
          <button onClick={()=> {
             setUser({id:''})
             localStorage.removeItem('userid')
             window.location.href='/'
          }} >
            Logout
          </button>
        </div> :
        <div>

          <button onClick={() => {
            window.location.href = '/login'; // Corrected navigation
          }}>
            Faça o login aqui
          </button>
        </div>}
      </div>
      <button onClick={()=> {
             
             window.location.href='/'
          }} >
            Ir para a pagina inicial
          </button>
    </div>
  )
}