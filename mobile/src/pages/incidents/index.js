import React, {useState, useEffect} from 'react';
import {Feather} from '@expo/vector-icons';
import {useNavigation} from '@react-navigation/native';
import { View, FlatList, Image, Text, TouchableOpacity } from 'react-native'

import axios from '../../services/index';

import logoImg from '../../assets/logo.png';

import styles from './style';

export default function Incidents(){
    const [incidents, setIncidents] = useState([]);
    const [casos, setCasos] = useState(0)
    const navigation =  useNavigation();

    const [page, setPage] = useState(0);
    const [loading, setLoading] = useState(false);

    async function loadIncidents(){

        if(loading){
            return;
        }

        if(casos > 0  && incidents.length == casos){
            return;
        }

        setLoading(true);
        
        const response = await axios.get(`incidents?page=${page}`);
    
        setIncidents([...incidents ,...response.data]);
        setCasos(response.data.length);
        setPage(page + 1);
        setLoading(false);
    }

    useEffect(() => {
        loadIncidents();
    }, [])


    function navigationToDetail(incident){
        navigation.navigate('Detail', {incident});
    }

    return(
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={logoImg}/>
                <Text style={styles.headerText}>
                    Total de <Text style={styles.headerTextBold}>{casos} casos</Text>.
                </Text>
            </View>

            <Text style={styles.title}>Bem-Vindo!</Text>
            <Text style={styles.description}>Escolha um dos casos abaixo e salve o dia</Text>


            <FlatList 
                data={incidents}
                keyExtractor={incident => String(incident.id)}
                style={styles.incidentList}
                showsVerticalScrollIndicator={false}
                onEndReached={loadIncidents}
                renderItem={({item: incident}) => (
                    <View style={styles.incident}>
                        <Text style={styles.incidentProperty}>ONG:</Text>
                        <Text style={styles.incidentValue}>{incident.name}</Text>

                        <Text style={styles.incidentProperty}>CASO:</Text>
                        <Text style={styles.incidentValue}>{incident.description}</Text>

                        <Text style={styles.incidentProperty}>VALOR:</Text>
                        <Text style={styles.incidentValue}>R$ 120,00</Text>

                        <TouchableOpacity style={styles.detailButton} onPress={() => navigationToDetail(incident)} >
                            <Text style={styles.detailButtonText}>Ver mais detalhes</Text>
                            <Feather name='arrow-right' size={16} color='#E02041' />
                        </TouchableOpacity>

                    </View>
                )}
            />
        </View>
    )
}