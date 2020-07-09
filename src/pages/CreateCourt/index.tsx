import React, { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { Map, TileLayer, Marker } from 'react-leaflet';
import api from '../../services/api';
import { LeafletMouseEvent } from 'leaflet';

import './styles.css';

import logo from '../../assets/logo.png'
import axios from 'axios';

interface Characteristic {
    id: number;
    image_url: string;
    title: string;
}

interface RegionResponse {
    region:string;
}   

interface Country {
    name : string;
    code : string;
}

interface CityResponse {
    city: string;
    region: string;
    country: string;
    latitude: number;
    longitude: number;
}

const CreateCourt = () => {

    //State created to be used on useEffect function. 
    // Array or Object need to be informed the type of the variable inside. 
    const [characteristics, setCharacteristics] = useState<Characteristic[]>([]);
    const [countrys, setCountry] = useState<Country[]>([]);
    const [regions, setRegion] = useState<RegionResponse[]>([]);
    const [cities, setCity] = useState<CityResponse[]>([]);

    const [selectedCountry, setSelectedCountry] = useState('0');
    const [selectedRegion, setSelectedRegion] = useState('0');
    const [selectedCity, setSelectedCity] = useState('0');
    const [selectedCharacteristics, setSelectedCharacteristics] = useState<number[]>([]);

    const [initialPosition, setIntialPosition] = useState<[number, number]>([0,0]);
    const [selectedPostion, setSelectedPosition] = useState<[number, number]>([0,0]);

    const [formData, setFormData] = useState({
        title : '',
        address : '',
    });

    const history = useHistory();

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(position => {
            const {latitude, longitude} = position.coords;
            setIntialPosition([latitude, longitude])
        });
    }, []); 

    useEffect(() => {
        api.get('characteristics').then(response =>{
            setCharacteristics(response.data);
        });
    }, []);

    //API call for the Country quering only the Country Code
    useEffect(() => {
        axios.get<Country[]>('http://battuta.medunes.net/api/country/all/?key=8890b6ffdddba99e5727466f434076f1').then(response =>{
            setCountry(response.data);;
            console.log(response.data)
            /*const countryName = response.data.map( countryname => countryname.name)
            setCountryNames(countryName)*/
        });
    }, []);

    //API call for the Country quering only the State
    useEffect(() => {
        // If statement returning nothing. If the country is not selected do no
        if (selectedCountry === '0'){
            return;
        }

        axios.get<RegionResponse[]>(`http://battuta.medunes.net/api/region/${selectedCountry}/all/?key=8890b6ffdddba99e5727466f434076f1`)
        .then(response =>{
        setRegion(response.data);
        console.log(response.data);
        }); 
            

    },[selectedCountry]);

    useEffect(() => {
        // If statement returning nothing. If the country is not selected do no
        if (selectedRegion === '0'){
            return;
        }

        axios.get<CityResponse[]>(`http://battuta.medunes.net/api/city/${selectedCountry}/search/?region=${selectedRegion}&key=8890b6ffdddba99e5727466f434076f1`)
        .then(response =>{
        setCity(response.data);
        console.log(response.data);
        }); 
            

    },[selectedRegion,selectedCountry]);


// Query for the city.
//http://battuta.medunes.net/api/city/ca/search/?region=Que&key=8890b6ffdddba99e5727466f434076f1

    function handleSelectedCountry(event: ChangeEvent<HTMLSelectElement>) {
        const countryname = event.target.value;
        setSelectedCountry(countryname)
        console.log(countryname)// Saving the variable from the country selected and storing to be used later. 
    } /*const countryName = response.data.map( countryname => countryname.name) setCountryNames(countryName)*/

    function handleSelectedRegion(event: ChangeEvent<HTMLSelectElement>) {
        const region = event.target.value;
        setSelectedRegion(region)// Saving the variable from the country selected and storing to be used later. 
    }
    function handleSelectedCity(event: ChangeEvent<HTMLSelectElement>) {
        const city = event.target.value;
        setSelectedCity(city)// Saving the variable from the country selected and storing to be used later. 
    }
    function handleMapClick(event: LeafletMouseEvent){
        setSelectedPosition([
            event.latlng.lat,
            event.latlng.lng,
        ])
    }

    function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target;

        setFormData({ ...formData, [name]: value})
    }

    function handleSelectCharacteristics(id: number){
        const alreadySelected = selectedCharacteristics.findIndex(characteristic => characteristic === id);

        if (alreadySelected >=0) {
            const filteredCharacteristics = selectedCharacteristics.filter(characteristic => characteristic !== id);
            setSelectedCharacteristics(filteredCharacteristics);
        }else{
            setSelectedCharacteristics([ ...selectedCharacteristics,  id]);
        }  
    }

    async function handleSubmit(event: FormEvent ) {
        event.preventDefault();

        const {title, address} = formData;
        const country = selectedCountry;
        const region = selectedRegion;
        const city = selectedCity;
        const [latitude, longitude] = selectedPostion;
        const characteristics = selectedCharacteristics;

        const data = {
             title,
             address,
             country,
             region,
             city,
             latitude,
             longitude,
             characteristics   
        };
        await api.post('courts',data);
            
        alert('Court added!')

        history.push('/');
    }



    return (
        <div id="page-create-court">
            <header>
                <img src={ logo } alt="Basketball Map"/>
                <Link to='/'>
                    <FiArrowLeft/>
                    Back to Home Page
                </Link>
            </header>

            <form onSubmit={handleSubmit}>
                <h1>Add a new court</h1>

                <fieldset>
                    <legend>
                        <h2>Title</h2>
                    </legend>
                </fieldset>

                <div className="field">
                    <label htmlFor="address">Give a title for your court!</label>
                    <input type="text"
                    name="title"
                    id="title" 
                    onChange = {handleInputChange}
                    />
                </div>

                <fieldset>
                    <legend>
                        <h2><FaMapMarkerAlt/>Location</h2>
                    </legend>
                </fieldset>

                <div className="field">
                    <label htmlFor="address">Street address</label>
                    <input 
                    type="text"
                    name="address"
                    id="address" 
                    onChange={handleInputChange}
                    />
                </div>

                <div className="field">
                    <label htmlFor="country">Country</label>
                    <select 
                    name="country"
                    id="country"
                    value={selectedCountry} 
                    onChange = {handleSelectedCountry}
                    >
                    <option value="0">Select a country</option>
                    {countrys.map(country => (
                        <option key={country.code}value={country.code}>{country.name}</option>
                    ))}
                    </select>
                </div>

                <div className="field-group">

                <div className="field">
                    <label htmlFor="region">Region / State</label>
                    <select
                    name="region"
                    id="region"
                    value={selectedRegion}
                    onChange = {handleSelectedRegion}>
                    <option value="0">Select a region</option> 
                    {regions.map(region => (
                        <option key={region.region}value={region.region}>{region.region}</option>
                    ))}                  
                    </select>
                </div>
                <div className="field">
                    <label htmlFor="city">City</label>
                    <select 
                    name="city"
                    id="city" 
                    value={selectedCity}
                    onChange={handleSelectedCity}
                    >
                    <option value="0">Select a city</option>   
                    {cities.map(city => (
                        <option key={city.city}value={city.city}>{city.city}</option>
                    ))}                  
                    </select> 
                </div>
                
                </div>

                <fieldset>
                    <legend>
                        <h3>Map</h3>
                        <span><FaMapMarkerAlt/>Select the adreess on the map</span>
                    </legend>
                </fieldset>

                <Map center={initialPosition} zoom={15} onClick={handleMapClick}>
                <TileLayer
                attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={selectedPostion}/>
                </Map>

                <fieldset>
                    <legend>
                        <h2>Details</h2>
                        <span>Select one ore more</span>
                    </legend>

                    <ul className="characteristics-grid">
                        {characteristics.map(characteristic =>(
                            <li key={characteristic.id} onClick={() => handleSelectCharacteristics(characteristic.id)}
                            className={selectedCharacteristics.includes(characteristic.id) ? 'selected' : ''}>
                            <img src={characteristic.image_url} alt={characteristic.title}/>
                            <span>{characteristic.title}</span>
                        </li> 
                        ))}
                                               
                    </ul>


                </fieldset>

                <button type="submit">
                    Add court!
                </button>
                
            </form>
        </div>
    );
};

export default CreateCourt;