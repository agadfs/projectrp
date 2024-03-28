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
        <div style={{ border: session.players[0] === user.id ? '2px solid red' : '2px solid black'}} className={styles.sessionbody} key={index} >
          <div>{session.players[0] === user.id ? 'Entrar como MESTRE' : 'Entrar como JOGADOR'} </div>
          <div>

            {session.title}
          </div>
          <div>
            Players: {session.players.length} 
          </div>
          <button onClick={() => {
            window.location.href=`/session/${session._id}`
          }} className={styles.simplebutton}> Entrar </button>
        </div>
      )
      )}

    </div>
  )
}