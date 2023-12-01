const hre = require('hardhat');

async function main() {
  const contract = await hre.ethers.deployContract(
    'ERC721OwnerAuthorizedEditorEMCA',
  );
  await contract.waitForDeployment();
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
