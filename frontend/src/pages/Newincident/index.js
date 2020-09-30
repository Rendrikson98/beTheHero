import React, { useState } from 'react';
import {Link, useHistory} from 'react-router-dom';
import {FiArrowUpLeft} from 'react-icons/fi';


import api from '../../services/api'
import logoImg from '../../assets/logo.svg';

import './styles.css'

export default function Newincident(){

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [value, setValue] = useState('');

    const history = useHistory();

    const ongId = localStorage.getItem('ongId');

    async function handleNewIncident(e){
        e.preventDefault();

        const data = {
            title,
            description,
            value,
        };

        try{
            await api.post('incidents', data, {
                headers: {
                    authorization: ongId,
                }
            })

            history.push('/profile');
        }catch(err){
            alert('Erro ao cadastrar caso, tente novamente');
        }
    }
    return(
        <div className='new-incident-container'>
            <div className='content'>
                <section>
                    <img src={logoImg} alt='Be The Hero'/>

                    <h1>Agendamento do serviço</h1>
                    <p>Faça  seu agendamento, de forma rápida e segura sem sair de casa.</p>

                    <Link className='back-link' to='/profile'>
                        <FiArrowUpLeft size={16} color='#E02041'/>
                        Voltar para home
                    </Link>
                </section>

                <form onSubmit={handleNewIncident}>
                    <input type='date' value={title} onChange={e => setTitle(e.target.value)}/>
                    <select value={description} onChange={e => setDescription(e.target.value)}>
                        <option></option>
                        <option>Corte curto - R$ 10,00</option>
                        <option>Corte na Tesoura - R$ 12,00</option>
                        <option>Corte na Máquina - R$ 8,00</option>
                        <option>Barba - R$ 8,00</option>
                    </select>
                    <input placeholder='R$ 10,00' value={value} onChange={e => setValue(e.target.value)} readOnly/>

                    <button className='button' type='submit'>Agendar</button>
                </form>
            </div>
        </div>
    );
}

