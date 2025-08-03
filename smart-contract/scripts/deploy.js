const hre = require("hardhat");
const fs = require("fs-extra");
const path = require("path");

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log("✅ Desplegando contratos con la cuenta:", deployer.address);

  // Parámetros de despliegue
  const usdcAddress = "0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238"; // Dirección de USDC en Sepolia
  const projectOwner = deployer.address;
  const platformWallet = deployer.address;
  const capitalRequired = hre.ethers.parseUnits("500", 6); // 500 USDC con 6 decimales

  // --- Despliegue del contrato RealEstateCrowdfund ---
  const Crowdfund = await hre.ethers.getContractFactory("RealEstateCrowdfund");
  const contract = await Crowdfund.deploy(
    usdcAddress,
    projectOwner,
    platformWallet,
    capitalRequired
  );

  await contract.waitForDeployment();
  const contractAddress = await contract.getAddress();
  console.log(
    "✅ Contrato RealEstateCrowdfund desplegado en:",
    contractAddress
  );

  // --- Guardar el ABI y la dirección para el cliente ---
  const abiPath =
    "./artifacts/contracts/RealEstateCrowdfund.sol/RealEstateCrowdfund.json";
  const data = JSON.parse(fs.readFileSync(abiPath, "utf8"));
  const contractData = {
    address: contractAddress,
    abi: data.abi,
  };
  const filePath = path.join(
    __dirname,
    "/../client/src/RealEstateCrowdfund.json"
  );
  fs.writeFileSync(filePath, JSON.stringify(contractData, null, 2));
  console.log("✅ ABI y dirección del contrato guardados en:", filePath);

  // --- CAMBIO CLAVE: APROBAR TOKENS para el contrato desplegado ---

  // Cantidad de prueba para aprobar. Puedes ajustar este valor.
  // Es importante que sea una cantidad mayor o igual a lo que planeas probar.
  const amountToApprove = hre.ethers.parseUnits("100", 6); // 100 USDC

  // ABI mínimo para el contrato USDC
  const usdcABI = [
    "function approve(address spender, uint256 amount) public returns (bool)",
  ];
  const usdcContract = new hre.ethers.Contract(usdcAddress, usdcABI, deployer);

  console.log(
    `⏳ Aprobando que el contrato ${contractAddress} pueda gastar ${hre.ethers.formatUnits(
      amountToApprove,
      6
    )} USDC...`
  );

  try {
    const approveTx = await usdcContract.approve(
      contractAddress,
      amountToApprove
    );
    await approveTx.wait();
    console.log(
      "✅ Aprobación exitosa. Hash de la transacción:",
      approveTx.hash
    );
  } catch (error) {
    console.error(
      "❌ Error durante la aprobación de tokens. Asegúrate de tener suficiente ETH para el gas y tokens USDC en tu cuenta del deployer."
    );
    console.error(error);
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
