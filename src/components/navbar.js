import styles from './navbar.module.css';
import { useAppContext } from '../AppContext';
import { useEffect } from 'react';
import { AwesomeButton } from 'react-awesome-button';

export default function Navbar() {
  const { user, setUser, urlrequest } = useAppContext();
  useEffect(() => {
    if (user.id) {
      localStorage.setItem('userid', user.id)
    }
    else {
      const id = localStorage.getItem('userid')
      if (id) {
        setUser({ id: id })
      }
    }
  }, [user])
  return (
    <div className={styles.body} >
      <div style={{display:'flex', flexDirection:'column', justifyContent:'flex-start', alignContent:'flex-start', alignItems:'flex-start'}} >
        {user.id ?
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }} >
          <div style={{ marginBottom: '0px' }} className={styles.rpgdiv1}>
            Seu id: {user.id}
          </div>
          
        </div> :
        null}
        <div style={{display:'flex', justifyContent:'center', alignContent:'center', alignItems:'center'}} > 
        <button onClick={() => {
          window.location.href = '/'
        }} className={styles.pushable}>
          <span className={styles.edge}></span>
          <span className={styles.front}>
            Ir para a pagina inicial
          </span>
        </button>
        {user.id ? <div> <button onClick={() => {
            setUser({ id: '' })
            localStorage.removeItem('userid')
            window.location.href = '/'
          }} className={styles.pushable}>
            <span className={styles.edge}></span>
            <span className={styles.front}>
              Logout
            </span>
          </button> </div> : 
          
          <div  >
          <button onClick={() => {
            window.location.href = '/login'; // Corrected navigation
          }} className={styles.pushable}>
            <span className={styles.edge}></span>
            <span className={styles.front}>
              Faça o login aqui
            </span>
          </button>
        </div>}
        </div>
        <div style={{ maxWidth: '250px'}} >

          {urlrequest === process.env.REACT_APP_API_URL ? <div className={styles.rpgdiv1} >Servidor principal ON</div> : <div style={{ maxWidth: '350px', width: '100vw' }} className={styles.rpgdiv1}>SERVIDOR PRINCIPAL ESTÁ OFF (Utilizando servidor backup, talvez tenha algum lag, POR GENTILEZA, NÃO CLIQUE RAPIDAMENTE VARIAS VEZES NAS COISAS, CLIQUE UMA VEZ E ESPERE PELO MENOS 1 SEGUNDO)<br /> Caso não respeite o aviso, há chance de perder dados da sessão, tal como atributos e items</div>}
        </div>

      </div>
    </div>
  )
}