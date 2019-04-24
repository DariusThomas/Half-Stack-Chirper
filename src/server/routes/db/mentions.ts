import { Query } from "./indexdb"

const getMentions = async (name: string) => Query(`
SELECT
u.name as Mentioned,
c.text as Chirp,
u2.name as Mentioner
FROM mentions m
JOIN users u ON m.userid=u.id
Join chirps c ON m.chirpid = c.id 
Join users u2 ON u2.id = c.userid
AND u.name = "${name}"
`)

const addMentions = async(userId:string, chirpId:string)=>Query(`
INSERT INTO mentions (userid, chirpid)
VALUES(${userId},${chirpId})
`)

const nameToId = async (name:string) =>Query(`
SELECT
u.name,
u.id
FROM users u
WHERE name like "%${name}"
`)

const resetMentions = async (id:string|number)=>Query(`
DELETE
FROM mentions
WHERE chirpid = ${id}`)

export default {
    resetMentions,
    nameToId,
    addMentions,
    getMentions
}