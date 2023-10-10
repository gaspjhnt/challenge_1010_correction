import React from "react";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import TypePokemon from "./TypePokemon";
import Card from 'react-bootstrap/Card';
import "../style/MesPokemons.css"
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const MesPokemons=()=>{
    const [pokeData,setPokeData]=useState([]);
    const [Chargement,setChargement]=useState(true);
    const [url,setUrl]=useState("http://localhost:8000/api/pokemon/0/10")
    const [nextUrl,setNextUrl]=useState();
    const [previousUrl,setPreviousUrl]= useState()

    useEffect(()=>{
        getAllPokemon();
    },[url])

    const getAllPokemon=async()=>{
        setChargement(false)
        const res=await axios.get(url);
        console.log("ok get all pokemon")
        setPreviousUrl("http://localhost:8000" + res.data.previous)
        setNextUrl("http://localhost:8000" + res.data.next)
        getPokemon(res.data.data)
        setChargement(false)
    }

    const getPokemon=async(res)=>{
       res.map(async(item)=>{
          const result=await axios.get(item.url)
          console.log(result.data)
          setPokeData(state=>{
              state=[...state,result.data]
              state.sort((a,b)=>a.id>b.id?1:-1)
              return state;
          })
       })   
    }

    const ajout = async(e)=>{
        e.preventDefault()
        if(localStorage.getItem('MonPokedex')==null){
            localStorage.setItem('MonPokedex', JSON.stringify([]))
        }
        let res = await axios.get("https://pokeapi.co/api/v2/pokemon/"+e.target[0].value)
        let test = JSON.parse(localStorage.getItem('MonPokedex'))
        test.push(res.data)
        localStorage.setItem('MonPokedex', JSON.stringify(test))
        
}




    return (
        <>
        {
            Chargement ? <h1>Chargement</h1> :
            <div className="container espacement">
                <div className="row">


            {pokeData.map((item) => {
                    return (     
                        <div className="col-lg-3 col-sm-6">                 
                            <div key={item.id}>
                                <Card className="decalage">
                                    <Card.Img variant="top" src={item.sprites.front_default} />
                                    <Card.Body>
                                        <Card.Title>{item.name}</Card.Title>
                                        <Card.Text>
                                        <p>n°{item.id}</p>
                                        <TypePokemon types={item.types}/>
                                        <Form className="espacement" onSubmit={ajout}>
                                            <Button variant="outline-primary" type="submit" value={item.id}>
                                                Ajouter au pokédex
                                            </Button>
                                        </Form>
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                                </div> 
                            </div>
                    )
                })}
                </div>
                <div className="row">
                <div className="col-6">
                { previousUrl && <button className="long" onClick={()=>{
                            setPokeData([]) 
                            setUrl(previousUrl)
                        }}>Précédent</button>}
                        </div>
                    <div className="col-6">
                { nextUrl && <button className="long" onClick={()=>{
                            setPokeData([]) 
                            setUrl(nextUrl)
                        }}>Suivant</button>}
                        </div>
                </div>
            </div>
        }
        <div>
                       

                    </div>
        </>
    )
}
export default MesPokemons;