import '@oasisprotocol/sapphire-hardhat';
import "@nomicfoundation/hardhat-toolbox";
import { HardhatUserConfig, task } from 'hardhat/config';
const accounts = ["0x64f6225079a4d12e11aba350b43643e64972bd90eb2f1e58379a563bbd58770a"];

task('deploy-enclave')
  .addParam('hostNetwork')
  .setAction(async (args, hre) => {
    await hre.run('compile');
    const ethers = hre.ethers;
    const EnclaveV1 = await ethers.getContractFactory('EnclaveV1');
    const signer = await ethers.provider.getSigner();
    const signerAddr = await signer.getAddress();

    // Start by predicting the address of the DAO contract.
    const hostConfig = hre.config.networks[args.hostNetwork];
    if (!('url' in hostConfig)) throw new Error(`${args.hostNetwork} not configured`);
    const provider = new ethers.JsonRpcProvider(hostConfig.url);
    let nonce = await provider.getTransactionCount(signerAddr);
    if (args.hostNetwork === 'local') nonce++;
    const hostAdd = ethers.getCreateAddress({ from: signerAddr, nonce });

    const enclave = await EnclaveV1.deploy(hostAdd);
    console.log('expected host', hostAdd);
    console.log('Enclave: ', await enclave.getAddress());
    return enclave.getAddress();
  });

task('deploy-host')
  .addParam('enclave')
  .setAction(async (args, hre) => {
    await hre.run('compile');
    const HostV1 = await hre.ethers.getContractFactory('HostV1');
    const host = await HostV1.deploy(args.enclave);
    console.log('Host: ', await host.getAddress());
    return host;
  });

task('deploy-local').setAction(async (_args, hre) => {
    await hre.run('compile');
    const enclave = await hre.run('deploy-enclave', { hostNetwork: 'local' });
    await hre.run('deploy-host', { eclaveAddress: enclave });
  });
 
const config: HardhatUserConfig = {
  solidity: "0.8.18",
  networks: {
    hardhat: {
      chainId: 1337, // @see https://hardhat.org/metamask-issue.html
    },
    local: {
      url: 'http://127.0.0.1:8545',
    },
    bsc_testnet: {
      url: 'https://data-seed-prebsc-1-s1.binance.org:8545',
      chainId: 97,
      accounts,
    },
    sapphire_testnet: {
      url: 'https://testnet.sapphire.oasis.dev',
      chainId: 0x5aff,
      accounts,
    },
  }
};

export default config;