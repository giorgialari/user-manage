import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import '../Users/Users.css';
import Woman from '../Users/images/woman.png'
import Man from '../Users/images/man.png'
import ReactPaginate from 'react-paginate';
import axios from 'axios';

function Users() {
    //Chiamata API
    const [Users, setUsers] = useState([])
    const APIkey = localStorage.getItem('Token')
    //GET - Riempie le card con gli utenti
    useEffect(() => {
        axios.get(`https://gorest.co.in/public/v2/users?per_page=100&access-token=${APIkey}`)
            .then((response) => {
                setUsers(response.data);
            })
    }, [])
    //GET uguale alla precedente ma creata per richiamare il metodo dentro il DELETE
    const getUser = () => {
        axios.get(`https://gorest.co.in/public/v2/users?per_page=100&access-token=${APIkey}`)
            .then((response) => {
                setUsers(response.data);
            })
    }
    //DELETE - Elimina un utente
    const onDelete = (id) => {
        axios.delete(`https://gorest.co.in/public/v2/users/${id}?access-token=${APIkey}`)
            .then(() => {
                getUser();
            })
    }
    //Modale
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    //Imposta l'utente selezionato dopo l'apertura della modale
    const openModal = (user) => {
        console.log(user)
        setName(user.name)
        setGender(user.gender)
        setEmail(user.email)
        setStatus(user.status)
        setShow(true)//Apre la modale
    }
    //PUT Update - Aggiorna l'utente
    //Inizializza il form (devono chiamarsi esattamente come il server)
    const [name, setName] = useState('');
    const [gender, setGender] = useState('');
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    //Update non funzionante a causa dell'email che viene indicata come già esistente
    const updateUser = (id) => {
        if(setEmail === email){
            console.log('email non modificata')
        }
        const updatedUser = {
            name,
            gender,
            email,
            status
        };

        axios.put(`https://gorest.co.in/public/v2/users/${id}?access-token=${APIkey}`, updatedUser)
            .then(() => {
                getUser();
                handleClose();
            })
            .catch(function (error) {
                if (error.response) {
                    setErrorMessage('Compila i campi correttamente');
                }
            });
        }
        //Nasconde il messaggio di errore
        const hideError = () => {
            document.getElementById('alert').style.display = 'none'
        }

        //Ricerca 
        const [searchTerm, setSearchTerm] = useState('');
        const ricercaUtente = (e) => {
            setSearchTerm(e.target.value);
        };

        const FilteredUsers = Users.filter(user => {
            return user.name.toLowerCase().includes(searchTerm.toLowerCase());
        });

        //Paginazione
        const [pageNumber, setPageNumber] = useState(0);
        const [usersPerPage, setUsersPerPage] = useState(10);
        const pagesVisited = pageNumber * usersPerPage;
        const pageCount = Math.ceil(FilteredUsers.length / usersPerPage);
        //Utenti da mostrare in base al filtro e alla paginazione
        const displayUsers = FilteredUsers.slice(pagesVisited, pagesVisited + usersPerPage).map((data) => {
            return (
                <div key={data.id} className="mb-1">
                    <div className="card">
                        <img src={data.gender === 'female' ? Woman : Man} className="card-img-top p-2" />
                        <div className="card-body">
                            <h5 className="card-title">{data.name}</h5>
                            <div className='status'> {data.status === 'active' ? 'Online' : 'Offline'}
                                <div className={data.status === 'active' ? 'online' : 'offline'}></div>
                            </div>
                            <div className='d-flex flex-row justify-content-around btn-container'>
                                <button className="btn btn-primary" onClick={() => openModal(data)} data-mdb-toggle="modal" data-mdb-target="#exampleModal">Details</button>
                                <button className="btn btn-danger" onClick={() => onDelete(data.id)}>Delete</button>
                            </div>
                        </div>
                    </div>
                    {/* --------Modale DETTAGLIO Utente-------- */}
                    <form>
                        <Modal show={show} onHide={handleClose}>
                            <Modal.Header closeButton>
                                <Modal.Title>Update user</Modal.Title>
                            </Modal.Header>
                            <Modal.Body><div className="alert alert-danger" role="alert" id='alert' style={{ display: 'none' }}>
                                {errorMessage}
                            </div>
                                <div className='info-user'><div>Name:
                                </div>
                                    <input
                                        name="name"
                                        value={name}
                                        onInput={hideError}
                                        onChange={(e) => {
                                            setName(e.target.value);
                                        }}
                                    />

                                </div>
                                <div className='info-user'><div>Email:</div>
                                    <input
                                        name="email"
                                        value={email}
                                        onInput={hideError}
                                        onChange={(e) => {
                                            setEmail(e.target.value);
                                        }} />
                                </div>
                                <div className='info-user'><div>Gender:</div>
                                    <input
                                        name="gender"
                                        value={gender}
                                        onInput={hideError}
                                        onChange={(e) => {
                                            setGender(e.target.value);
                                        }}
                                    /></div>
                                <div className='info-user'><div>Status:</div>
                                    <input
                                        name="status"
                                        value={status}
                                        onInput={hideError}
                                        onChange={(e) => {
                                            setStatus(e.target.value);
                                        }}
                                    /></div>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={handleClose}>
                                    Close
                                </Button>
                                <Button variant="primary" onClick={() => updateUser(data.id)}>
                                    Save Changes
                                </Button>
                            </Modal.Footer>
                        </Modal>
                    </form>
                </div>
            )
        });

        const changePage = ({ selected }) => {
            setPageNumber(selected);
        };
        const utentiPerPagina = (e) => {
            setUsersPerPage(parseInt(e.target.value));
        };

        //Render HTML
        return (
            <div style={{ paddingBottom: '30px' }} className="d-flex flex-column align-items-center">
                <div className='text-center mb-3' style={{ marginTop: '80px' }}>
                    <h3>Users</h3>
                    <div className="d-flex justify-content-center flex-column">
                        <div className="input-group">
                            <div className="form-outline">
                                <input type="search" id="form1" placeholder='Search an user...' className="form-control" onChange={ricercaUtente} value={searchTerm} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className='d-flex flex-wrap justify-content-around mt-5 mx-5' style={{ gap: '5%', marginBottom: '100px' }}>
                    {displayUsers}
                    <div className="d-flex justify-content-center mt-3">
                        <select className="form-select utenti-pagina bg-transparent" onChange={utentiPerPagina}>
                            <option value="5">5</option>
                            <option value="10" defaultValue>10</option>
                            <option value="20">20</option>
                        </select>
                        <ReactPaginate
                            previousLabel={"Previous"}
                            nextLabel={"Next"}
                            pageCount={pageCount}
                            onPageChange={changePage}
                            containerClassName={"pagination"}
                            previousLinkClassName={"page-link"}
                            nextLinkClassName={"page-link"}
                            disabledClassName={"disabled"}
                            activeClassName={"active"}
                        />
                    </div>
                </div>
            </div>
        )
    }

    export default Users;
