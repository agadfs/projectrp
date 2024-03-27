import styles from '../pages/home.module.css';

export default function Sessions(array, id) {
  const sessions = array.sessions;
  const userid = array.id;
  return (
    <div>
      {sessions?.map((session, index) =>
      (
        <div className={styles.sessionbody} key={index} >
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