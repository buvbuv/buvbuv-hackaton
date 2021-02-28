import * as SPL from '@solana/spl-token'
import * as web3 from '@solana/web3.js'


export async function mintToken( conn, acc ) {

    /*
    let mint = await
    SPL.Token.createMint( 
        conn,
        acc,
        acc.publicKey,
        acc.publicKey,
        0,
        SPL.TOKEN_PROGRAM_ID
    )*/

    const prgID = new web3.PublicKey('TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA')

    const mintAccount = new web3.Account();

    const token = new SPL.Token(
      conn,
      mintAccount.publicKey,
      SPL.TOKEN_PROGRAM_ID,
      acc,
    );

    const balanceNeeded = await SPL.Token.getMinBalanceRentForExemptMint(
        conn,
      );
  
    const transaction = new web3.Transaction();
 
    // 1. create mint account ( master token account )
    transaction.add(
    web3.SystemProgram.createAccount({
        fromPubkey: acc.publicKey,
        newAccountPubkey: mintAccount.publicKey,
        lamports: await conn.getMinimumBalanceForRentExemption(
            SPL.MintLayout.span,
          ),
        space: SPL.MintLayout.span,
        programId: prgID
    }),
    )

    //2. initialize mint 
    transaction.add ( 
    SPL.Token.createInitMintInstruction (
        SPL.TOKEN_PROGRAM_ID,
        mintAccount.publicKey,
        0,
        acc.publicKey,
        acc.publicKey
        )
    )

    //3. create and init account to where we will mint
    let nftAccount = new web3.Account()
    transaction.add(
        web3.SystemProgram.createAccount({
            fromPubkey: acc.publicKey,
            newAccountPubkey: nftAccount.publicKey,
            lamports: await conn.getMinimumBalanceForRentExemption(
                SPL.AccountLayout.span,
              ),
            space: SPL.AccountLayout.span,
            programId: prgID
        }),
        )

    transaction.add(
        SPL.Token.createInitAccountInstruction(
            prgID,
            mintAccount.publicKey,
            nftAccount.publicKey,
            acc.publicKey
        )
    )

    //4. mint to the account
    transaction.add(
        SPL.Token.createMintToInstruction(
            prgID,
            mintAccount.publicKey,
            nftAccount.publicKey,
            acc.publicKey,
            [],
            1
        )
    )

    //5. disable minting

    transaction.recentBlockhash = (await conn.getRecentBlockhash("max")).blockhash
    
    transaction.setSigners( acc.publicKey )
    transaction.partialSign( mintAccount )
    transaction.partialSign( nftAccount ) //does not have to be a signer?

    transaction.feePayer = acc.publicKey

    let signed = await acc.signTransaction(transaction)

    let txid = await conn.sendRawTransaction( signed.serialize() , {
        skipPreflight: false,
        commitment: 'recent',
        preflightCommitment: 'recent',
    })

    let confirm = conn.confirmTransaction( txid , 'recent' )

    console.log ( "txid: " + txid)
    console.log ( confirm )

    console.log( token )
  
    return {
        mint : mintAccount.publicKey,
        nft : nftAccount.publicKey,
        token : token
    }
}