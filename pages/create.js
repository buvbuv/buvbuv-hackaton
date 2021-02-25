import React from 'react'

export default function CreateForm() {

    let tokenName = ""
    let description = ""
    let authority = ""
    let freezeAuth = ""

    return (
        <>
        <form>

        <div className="w-2/3 mx-auto flex flex-col justify-items-center rounded-2xl my-10  text-gray-600 overflow-hidden bg-gradient-to-r from-purple-300  to-gray-200" >

            <div className="bg-gray-200 h-14 mb-6 font-bold text-3xl text-gray-400 px-14 pt-5 overflow-hidden bg-gradient-to-r from-gray-100  to-red-200" >
                STEP 1
                <span className="text-gray-400 text-sm font-light">
                    describe your asset and upload file to IPFS
                </span>
            </div>

            <div className="h-10 flex mb-5">

                <label htmlFor="name" className="w-40 gray-00 px-4 self-end text-right focus:font-bold uppercase"> 
                name 
                </label>
                <input name="name" type="text" className= "px-4  flex-auto border-b-2 mr-5  bg-transparent focus:border-gray-700 focus:border-b-4"
                placeholder="give your asset a short name" 
                value={ tokenName }/>


            </div>
            
            <div className="my-2 flex mb-5">

                <label className="w-40 gray-00 px-4 text-right font-thin uppercase"> 
                description 
                </label>
                <textarea className= "px-4 flex-auto border-b-2 mr-5 h-32 bg-transparent bg-opacity-50"
                placeholder="write a nice description. Tell us a story"
                value={ description } /> 

            </div>

            

            <div className="h-10 my-5 flex">

                <label className="w-40 gray-00 px-4 self-end text-right font-thin uppercase"> 
                file 
                </label>
                <input type="file" className= "px-4  flex-auto border-b-2 mr-5" /> 

            </div>

            <div className="h-10 my-2 flex self-end my-6">

                <button type="submit" className= "w-48 px-4 border-b-2 mr-5 bg-gray-300 rounded"> upload </button>

            </div>

        </div>
        </form>


        <form>
        <div className="w-2/3 mx-auto flex flex-col justify-items-center rounded-2xl my-10  text-gray-600 overflow-hidden bg-gradient-to-r from-purple-300  to-gray-200" >


            <div className="bg-gray-200 h-14 mb-6 font-bold text-3xl text-gray-400 px-14 pt-5 overflow-hidden bg-gradient-to-r from-gray-100  to-red-200">
                STEP 2
                <span className="text-gray-400 text-sm font-light">
                    lets mint a SPL token for your asset
                </span>
            </div>

            <div className="h-10 flex mb-5">

                <label htmlFor="name" className="w-40 gray-00 px-4 self-end text-right focus:font-bold uppercase"> 
                    authority 
                </label>
                <input name="name" type="text" className= "px-4 flex-auto border-b-2 mr-5  bg-transparent focus:border-gray-700 focus:border-b-4"
                placeholder="authority account"
                value={authority} />


            </div>

            <div className="my-2 flex mb-5">

                <label className="w-40 gray-00 px-4 self-end text-right font-thin uppercase"> 
                    freeze authority 
                </label>
                <input type="text" className= "px-4 flex-auto border-b-2 mr-5  bg-transparent focus:border-gray-700 focus:border-b-4"
                placeholder="freeze account"
                value={freezeAuth} /> 

            </div>



            <div className="h-10 my-2 flex self-end my-6">

                <button type="submit" className= "w-48 px-4 border-b-2 mr-5 bg-gray-300 rounded"> mint </button>

            </div>

      
        </div>
        </form>
        </>
    )
}
