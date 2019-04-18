import React, { useEffect, useState, SFC } from "react"
import Chirp from "./chirp";

const Home: SFC<IHomeProps> = () => {
    const [chirps, setChirps] = useState([]);

    useEffect(() => {
        getChirps()
    }, [])

    async function getChirps() {
        try {
            let res = await fetch('/api/chirps')
            let data = await res.json()
            placeChirps(data)
        } catch (err) {
            (err: string) => console.log(err)
        }
    }

    function placeChirps(chirps: { [key: number]: { name: string, text: string } }) {
        let stateArr = []
        for (let prop in chirps) {
            let chirpObj: { [key: number]: { name: string, text: string } } = {}
            if (prop != 'nextid') {
                chirpObj[prop] = chirps[prop]
                stateArr.push(chirpObj);
            }
        }
        setChirps(stateArr)
    }
    return (
        <>    
                {chirps.map(
                    (chirp: { [key: number]: { name: string, text: string } }, index: number) => {
                        return <Chirp key={index} chirpInfo={chirp} />
                    })}
        </>
    )
}

interface IHomeProps {

}

export default Home