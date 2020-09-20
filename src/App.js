import React from 'react';
import firebase from './firebase/index';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import PrivateRoute from './components/routes/PrivateRoute';

import Home from './components/pages/Home';
import Room from './components/pages/Room';

import UserState from './context/user/UserState';

const App = () => {
  // const [todos, setTodos] = useState([]);

  console.log(firebase.db);

  // useEffect(() => {
  //   getTodos();
  // }, []);

  // const getTodos = () => {
  //   // firebase.db
  //   //   .collection('todo')
  //   //   .get()
  //   //   .then((querySnapshot) => {
  //   //     querySnapshot.forEach((doc) => {
  //   //       setTodos((prev) => [...prev, doc.data()]);
  //   //     });
  //   //   })
  //   //   .catch((err) => {
  //   //     console.log(err.message);
  //   //   });

  //   firebase.db.collection('todo').onSnapshot((snapshot) => {
  //     const data = snapshot.docs.map((doc) => doc.data());
  //     setTodos(data);

  //   });

  // };

  // const sendTodo = () => {
  //   firebase.db
  //     .collection('todo')
  //     .add({ title: 'first ya  todo', description: 'new todo' })
  //     .then((documentReference) => {
  //       console.log('document reference ID', documentReference.id);
  //     })
  //     .catch((error) => {
  //       console.log(error.message);
  //     });
  // };

  /* <button onClick={sendTodo}>Send</button>
      {todos.length === 0 ? null : todos.map((todo) => <h1>{todo.title}</h1>)} */

  return (
    <UserState>
      <Router>
        <Switch>
          <PrivateRoute path='/r/:id' component={Room} />
          {/* <Route path='/r/:id' component={Room} /> */}
          <Route exact path='/' component={Home} />
        </Switch>
      </Router>
    </UserState>
  );
};

export default App;
