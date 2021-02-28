import {
    Account,
    AccountInfo,
    Commitment,
    Connection,
    PublicKey,
    RpcResponseAndContext,
    SimulatedTransactionResponse,
    SystemProgram,
    Transaction,
    TransactionSignature,
  } from '@solana/web3.js';
import BN from 'bn.js';
import {
    DexInstructions,
    Market,
    OpenOrders,
    TOKEN_MINTS,
    TokenInstructions,
} from '@project-serum/serum';
import Wallet from '@project-serum/sol-wallet-adapter';


// list market on Serum
export async function listMarket({
    connection,
    wallet,
    baseMint,
    quoteMint = "",
    baseLotSize = 1,
    quoteLotSize = 0.0001,
    dexProgramId = "9MVDeYQnJmN2Dt7H44Z8cob4bET2ysdNu2uFJcatDJno",
  }) {
    const market = new Account();
    const requestQueue = new Account();
    const eventQueue = new Account();
    const bids = new Account();
    const asks = new Account();
    const baseVault = new Account();
    const quoteVault = new Account();
    const feeRateBps = 0;
    const quoteDustThreshold = new BN(100);
  
    async function getVaultOwnerAndNonce() {
      const nonce = new BN(0);
      while (true) {
        try {
          const vaultOwner = await PublicKey.createProgramAddress(
            [market.publicKey.toBuffer(), nonce.toArrayLike(Buffer, 'le', 8)],
            dexProgramId,
          );
          return [vaultOwner, nonce];
        } catch (e) {
          nonce.iaddn(1);
        }
      }
    }
    const [vaultOwner, vaultSignerNonce] = await getVaultOwnerAndNonce();
  
    const tx1 = new Transaction();
    tx1.add(
      SystemProgram.createAccount({
        fromPubkey: wallet.publicKey,
        newAccountPubkey: baseVault.publicKey,
        lamports: await connection.getMinimumBalanceForRentExemption(165),
        space: 165,
        programId: TokenInstructions.TOKEN_PROGRAM_ID,
      }),
      SystemProgram.createAccount({
        fromPubkey: wallet.publicKey,
        newAccountPubkey: quoteVault.publicKey,
        lamports: await connection.getMinimumBalanceForRentExemption(165),
        space: 165,
        programId: TokenInstructions.TOKEN_PROGRAM_ID,
      }),
      TokenInstructions.initializeAccount({
        account: baseVault.publicKey,
        mint: baseMint,
        owner: vaultOwner,
      }),
      TokenInstructions.initializeAccount({
        account: quoteVault.publicKey,
        mint: quoteMint,
        owner: vaultOwner,
      }),
    );
  
    const tx2 = new Transaction();
    tx2.add(
      SystemProgram.createAccount({
        fromPubkey: wallet.publicKey,
        newAccountPubkey: market.publicKey,
        lamports: await connection.getMinimumBalanceForRentExemption(
          Market.getLayout(dexProgramId).span,
        ),
        space: Market.getLayout(dexProgramId).span,
        programId: dexProgramId,
      }),
      SystemProgram.createAccount({
        fromPubkey: wallet.publicKey,
        newAccountPubkey: requestQueue.publicKey,
        lamports: await connection.getMinimumBalanceForRentExemption(5120 + 12),
        space: 5120 + 12,
        programId: dexProgramId,
      }),
      SystemProgram.createAccount({
        fromPubkey: wallet.publicKey,
        newAccountPubkey: eventQueue.publicKey,
        lamports: await connection.getMinimumBalanceForRentExemption(262144 + 12),
        space: 262144 + 12,
        programId: dexProgramId,
      }),
      SystemProgram.createAccount({
        fromPubkey: wallet.publicKey,
        newAccountPubkey: bids.publicKey,
        lamports: await connection.getMinimumBalanceForRentExemption(65536 + 12),
        space: 65536 + 12,
        programId: dexProgramId,
      }),
      SystemProgram.createAccount({
        fromPubkey: wallet.publicKey,
        newAccountPubkey: asks.publicKey,
        lamports: await connection.getMinimumBalanceForRentExemption(65536 + 12),
        space: 65536 + 12,
        programId: dexProgramId,
      }),
      DexInstructions.initializeMarket({
        market: market.publicKey,
        requestQueue: requestQueue.publicKey,
        eventQueue: eventQueue.publicKey,
        bids: bids.publicKey,
        asks: asks.publicKey,
        baseVault: baseVault.publicKey,
        quoteVault: quoteVault.publicKey,
        baseMint,
        quoteMint,
        baseLotSize: new BN(baseLotSize),
        quoteLotSize: new BN(quoteLotSize),
        feeRateBps,
        vaultSignerNonce,
        quoteDustThreshold,
        programId: dexProgramId,
      }),
    );
  
    const signedTransactions = await signTransactions({
      transactionsAndSigners: [
        { transaction: tx1, signers: [baseVault, quoteVault] },
        {
          transaction: tx2,
          signers: [market, requestQueue, eventQueue, bids, asks],
        },
      ],
      wallet,
      connection,
    });
    for (let signedTransaction of signedTransactions) {
      await sendSignedTransaction({
        signedTransaction,
        connection,
      });
    }
  
    return market.publicKey;
  }