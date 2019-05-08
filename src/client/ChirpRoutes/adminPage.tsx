import React, { SFC, useState, useEffect } from 'react';
import { RouteComponentProps } from "react-router-dom"
import $ from 'jquery'
const EditChirp: SFC<IEditChirpPROPS> = (props) => {

    const [chirp, setChirp] = useState("");

    useEffect(() => {
        getChirp();
    }, [])

    async function getChirp() {
        try {
            const res = await fetch(`/api/dbchirps/${props.match.params.id}`)
            const data = await res.json()
            setChirp(data[0].text)
        } catch (err) {
            console.log(err)
        }

    }
    function deleteChirp() {
        $.ajax({
            type: 'DELETE',
            url: `/api/dbchirps/${props.match.params.id}`,
            success: function () {
                props.history.push("/")
            }
        })

    }
    function editChirp() {
        let chirpEdit = {
            text: $(`#chirp-${props.match.params.id}`).val()
        }
        $.ajax({
            type: "PUT",
            url: `/api/dbchirps/${props.match.params.id}`,
            data: JSON.stringify(chirpEdit),
            contentType: 'application/json',
            success: function () {
               setMention()
            }
        })
    }

    function setMention() {
        let str:any = $(`#chirp-${props.match.params.id}`).val()
        if (/@[A-Za-z]+/gm.test(str)) {
            let mentionsArr: Array<string> = str.match(/@[A-Za-z]+/gm);
            for (let i = 0; i < mentionsArr.length; i++) {
                let tagged = mentionsArr[i].replace("@", "")
                let mention: { name: string, chirpId: string } = {
                    name: tagged,
                    chirpId: props.match.params.id
                }
                $.ajax({
                    type: 'POST',
                    url: '/api/mentions/add',
                    data: JSON.stringify(mention),
                    contentType: 'application/json',
                    success: function(res){
                        props.history.push('/')
                    }
                })
            }
        }
    }


    function handleChange(e:any) {
        setChirp(e.target.value)
    }
    return (
        <React.Fragment>
            <div>

                <input id={`chirp-${props.match.params.id}`} onChange={handleChange} value={chirp} type="text" />
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