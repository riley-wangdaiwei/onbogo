import { BrowserProvider, Contract, parseUnits } from 'ethers';
import OnbogoTokenABI from '../../abis/OnbogoToken.json';

const contractAddress = '0x3247988647a331B68Ae86426F56CF56E9A2fbA1F';

export async function mintTokenAfterVote(to: string) {
  try {
    if (!window.ethereum) {
      throw new Error('MetaMask is not installed');
    }

    // Request wallet connection
    await window.ethereum.request({ method: 'eth_requestAccounts' });

    // Connect to provider and signer using BrowserProvider
    const provider = new BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();

    // Instantiate the contract
    const contract = new Contract(contractAddress, OnbogoTokenABI, signer);

    // Mint 1 token (ERC20 standard usually has 18 decimals)
    const amount = parseUnits('1', 18);

    const tx = await contract.mint(to, amount);
    console.log('Transaction sent:', tx.hash);

    const receipt = await tx.wait();
    console.log('Transaction confirmed:', receipt.transactionHash);

    return receipt;
  } catch (error: any) {
    console.error('Minting failed:', error.message || error);
    throw error;
  }
}

