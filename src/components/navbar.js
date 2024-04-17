import styles from './navbar.module.css';
import { useAppContext } from '../AppContext';
import { useEffect } from 'react';
import { AwesomeButton } from 'react-awesome-button';

export default function Navbar() {
  const currentYear = new Date().getFullYear();
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
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignContent: 'flex-start', alignItems: 'flex-start' }} >
        <div style={{ marginRight: '5px' }} className={styles.rpgdiv1}>
          © {currentYear} Henrique Dev. Todos os direitos reservados.
        </div>
        {user.id ?
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }} >
            <div style={{ marginBottom: '0px' }} className={styles.rpgdiv1}>
              Seu id: {user.id}
            </div>


          </div> :
          null}

        <button onClick={() => {
          window.location.href = '/'
        }} className={styles.pushable}>
          <span style={{ width: '225px' }} className={styles.edge}></span>
          <span style={{ width: '200px' }} className={styles.front}>
            Ir para a pagina inicial
          </span>
        </button>


        <div style={{
          marginLeft: '130px', maxWidth: '250px', color: 'white', justifyContent: 'center',
          alignContent: 'center', alignItems: 'center',
          height: '100%', display: 'flex'
        }} >

          {urlrequest === process.env.REACT_APP_API_URL ?
            <div  >
              Servidor principal ON
            </div> :
            <div style={{ maxWidth: '350px', width: '100vw' }}
            >
              SERVIDOR PRINCIPAL ESTÁ OFF, É POSSÍVEL TER LAG, NÃO CLIQUE MUITAS VEZES NOS BOTÕES</div>}
        </div>
        

        {user.id ?

          <button style={{ marginLeft: '130px' }} onClick={() => {
            setUser({ id: '' })
            localStorage.removeItem('userid')
            window.location.href = '/'
          }} className={styles.pushable}>
            <span className={styles.edge}></span>
            <span className={styles.front}>
              Logout
            </span>
          </button>
          :

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
          <div style={{
          marginLeft: '130px', maxWidth: '250px', color: 'white', justifyContent: 'center',
          alignContent: 'center', alignItems: 'center',
          height: '100%', display: 'flex'
        }} >


          <div>
           Version= Alfa  1.12
          </div>
        </div>
      </div>

    </div>
  )
}