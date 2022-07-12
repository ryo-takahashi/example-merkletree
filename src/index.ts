import "merkletreejs";
import "keccak256";
import keccak256 from "keccak256";
import MerkleTree from "merkletreejs";

async function main() {
  const whitelistAddressList = [
    "0x70997970C51812dc3A010C7d01b50e0d17dc79C8",
    "0xD71B5DB957566d2c65cA6fc784378E99130Bc6bF",
    "0xa25DD600F5ac32370acD2C488D020aE735280f33",
    "0x3e7feD74098a797F5a3857301D02B75F8Dc1DcFF",
    "0x97D69b839741e8A9e6eBe90C0D3DEDdb75023640",
    "0x1E8bf250c4fE682425bfc1c2F033756634c78A04",
  ];
  const leafNodes = whitelistAddressList.map((address) => keccak256(address));
  const merkleTree = new MerkleTree(leafNodes, keccak256, { sortPairs: true });
  console.log("merkleTree: ", merkleTree.toString());

  const rootHash = merkleTree.getHexRoot();
  console.log("rootHash: ", rootHash);

  // verify true
  const testSuccessVerify = () => {
    const leaf = keccak256("0x70997970C51812dc3A010C7d01b50e0d17dc79C8");
    const proof = merkleTree.getProof(leaf);
    console.log("proof: ", proof);
    console.log("verify test true: ", merkleTree.verify(proof, leaf, rootHash)); // true
  };
  testSuccessVerify();

  // verify false
  const testFailureVerify = () => {
    const leaf = keccak256("hoge");
    const proof = merkleTree.getProof(leaf);
    console.log("verify test true: ", merkleTree.verify(proof, leaf, rootHash)); // false
  };
  testFailureVerify();
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
