import React, { SFC, Fragment, useState, useEffect } from 'react';
import { RouteComponentProps } from "react-router-dom"
import $ from "jquery"

const AddChirp: SFC<IEditChirpPROPS> = (props) => {

    const [chirpId, setChirpId] = useState(null);
    
    useEffect(() =>{
        console.log('hi')
        setMentions()
    },[chirpId])

    async function handleClick() {
        let chirp = {
            text: $('#chirpInput').val()
        }
        $.ajax({
            type: "POST",
            url: "/api/dbchirps/",
            data: JSON.stringify(chirp),
            contentType: 'application/json',
            success: function (res) {
                getChirpId()
            }
        })

    }
    async function getChirpId() {
        try {
            let res = await fetch('/api/dbchirps')
            let data = await res.json()
            setChirpId(data[0].id)
        } catch (err) {
            (err: string) => console.log(err)
        }

    }

    
        function setMentions() {
        let str: string = $('#chirpInput').val()
        if (/@[A-Za-z]+/gm.test(str)) {
            let mentionsArr: Array<string> = str.match(/@[A-Za-z]+/gm);
            for (let i = 0; i < mentionsArr.length; i++) {
                let tagged = mentionsArr[i].replace("@", "")
                let mention: { name: string, chirpId: string } = {
                    name: tagged,
                    chirpId: chirpId
                }
                $.ajax({
                    type: 'POST',
                    url: '/api/mentions/add',
                    data: JSON.stringify(mention),
                    contentType: 'application/json',
                    success: function (res) {
                        props.history.push("/")
                    }
                })
            }
        } else if(chirpId){
            props.history.push('/')
        }
    }


    return (
        <Fragment>
            <div>
                <input id={'chirpInput'} type="text" placeholder="Add Chirp..." />
            </div>
            <div>
                <button className="btn btn-primary" onClick={handleClick}>Add Chirp</button>
            </div>
        </Fragment>

    )
}

interface IEditChirpPROPS extends RouteComponentProps<any> {

}
export default AddChirp