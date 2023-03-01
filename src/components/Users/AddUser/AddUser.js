import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './AddUser.css'

function AddUser() {
    //Inizializza il form (devono chiamarsi esattamente come il server)
    const [name, setName] = useState('');
    const [gender, setGender] = useState('');
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const navigate = useNavigate();
    const APIkey = localStorage.getItem('Token')

    const newUser = {
        name,
        gender,
        email,
        status
    };
    //POST- Aggiunge un nuovo utente
    const addUser = (e) => {
        e.preventDefault();
        axios.post(`https://gorest.co.in/public/v2/users?access-token=${APIkey}`, newUser)
            .then(() => {
                navigate('/users')
            })
            .catch(function (error) {
                if (error.response) {
                    //   console.log(error.response.data);
                    //   console.log(error.response.status);
                    //   console.log(error.response.headers);
                    document.getElementById('alert').style.display = 'block'
                    setErrorMessage('Compila i campi correttamente')
                }
            });
    }
    //Nasconde il messaggio di errore
    const hideError = () => {
        document.getElementById('alert').style.display = 'none'
    }
    return (
        <div>
            <form className="neuromorph-form">
                <h3>Add new user</h3>
                <div className="alert alert-danger" role="alert" id='alert' style={{ display: 'none' }}>
                    {errorMessage}
                </div>
                <div className="row mt-4 mb-4">
                    <div className="col">
                        <div className="form-outline">
                            <div className='input-container'>
                                <label className="form-label" htmlFor="form2Example1">Name</label>
                                <input type="text" id="form3Example1" className="form-control" name="name"
                                    onInput={hideError}
                                    onChange={(e) => setName(e.target.value)} />
                            </div>
                        </div>
                    </div>
                    <div className="col">
                        <div className="form-outline">
                            <div className='input-container'>
                                <label className="form-label" htmlFor="form2Example2">Gender</label>
                                <input type="text" id="form3Example2" className="form-control" name="gender"
                                    onInput={hideError}
                                    onChange={(e) => setGender(e.target.value)} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="form-outline mb-4">
                    <div className='input-container'>
                        <label className="form-label" htmlFor="form2Example3">Email</label>
                        <input type="email" id="form3Example3" className="form-control" name="email"
                            onInput={hideError}
                            onChange={(e) => setEmail(e.target.value)} />
                    </div>
                </div>
                <div className="form-outline mb-4">
                    <div className='input-container'>
                        <label className="form-label" htmlFor="form2Example4">Status</label>
                        <input type="text" id="form3Example4" className="form-control" name="status"
                            onInput={hideError}
                            onChange={(e) => setStatus(e.target.value)} />
                    </div>
                </div>
                <button type="button" onClick={addUser} className="btn btn-primary btn-block mb-4">Add</button>
            </form>
        </div>
    )
}

export default AddUser
