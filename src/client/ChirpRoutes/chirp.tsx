import React, { SFC } from "react";
import { Link } from "react-router-dom"
import $ from "jquery";
const Chirp: SFC<IChirpProps> = ({ chirpInfo }) => {

    return (
        <>
            <div className="border border-secondary">
            <Link to={`/chirp/mentions/${chirpInfo.name}`}>{chirpInfo.name}</Link>
            <h3>{chirpInfo.text}</h3>
            <Link className="btn btn-primary" to={`/chirp/${chirpInfo.id}/admin`} >edit</Link>
            </div>
        </>
            )
        }
interface IChirpProps {
                chirpInfo: {id: string, text: string, name:string } 
        };
        
        
export default Chirp;