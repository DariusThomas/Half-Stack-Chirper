import React, { SFC } from 'react';
import { RouteComponentProps } from "react-router-dom"
import $ from 'jquery'
const EditChirp: SFC<IEditChirpPROPS> = (props: RouteComponentProps<{ id: string }>) => {

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

    return (
        <React.Fragment>
                <div>
                    <input id={`chirp-${props.match.params.id}`} type="text" />
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