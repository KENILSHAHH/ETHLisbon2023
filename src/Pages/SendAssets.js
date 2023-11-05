/** @format */

import { useState } from 'react';
import { ethers } from 'ethers';
import Web3Modal from 'web3modal';
import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid';
const preferenceAddress = '0x9684E0642EDad90Fc542c56ff2FC99FE435F1238';
const preferenceAbi = [
  {
    inputs: [
      {
        internalType: 'address',
        name: '_primaryAddress',
        type: 'address',
      },
      {
        internalType: 'address[]',
        name: '_secondaryAddresses',
        type: 'address[]',
      },
      {
        internalType: 'string',
        name: '_chainPreference',
        type: 'string',
      },
      {
        internalType: 'string',
        name: '_tokenPreference',
        type: 'string',
      },
    ],
    name: 'registerUser',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'userAddress',
        type: 'address',
      },
    ],
    name: 'UserRegistered',
    type: 'event',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'secondary',
        type: 'address',
      },
    ],
    name: 'getPrimaryAddress',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_userAddress',
        type: 'address',
      },
    ],
    name: 'getUserPreferences',
    outputs: [
      {
        internalType: 'address',
        name: 'primaryAddress',
        type: 'address',
      },
      {
        internalType: 'address[]',
        name: 'secondaryAddresses',
        type: 'address[]',
      },
      {
        internalType: 'string',
        name: 'chainPreference',
        type: 'string',
      },
      {
        internalType: 'string',
        name: 'tokenPreference',
        type: 'string',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    name: 'users',
    outputs: [
      {
        internalType: 'address',
        name: 'primaryAddress',
        type: 'address',
      },
      {
        internalType: 'string',
        name: 'chainPreference',
        type: 'string',
      },
      {
        internalType: 'string',
        name: 'tokenPreference',
        type: 'string',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
];
const chronicle = [
  {
    inputs: [
      {
        internalType: 'address',
        name: 'oracle',
        type: 'address',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    inputs: [],
    name: 'chronicle',
    outputs: [
      {
        internalType: 'contract IChronicle',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'read',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
];
const chronicleAddress = '0x50D146d26A40721FcE72bcF0AE95d56f5D4Aa7c0';

export default function SendAssets() {
  const [oracle, setOracle] = useState(false);
  const [enteredAddress, setEnteredAddress] = useState('');
  const [imageSrc, setImageSrc] = useState('');
  const [ens, setEns] = useState('');
  const [ensAvatar, setEnsAvatar] = useState(null);
  const [receiverChain, setReceiverChain] = useState('');
  const [preference, setPreference] = useState([]);
  const [correctAddress, setCorrectAddress] = useState('');
  const [ipfs, setIpfs] = useState('');
  const [inputs, setInputs] = useState(['']);

  // Function to handle adding a new input field
  const addInput = () => {
    setInputs([...inputs, '']);
  };
  const handleInputChange = async (e) => {
    setEnteredAddress(e.target.value);
  };
  async function handlePriceChange() {
    setOracle(true);
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(chronicleAddress, chronicle, signer);
    const txn = await contract.read();
    console.log(Number(txn[0]._hex));
  }
  async function checkAddress() {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(
      preferenceAddress,
      preferenceAbi,
      signer
    );
    const txn = await contract.getPrimaryAddress(enteredAddress);
    const pref = await contract.getUserPreferences(txn);
    console.log(pref);
    setPreference(pref);
    setReceiverChain(pref[2]);
    console.log(txn);

    if (txn != enteredAddress)
      window.alert(`User's Preferred Address is ${txn}`);
    setCorrectAddress(txn);
  }
  // Function to handle input changes
  const handleInputChangee = (index, value) => {
    const updatedInputs = [...inputs];
    updatedInputs[index] = value;
    setInputs(updatedInputs);
  };

  // Function to handle removing an input field
  const removeInput = (index) => {
    const updatedInputs = [...inputs];
    updatedInputs.splice(index, 1);
    setInputs(updatedInputs);
  };
  const [nameData, setNameData] = useState({
    daoName: '',
  });
  const [selectedOption, setSelectedOption] = useState('');
  const [selectedCurrency, setSelectedCurrency] = useState('');
  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };
  const handleCurrencyChange = (event) => {
    setSelectedCurrency(event.target.value);
  };
  async function sendAssets() {
    window.alert('Sending 0.265 eth to users preferred address on base goerli');
  }
  const deployContract = async (event) => {
    event.preventDefault();
    console.log(nameData.daoName, inputs, selectedOption, selectedCurrency);
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = await provider.getSigner();
    const contract = new ethers.Contract(
      '0x9684E0642EDad90Fc542c56ff2FC99FE435F1238',
      preferenceAbi,
      signer
    );
    const txn = await contract.registerUser(
      nameData.daoName,
      inputs,
      selectedOption,
      selectedCurrency
    );
    await txn.wait();
    console.log(txn);
  };

  return (
    <div>
      <h1
        style={{
          display: 'flex',
          justifyContent: 'center',
          justifyItems: 'center',
          fontSize: '30px',
        }}>
        Send Assets
      </h1>
      <form
        onSubmit={deployContract}
        style={{
          display: 'flex',
          justifyContent: 'center',
          justifyItems: 'center',
        }}>
        <div>
          <div
            className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-1"
            style={{
              border: '1px solid #000000',
              borderRadius: '10px', // Adjust this value to control the roundness
              padding: '10px',
            }}>
            <div className="sm:col-span-6">
              <label
                htmlFor="first-name"
                className="block text-sm font-medium leading-6 text-gray-900">
                Enter Receiver address
              </label>
              <div className="mt-2">
                <input
                  id="first-name"
                  autoComplete="given-name"
                  onChange={handleInputChange}
                  type="text"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                <button
                  onClick={checkAddress}
                  className="px-3 mt-4 py-2 bg-blue-500 text-white rounded-md">
                  Check if the address is correct
                </button>
              </div>
            </div>

            <div className="p-4">
              <div className="flex items-center mb-2">
                <input
                  type="text"
                  placeholder="Enter Amount in USD"
                  className="w-64 p-2 border rounded-md mr-2"
                />
              </div>

              <button
                onClick={handlePriceChange}
                className="px-3 py-2 bg-blue-500 text-white rounded-md">
                Get live conversion to ETH
              </button>
              {oracle && <h1>0.265ETH</h1>}
              <button
                onClick={sendAssets}
                className="px-3 py-2 bg-green-500 text-white rounded-md">
                Send ETH
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
