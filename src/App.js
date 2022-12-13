import Button from 'react-bootstrap/Button'
import { hethers } from '@hashgraph/hethers';

const provider = hethers.providers.getDefaultProvider('testnet');
const signerId = "0.0.48939753"
const signerKey ="E47ab8a2ef52dfc010dc74a61dd89b3e0f44ecde60ac949c5e032b09f35ffc6a"
const aliceId = "0.0.49070890"
const eoaAccount = {account: signerId,privateKey: `0x${signerKey}`, };
const wallet = new hethers.Wallet(eoaAccount, provider);
      
      const Address = "0000000000000000000000000000000002ece013";
      const ABI = [
        {
            "inputs": [],
            "name": "getval",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "_nval",
                    "type": "uint256"
                }
            ],
            "name": "setval",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        }
    ]


const App = () => {
 
   const connectContract = async ()=>{
    const contract =  new hethers.Contract( Address , ABI , provider )
		let contractSinger = contract.connect(wallet)
    console.log("The Smartcontract connected successfully",contractSinger)
    console.log("The Address of smartcontract is",contractSinger._address)
    console.log("The Signer of smartcontract is",contractSinger.signer)
		
    console.log("___________________READING THE SMART CONTRACT FUNCTIONS__________________________")



   }
  
   const readContract = async ()=>{
    const contract =  new hethers.Contract( Address , ABI , provider )
		let contractSinger = contract.connect(wallet)
    const getvalue = await contractSinger.getval({gasLimit: 500000})
    console.log("function calling",hethers.utils.formatHbar(parseInt(getvalue._hex).toString()))

   }

   const checkWallet = async ()=>{
    const balance = await wallet.getBalance();
    console.log("balance",hethers.utils.formatHbar(parseInt(balance._hex).toString()))
   }

   const writeContract = async ()=>{
    const contract =  new hethers.Contract( Address , ABI , provider )
		let contractSinger = contract.connect(wallet)
    const aliceAddress= hethers.utils.getAddressFromAccount(aliceId)
    console.log(aliceAddress)
    // const amount = hethers.utils.parseUnits('1');
    // console.log(amount)
    // const Amount= hethers.utils.formatHbar(parseInt(amount._hex).toString())
    // console.log(Amount)
    // const tx = await contractSinger.mint
    // const tx = await contractSinger.setval(aliceAddress,1,'0x',{gasLimit: 500000});
    const tx = await contractSinger.setval(1,{gasLimit: 500000});
    console.log(tx)

   }

  const connectWallet = async()=>{
    return(
      console.log("hello")
    )
  }


  return (

    <div>
          
          <Button variant="primary" onClick={connectContract}>Connect to contract</Button>{' '}{' '}{' '}
          <Button variant="secondary" onClick={readContract}>Read from contract</Button>{' '}
          <Button variant="primary" onClick={checkWallet }>Balance of wallet</Button>{' '}
          <Button variant="dark" onClick={writeContract}>Write to contract</Button>{' '}
          <Button variant="info" onClick={connectWallet}>Connect to Hashpack</Button>{' '}
          {/* <Button variant="primary">Primary</Button>{' '} */}
      {/* <Button variant="secondary">Secondary</Button>{' '}
      <Button variant="success">Success</Button>{' '}
      <Button variant="warning">Warning</Button>{' '}
      <Button variant="danger">Danger</Button>{' '}
      <Button variant="info">Info</Button>{' '}
      <Button variant="light">Light</Button>{' '}
      <Button variant="dark">Dark</Button>
      <Button variant="link">Link</Button> */}
    </div>
  )
}

export default App
