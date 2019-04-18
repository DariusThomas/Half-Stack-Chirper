import React,{SFC} from "react";
import { Link } from "react-router-dom"

const Chirp: SFC<IChirpProps> = ({ chirpInfo }) => {

    let keyNum: number = parseInt(Object.keys(chirpInfo)[0], 10)
 
    return (
        <>
            <h1>{chirpInfo[keyNum].text}</h1>
            <Link className="btn btn-primary" to={`/chirp/${keyNum}/admin`} >edit</Link>
        </>
    )
}
interface IChirpProps {
    chirpInfo: { [key: number]: { name: string, text: string } }
};


export default Chirp;