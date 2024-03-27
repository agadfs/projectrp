import { useEffect, useState } from 'react';
import styles from './home.module.css';
import axios from 'axios';
import User from '../server/models/User';
import { useAppContext } from '../AppContext';
import Sessions from '../components/sessions';

export default function Home() {
  const { user, setUser } = useAppContext();
  const [userscount, setUsersCount] = useState();
  const [userscountonline, setUserscountonline] = useState();
  const [sessions, setSessions] = useState();
  useEffect(() => {
    async function getusers() {
      try {
        const response = await axios.get('http://localhost:4000/userscount');
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
        const response = await axios.get('http://localhost:4000/userscountonline');
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
        const response = await axios.get('http://localhost:4000/sessions');
        if (response.data) {
          const data = response.data;
          setSessions(data)
          console.log(data)
        }
      } catch (error) {
        console.error('Error fetching sessions ', error)
      }
    }
    getusers();
    getusersonline();
    getsessions()
  }, [])

  useEffect(() => {
    if (user.id) {
      const intervalId = setInterval(async () => {
        try {

          // Assuming you're updating the user's activity status in your backend
          await axios.post('http://localhost:4000/heartbeat', { userId: user.id, lastActiveAt: new Date, });
          console.log('Heartbeat sent');
        } catch (error) {
          console.error('Error sending heartbeat:', error);
        }
      }, 5000);

      return () => clearInterval(intervalId);
    }
  }, [user.id]);

  async function createRandomUser() {
    try {
      // Generate random user data
      const randomUser = {
        username: generateRandomUsername(),
        email: generateRandomEmail(),
        password: generateRandomPassword(),
        isOn: false,
        lastActiveAt: new Date,
      };


      await axios.post('http://localhost:4000/users', randomUser);


    } catch (error) {
      console.error('Error creating user:', error);
    }
  }
  async function createRandomSession() {
    try {
      // Generate random user data
      const randomSession = {
        idsession: user.id,
        title: generateRandomUsername(),
        players: [user.id],
      };

      await axios.post('http://localhost:4000/sessions', randomSession);


    } catch (error) {
      console.error('Error creating session:', error);
    }
  }


  function generateRandomUsername() {
    return `user${Math.floor(Math.random() * 1000)}`;
  }

  function generateRandomEmail() {
    return `user${Math.floor(Math.random() * 1000)}@example.com`;
  }

  function generateRandomPassword() {
    return Math.random().toString(36).slice(-8); // Generate a random 8-character password
  }



  return (
    <div className={styles.body}>
      <div className={styles.datashow}>
       {/*  <button className={styles.simplebutton} onClick={createRandomUser}>Create Random User</button> */}
        {user.id ? <div><button className={styles.simplebutton} onClick={createRandomSession}>Create Random Session</button> </div> : null}

        <div>
          Total de usuários: {userscount}
        </div>
        <div>
          Usuários online: {userscountonline}
        </div>
      </div>


      {user.id ?
        <div className={styles.maincontainer}>
          <div className={styles.maincontainertitle}> BEM VINDO AO PROJECTRP</div>
          {sessions ?  <Sessions sessions={sessions} id={user.id} /> : null}
         
        </div>
        :
        null}



    </div>
  );
}
