import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
import multer from 'multer'
import ipfsClient from 'ipfs-http-client'
import fs from 'fs'

export const config = {
    api: {
      bodyParser: false,
    },
  }
  

const upload = multer({ dest: './public/upload/' })

async function uploadIPFS ( file ){

    if (!file) return {OK:false, err: " no file "}
    try {
        let i = ipfsClient()
        let buff = fs.readFileSync( file.path )
        //save to ipfs
        //const ipfs = await IPFS.create()
        const { cid } = await i.add( buff )
        //rename file
        //await fs.rename( file.path, 'upload/' + cid.string)
        console.info(cid)
        return {OK : true , CID : cid.string }
    } catch (ex) {
        return {OK: false , err : ex } 
    }
}

export default async function uploadAPI(req, res) {

    upload.single( 'upFile' )(req, {} ,err => {
        
        console.log( req.file )
        if ( !req.file ) return null 

        let answ = uploadIPFS( req.file )

        if ( answ.OK ) {
            base = prisma.NFT.create( {
                owner :       req.owner ,
                ipfs :        answ.CID ,
                name :        req.name,
                discription:    req.discription,
                pubkey :      null,
                account :     null 
            })
        }

        console.log ( answ )
        
    })

  }