import React,{SFC,Fragment} from 'react';
import { RouteComponentProps, Redirect} from "react-router-dom"
import $ from "jquery"
const AddChirp: SFC<IEditChirpPROPS> = (props:RouteComponentProps<{id:string}>) =>{
    function handleClick() {
        let chirp = {
            name: "me",
            text: $(`#chirp-${props.match.params.id}`).val()
        }
        $.ajax({
            type: "POST",
            url: "/api/chirps/",
            data: JSON.stringify(chirp),
            contentType: 'application/json',
            success: function (res) {
               props.history.push("/")
            }
        })
    }
return(
    <Fragment> 
        <div>
    <input id={`chirp-${props.match.params.id}`}type="text" placeholder="Add Chirp..." />
    </div>
    <div>
        <button className="btn btn-primary" onClick={handleClick}>Add Chirp</button>
    </div>
    </Fragment>
   
)
}

interface IEditChirpPROPS extends RouteComponentProps<{id:string}>{

}
export default AddChirp