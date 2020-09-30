import React, { useState } from 'react';
import {Link, useHistory} from 'react-router-dom';
import {FiArrowUpLeft} from 'react-icons/fi'

import api from '../../services/api';
import './styles.css';

import logoImg from '../../assets/logo.svg';

export default function Register(){

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [city, setCity] = useState('');
    const [uf, setUf] = useState('');

    const history = useHistory();

    async function handleRegister(e){
        e.preventDefault();
    const data = {
        name,
        email,
        whatsapp,
        city,
        uf,
    };

    try{
        const response = await api.post('ongs', data);

        alert(`Seu ID de acesso: ${response.data.id}`);

        history.push('/');
    }catch(error){
        alert('Erro no cadastro, tente novamente');
    }
    }


    return (
        <div className='register-container'>
            <div className='content'>
                <section>
                    <img src={logoImg} alt='Be The Hero'/>

                    <h1>Cadastro</h1>
                    <p>Faça  seu cadastro, entre na plataforma e agende seus serviços onde estiver.</p>

                    <Link className='back-link' to='/'>
                        <FiArrowUpLeft size={16} color='#4682B4'/>
                        Já Tenho Cadastro
                    </Link>
                </section>

                <form onSubmit={handleRegister}>
                    <input placeholder='Nome' value={name} onChange={e => setName(e.target.value)} required/>
                    <input type='email' placeholder='email' value={email} onChange={e => setEmail(e.target.value)} required/>
                    <input placeholder='WhatsApp'  value={whatsapp} onChange={e => setWhatsapp(e.target.value)}/>
                    <input placeholder='senha' type='password' required/>
                   
                    <h3 style={{color:'#737380', marginTop:'10px'}}>Tipo de cadastro</h3>
                    <div className='input-group' style={{display:'flex', justifyContent:'center'}}>
                    <input className='radio' type='radio' name='tipo' style={{width:'30px', height:'30px'}} id='client' value='cliente' required/>
                    <strong style={{marginTop:'15px', marginLeft:'10px', font:'18px', color:"#737380", marginRight:'40px'}}>Cliente</strong>
                    <input className='radio' type='radio' name='tipo' style={{width:'30px', height:'30px'}}/>
                    <strong style={{marginTop:'15px', marginLeft:'10px', font:'18px', color:"#737380"}} id='business' value='empresa'>Empresa</strong>
                    </div>

                    <button className='button' type='submit'>Cadastrar</button>
                </form>
            </div>
        </div>
    );
}