# Pour le faire fonctionner

npm install

## deployer le contrat de sapphire

npx hardhat deploy-enclave --network sapphire_testnet --host-network bsc_testnet
output:
expected host 0x5e98ac0a559f2E4f4Dc80b93FEeE4E292a170644
Enclave:  0x88F697caFE812ed5c37F0cd5b799d0F118b42D56

## deployer le contrat bsc

npx hardhat deploy-host --network bsc_testnet --enclave "0x88F697caFE812ed5c37F0cd5b799d0F118b42D56"
output:
Host:  0x5e98ac0a559f2E4f4Dc80b93FEeE4E292a170644

Les addresses "host" doivent être identiques.

## ajouter un message

npx hardhat --network sapphire_testnet run scripts/enclave/send.ts

## lire les messages

npx hardhat --network bsc_testnet run scripts/host/getMessages.ts
Cela prend environ deux minutes pour le message de passer d'un réseau à l'autre
