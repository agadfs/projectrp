import { useAppContext } from '../AppContext';
import styles from '../pages/home.module.css';

export default function Sessions(array, id) {
  const sessions = array.sessions;
  const userid = array.id;
  const { user, setUser } = useAppContext();
  return (
    <div>
      {sessions?.map((session, index) =>
      (
        <div style={{ backgroundColor: session.players[0] === user.id ? 'rgb(223, 54, 14)' : 'rgb(173, 154, 124)'}} className={styles.sessionbody} key={index} >
          <div>{session.players[0] === user.id ? 'Entrar como MESTRE' : 'Entrar como JOGADOR'} </div>
          <div>

            {session.title}
          </div>
          <div>
            Players: {session.players.length} 
          </div>
          <button onClick={() => {
            window.location.href=`/session/${session._id}`
          }}  className={styles.pushable}>
                <span className={styles.edge}></span>
                <span className={styles.front}>
                Entrar
                </span>
              </button>
          
        </div>
      )
      )}

    </div>
  )
}