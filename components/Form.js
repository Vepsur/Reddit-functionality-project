import { useMutation } from "@apollo/client";
import { useState } from "react";
import { CREATE_USER, LOGIN_USER } from '../mutations/user';

export default function Form({ setUserToken }) {
  const [formState, setFormState] = useState({
    email: '',
    password: '',
    name: ''
  });
  const [newUser] = useMutation(CREATE_USER);
  const [loginUser] = useMutation(LOGIN_USER);

  const login = () => {
    loginUser({
      variables: {
        email: formState.email,
        password: formState.password
      }
    }).
      then(({ data }) => {
        setUserToken(data.login.token);
        localStorage.setItem('token', data.login.token);
      }).catch((err) => {
        alert('Error on login. Check log')
        console.log(err)
      });
  }

  const signup = () => {
    newUser({
      variables: {
        name: formState.name,
        email: formState.email,
        password: formState.password
      }
    })
      .then(({ data }) => {
        console.log(data);
        setUserToken(data.signup.token);
        localStorage.setItem('token', data.signup.token);
      })
      .catch((err) => {
        alert('Error. Check log')
        console.log(err)
      });
  }

  return (
    <div className="w-full m-4 flex flex-col items-end justify-center">
      <div className="w-full m-4 flex items-end justify-center">
        <div className='flex flex-col items-start justify-center'>
          <span>Name</span>
          <input
            value={formState.name}
            onChange={(e) => setFormState({ ...formState, name: e.target.value })}
            className="border-black pl-2 border-2 mr-2 rounded-md"
            type="text"
            placeholder="Name">
          </input>
        </div>
        <div className='flex flex-col items-start justify-center'>
          <span>E-mail</span>
          <input
            value={formState.email}
            onChange={(e) => setFormState({ ...formState, email: e.target.value })}
            className="border-black pl-2 border-2 mr-2 rounded-md"
            type="text"
            placeholder="e-mail">
          </input>
        </div>
        <div className='flex flex-col items-start justify-center'>
          <span>Password</span>
          <input
            value={formState.password}
            onChange={(e) => setFormState({ ...formState, password: e.target.value })}
            className="border-black pl-2 border-2 mr-2 rounded-md"
            type="password"
            placeholder="password">
          </input>
        </div>
      </div>

      <div className="w-full m-4 flex items-end justify-center">
        <button onClick={() => login()} className="w-40 border-black border-2 m-2 mb-0 rounded-full flex flex-col items-center justify-center">
          Login
        </button>
        <button onClick={() => signup()} className="w-40 border-black border-2 m-2 mb-0 rounded-full flex flex-col items-center justify-center">
          Sign up
        </button>
      </div>

    </div>
  )
}