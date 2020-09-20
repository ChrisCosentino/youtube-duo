import React, { useEffect, useState } from 'react';
import firebase from '../../firebase/index';

const Room = ({ match }) => {
  const [roomState, setRoomState] = useState({
    users: [],
    queue: [],
  });
  const roomId = match.params.id;
  useEffect(() => {
    firebase.db
      .collection('rooms')
      .doc(roomId)
      .get()
      .then((doc) => {
        if (doc.exists) {
          const docRef = doc.data();

          setRoomState({
            ...roomState,
            users: docRef.users,
            queue: docRef.queue,
          });
        } else {
          console.log('No such document!');
        }
      })
      .catch((err) => {
        console.log('error geting document: ', err);
      });

    // eslint-disable-next-line
  }, []);

  return (
    <div>
      Room
      {roomState.users.map((user, index) => (
        <div key={index}>{user}</div>
      ))}
    </div>
  );
};

export default Room;
