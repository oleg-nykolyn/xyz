const hre = require('hardhat');

async function main() {
  const mdAclErc721OnlyOwner = await hre.ethers.deployContract(
    'XYZMetadataAccessControlERC721OnlyOwner',
  );
  await mdAclErc721OnlyOwner.waitForDeployment();
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
