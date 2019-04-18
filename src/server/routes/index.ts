import * as express from "express";
import chirpsApi from "./chirps";
let router = express.Router();


router.use('/chirps',chirpsApi);

export default router