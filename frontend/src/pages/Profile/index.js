import React, {useEffect, useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import {FiPower, FiTrash2} from 'react-icons/fi';
 
import './styles.css';

import api from '../../services/api';
import logoImg from '../../assets/logo.svg';

export default function Profile(){
    const [incident, setIncident] = useState([]);
    const history = useHistory();

    const ongID = localStorage.getItem('ongId');
    const ongName = localStorage.getItem('OngName');

    console.log(ongID)

    useEffect(()=>{
        api.get('profile', {
            headers: {
                authorization: ongID,
            }
        }).then(response => {
;            setIncident(response.data);
        })
    }, [ongID])

    async function handleDeleteIncident(id){
        try{
            await api.delete(`incidents/${id}`, {
                headers: {
                    authorization: ongID,
                }
            });

            setIncident(incident.filter(incident => incident.id !== id));
        }catch(err){
            alert('Erro ao deletar caso, tente novamente');
        }
    }

    function handleLogout(){
        localStorage.clear();

        history.push('/');
    }

    return(
        <div className='profile-container'>
            <header>
                <img src={logoImg} alt='Be The Hero'/>
                <span>Bem vinda, {ongName}</span>

                <Link className='button' to='/incident/new'>Agendamento de novo corte</Link>
                <button onClick={handleLogout} type='button'>
                    <FiPower size={18} color='#E020441'/>
                </button>
            </header>

            <h1>Atendimento agendados</h1>

            <ul>
                {incident.map(incident => (
                    <li key={incident.id}>
                    <strong>Nome do cliente:</strong>
                    <p>{incident.title}</p>

                    <strong>Data de Atendimento</strong>
                    <p>01/06/2020</p>

                    <strong>Horário de Atendimento</strong>
                    <p>09:30h</p>
    
                    <strong>Serviço:</strong>
                    <p>{incident.description}</p>
    
                    <strong>VALOR:</strong>
                    <p>{Intl.NumberFormat('pt-BR', {style: 'currency', currency:'BRL'}).format(incident.value)}</p>
    
                    <button onClick={() => handleDeleteIncident(incident.id)} type='button'>
                        <FiTrash2 size={20} color='#a8a8b3'></FiTrash2>
                    </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}