'use client';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useEffect } from 'react';
import { useReadContract } from 'wagmi';

// 1. Definisikan interface TokenInfo dan tipe return
interface TokenInfo {
    name: string;
    symbol: string;
    totalSupply: bigint;
    owner: string;
    createdAt: bigint;
    iconUrl: string;
    description: string;
    behaviour: string;
    openPrice: bigint;
    highPrice: bigint;
    lowPrice: bigint;
    closePrice: bigint;
}

type GetAllIssueReturn = [
    TokenInfo[],  // array of TokenInfo
    string[],     // array of addresses
    bigint[]      // array of uint256 IDs
];

// 2. ABI
const contractABI = [
    {
        "inputs": [],
        "name": "getAllIssue",
        "outputs": [
            {
                "components": [
                    { "internalType": "string", "name": "name", "type": "string" },
                    { "internalType": "string", "name": "symbol", "type": "string" },
                    { "internalType": "uint256", "name": "totalSupply", "type": "uint256" },
                    { "internalType": "address", "name": "owner", "type": "address" },
                    { "internalType": "uint256", "name": "createdAt", "type": "uint256" },
                    { "internalType": "string", "name": "iconUrl", "type": "string" },
                    { "internalType": "string", "name": "description", "type": "string" },
                    { "internalType": "string", "name": "behaviour", "type": "string" },
                    { "internalType": "uint256", "name": "openPrice", "type": "uint256" },
                    { "internalType": "uint256", "name": "highPrice", "type": "uint256" },
                    { "internalType": "uint256", "name": "lowPrice", "type": "uint256" },
                    { "internalType": "uint256", "name": "closePrice", "type": "uint256" }
                ],
                "internalType": "struct FactoryExchange.TokenInfo[]",
                "name": "",
                "type": "tuple[]"
            },
            {
                "internalType": "address[]",
                "name": "",
                "type": "address[]"
            },
            {
                "internalType": "uint256[]",
                "name": "",
                "type": "uint256[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }
];

// 3. Alamat kontrak
const contractAddress = '0xCd40A9ce16C3c90d441ae47b7DC96Fb6CdB9d892';

export default function AgentList() {
    // 4. Gunakan generic agar data bertipe GetAllIssueReturn
    const { data, isError, isLoading, error } = useReadContract<GetAllIssueReturn>({
        address: contractAddress,
        abi: contractABI,
        functionName: 'getAllIssue',
    });

    // Logging
    useEffect(() => {
        console.log('Fetched data:', data);
        if (error) {
            console.error('Error detail:', error);
        }
    }, [data, error]);

    return (
        <div style={{ padding: '2rem' }}>
            {/* <ConnectButton /> */}
            <h1>Data Token</h1>

            {isLoading && <p>Loading...</p>}

            {isError && (
                <p style={{ color: 'red' }}>
                    Error saat mengambil data: {error ? error.message : 'Unknown error'}
                </p>
            )}

            {/* 5. Render data jika ada */}
            {data ? (
                <div>
                    <h2>Daftar Token</h2>
                    <ul>
                        {data[0].map((token, index) => {
                            // Gunakan Number(...) atau String(...) untuk menampilkan
                            const createdAtSec = Number(token.createdAt); // bigint -> number
                            const createdDate = new Date(createdAtSec * 1000).toLocaleString();
                            const totalSupplyStr = String(token.totalSupply);

                            return (
                                <li
                                    key={index}
                                    style={{
                                        marginBottom: '1rem',
                                        border: '1px solid #ccc',
                                        padding: '1rem',
                                        borderRadius: '8px',
                                    }}
                                >
                                    <p><strong>ID:</strong> {String(data[2][index])}</p>
                                    <p><strong>Nama:</strong> {token.name}</p>
                                    <p><strong>Simbol:</strong> {token.symbol}</p>
                                    <p><strong>Total Supply:</strong> {totalSupplyStr}</p>
                                    <p><strong>Owner:</strong> {token.owner}</p>
                                    <p><strong>Dibuat:</strong> {createdDate}</p>
                                    <p><strong>Icon URL:</strong> {token.iconUrl}</p>
                                    <p><strong>Deskripsi:</strong> {token.description}</p>
                                    <p><strong>Behaviour:</strong> {token.behaviour}</p>
                                    <p><strong>Open Price:</strong> {String(token.openPrice)}</p>
                                    <p><strong>High Price:</strong> {String(token.highPrice)}</p>
                                    <p><strong>Low Price:</strong> {String(token.lowPrice)}</p>
                                    <p><strong>Close Price:</strong> {String(token.closePrice)}</p>
                                    <p><strong>Token Address:</strong> {data[1][index]}</p>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            ) : (
                <p>Data belum tersedia.</p>
            )}
        </div>
    );
}
