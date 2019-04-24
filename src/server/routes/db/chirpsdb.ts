import { Query } from "./indexdb";

const all = async() => Query('SELECT c.id, c.text, u.name FROM chirps c JOIN users u ON c.userid=u.id order by c._created DESC');

const oneChirp = async (id:number) => Query(`SELECT * FROM chirps WHERE id =${id}`)

const addChirp = async(text:string) => Query(`INSERT INTO chirps(userid,text,location) VALUES(1,"${text}","Miami")`)

const deleteChirp = async(id:number)=>Query(`DELETE FROM chirps WHERE id=${id}`)

const updateChirp = async(id:number,text:string) => Query(`UPDATE chirps SET text ="${text}" WHERE id =${id}`)

export default {
    updateChirp,
    oneChirp,
    deleteChirp,
    all,
    addChirp
}