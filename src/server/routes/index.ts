import * as express from "express";
import db from "./db/indexdb"
let router = express.Router();


router.get('/dbchirps', async (req,res)=>{
try{
 res.json(await db.chirps.all())
}catch(e){
    console.log(e)
    res.sendStatus(500)
}
})
router.get('/mentions/:name', async(req,res)=>{
    let name:string = req.params.name
    try{
        res.json(await db.mentions.getMentions(name))
    } catch (e){
        console.log(e);
        res.send(500)
    }
})

router.get('/dbchirps/:id', async (req,res)=>{
    try{
     res.json(await db.chirps.oneChirp(req.params.id))
    }catch(e){
        console.log(e)
        res.sendStatus(500)
    }
})

router.post('/dbchirps', async (req,res)=>{
    try{
        await db.chirps.addChirp(req.body.text)
        res.sendStatus(200)
       }catch(e){
           console.log(e)
           res.sendStatus(500)
       }
})

router.delete('/dbchirps/:id', async (req,res)=>{
    try{
            await db.chirps.deleteChirp(req.params.id)
            res.sendStatus(200)
    }catch(e){
        console.log(e);
        res.sendStatus(500)
    }
})

router.put('/dbchirps/:id', async (req,res)=>{
    try{ 
        let id:number =req.params.id;
        let text:string =req.body.text
        await db.chirps.updateChirp(id,text)
        res.sendStatus(200)
    }catch (e){
        console.log(e)
        res.sendStatus(500)
    }
})
 router.post('/mentions/add', async (req,res)=>{
     let chirpId=req.body.chirpId;
     let name = req.body.name;
     try{
         await db.mentions.resetMentions(chirpId)
        let userInfo :Array<{id:string}> = await db.mentions.nameToId(name)
        if(userInfo!){res.sendStatus(200)}
            let userId = userInfo[0].id;
        await db.mentions.addMentions(userId,chirpId)
        res.sendStatus(200)
     } catch(e){
         console.log(e)
         res.sendStatus(500)
     }
 })

 router.post("/mentions/update",async (req,res)=>{

 })

export default router