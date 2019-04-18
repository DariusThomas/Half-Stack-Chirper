import React, { SFC,useState,useEffect} from 'react';
import { RouteComponentProps } from "react-router-dom"
import $ from 'jquery'
const EditChirp: SFC<IEditChirpPROPS> = (props: RouteComponentProps<{ id: string }>) => {
    const [chirp,setChirp]= useState("");

    useEffect(()=>{
        getChirp();
    },[])

    async function getChirp(){
        try{
            const res = await fetch(`/api/chirps/${props.match.params.id}`)
            const data = await res.json()
             setChirp(data.text)
             
        } catch(err) {
            console.log(err)
        }
            
    }
    function deleteChirp() {
        $.ajax({
            type: 'DELETE',
            url: `/api/chirps/${props.match.params.id}`,
            success: function () {
                props.history.push("/")

            }
        })
    }
function editChirp(){
    let chirpEdit = {
        name: "me",
        text: $(`#chirp-${props.match.params.id}`).val()
    }
    $.ajax({
        type: "PUT",
        url: `/api/chirps/${props.match.params.id}`,
        data: JSON.stringify(chirpEdit),
        contentType: 'application/json',
        success: function () {
            props.history.push("/")
        }
    })
}
function handleChange(){
    setChirp($(`#chirp-${props.match.params.id}`).val())
}
    return (
        <React.Fragment>
                <div>

                    <input id={`chirp-${props.match.params.id}`} onChange={handleChange}  value ={chirp} type="text" />
                </div>
                <div>
                    <button className="btn btn-primary" onClick={editChirp}>Submit Edit</button>
                    <button className="btn btn-danger" onClick={deleteChirp} >Delete Chirp</button>
                </div>
        </React.Fragment>
    )
}

interface IEditChirpPROPS extends RouteComponentProps<{ id: string }> {

}
export default EditChirp