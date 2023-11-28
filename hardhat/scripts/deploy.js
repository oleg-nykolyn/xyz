const hre = require('hardhat');

async function main() {
  const simpleMdAcl = await hre.ethers.deployContract(
    'XYZMetadataAccessControlERC721',
  );
  await simpleMdAcl.waitForDeployment();
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
