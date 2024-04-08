import styles from './navbar.module.css';
import { useAppContext } from '../AppContext';
import { useEffect } from 'react';

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
      <div>{user.id ?
        <div style={{display:'flex', flexDirection:'column', gap:'10px'}} >
          <div style={{marginBottom:'0px'}} className={styles.rpgdiv1}>
            Seu id: {user.id}
          </div>
          <button onClick={() => {
            setUser({ id: '' })
            localStorage.removeItem('userid')
            window.location.href = '/'
          }} >
            Logout
          </button>
        </div> :
        <div >

          <button onClick={() => {
            window.location.href = '/login'; // Corrected navigation
          }}>
            Faça o login aqui
          </button>
        </div>}
        <button  style={{width:'100%', marginBlock:'10px'}} onClick={() => {

          window.location.href = '/'
        }} >
          Ir para a pagina inicial
        </button>
        <div style={{maxWidth:'250px'}} >

        {urlrequest === process.env.REACT_APP_API_URL ? <div className={styles.rpgdiv1} >Servidor principal ON</div> : <div style={{maxWidth:'350px', width:'100vw'}} className={styles.rpgdiv1}>SERVIDOR PRINCIPAL ESTÁ OFF (Utilizando servidor backup, talvez tenha algum lag, POR GENTILEZA, NÃO CLIQUE RAPIDAMENTE VARIAS VEZES NAS COISAS, CLIQUE UMA VEZ E ESPERE PELO MENOS 1 SEGUNDO)<br/> Caso não respeite o aviso, há chance de perder dados da sessão, tal como atributos e items</div>}
        </div>
      </div>
    </div>
  )
}