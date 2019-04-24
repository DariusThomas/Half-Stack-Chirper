import React, { useEffect, useState, SFC } from "react"
import Chirp from "./chirp";

const Home: SFC<IHomeProps> = () => {
    const [chirps, setChirps] = useState([]);

    useEffect(() => {
        getChirps()
    }, [])

    async function getChirps() {
        try {
            let res = await fetch('/api/dbchirps')
            let data = await res.json()
            setChirps(data)
        } catch (err) {
            (err: string) => console.log(err)
        }
    }

    return (
        <>    
                {chirps.map(
                    (chirp: { id: string, text: string, name:string  }) => {
                        return <Chirp key={chirp.id} chirpInfo={chirp} />
                    })}
        </>
    )
}

interface IHomeProps {

}

export default Home