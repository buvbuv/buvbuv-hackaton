import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
import multer from 'multer'
import createClient from 'ipfs-http-client'

const upload = multer({ dest: './public/upload/' })

function uploadIPFS ( file ){

    if (!file) return {OK:false}
    try {
        let i = createClient()
        let buff = fs.readFileSync( file.path )
        //save to ipfs
        //const ipfs = await IPFS.create()
        const { cid } = await i.add( buff )
        //rename file
        //await fs.rename( file.path, 'upload/' + cid.string)
        console.info(cid)
        return {OK : true , CID : cid.string }
    } catch {
        return {OK: false }
    }
}

export default function uploadAPI(req, res) {

    let answ = {}

    upload.single( 'upFile')( req, {} ,err  => {

        answ = uploadIPFS( upFile )
        if ( answ.OK ) {
            prisma.NFT.create( {
                owner :       req.owner ,
                ipfs :        answ.CID ,
                name :        req.name,
                discription:    req.discription,
                pubkey :      null,
                account :     null 
            })
        }
        
    })

    const result = await prisma.NFT.findUnique({
        where: {
          ipfs: answ.CID,
        },
      })

    res.status(200).json( result )
  }