import React ,{SFC, useState, useEffect} from "react"
import {RouteComponentProps, Link} from "react-router-dom"
const Mentions: SFC<IMentionsProps> = (props) => {


    const [mentions,setMentions] = useState([])
useEffect(()=>{
    getMentions()
},[])

async function getMentions() {
    try {
        let res = await fetch(`/api/mentions/${props.match.params.name}`)
        let data = await res.json()
        setMentions(data)
    } catch (err) {
        (err: string) => console.log(err)
    }
}


return(
    <>
    <h1 className="text-center">{props.match.params.name}</h1>
    <p>Mentioned in:</p>
    {mentions.map((mention:{Mentioned:string,Mentioner:string,Chirp:string},i)=>{
        return (
            <div  key={i} className ="border border-secondary">
        <h3>{mention.Chirp} </h3>
        <p>By</p>
        <h3>{mention.Mentioner}</h3>
        </div>
            )
    })}
    </>
)
}

interface IMentionsProps extends RouteComponentProps<any>{

}
export default Mentions