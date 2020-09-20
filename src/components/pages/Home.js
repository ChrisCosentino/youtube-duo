import React, { useState, useContext } from 'react';
import firebase from '../../firebase/index';
import shortid from 'shortid';
import { Redirect } from 'react-router-dom';

import UserContext from '../../context/user/userContext';

const Home = () => {
  // const [username, setUsername] = useState('');
  const [roomId, setRoomId] = useState('');
  const [redirect, setRedirect] = useState(false);
  const [login, setLogin] = useState('');

  const userContext = useContext(UserContext);

  const { username, setUsername, setHost } = userContext;

  const handleSubmit = () => {
    setUsername(login);
    console.log(username);
    if (roomId !== '') {
      // Join a room since it already has a value
      const arrayUnion = firebase.firebase.firestore.FieldValue.arrayUnion;
      firebase.db
        .collection('rooms')
        .doc(roomId)
        .update({
          users: arrayUnion(login),
        });

      setRedirect(true);
    } else {
      // Create a room
      // generate shortid
      const id = shortid.generate();
      firebase.db
        .collection('rooms')
        .doc(id)
        .set({
          users: [login],
          created: new Date(),
        });
      setHost(true);
      setRoomId(id);
      setRedirect(true);

      // create a collection doc in firebase
      // redirect to room id
    }
  };

  if (redirect) {
    return <Redirect to={`/r/${roomId}`} />;
  }

  return (
    <div>
      Join a room
      <input
        type='text'
        placeholder='Username'
        onChange={(e) => setLogin(e.target.value)}
        value={login}
      />
      <input
        onChange={(e) => setRoomId(e.target.value)}
        type='text'
        placeholder='Enter a room ID, leave empty to create a room'
        value={roomId}
      />
      <button onClick={handleSubmit} disabled={!login}>
        Enter
      </button>
    </div>
  );
};

export default Home;
