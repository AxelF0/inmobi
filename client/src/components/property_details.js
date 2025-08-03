import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { ethers } from "ethers";
import { contractAddress, contractABI } from "../utils/constants";
import "../styles/property_details.css";
import ModalDialog from "./ModalDialog";

// ABI para el token ERC20 (USDC)
const usdcABI = [
  "function approve(address spender, uint256 amount) public returns (bool)",
  "function allowance(address owner, address spender) view returns (uint256)",
  "function decimals() view returns (uint8)",
  "function balanceOf(address owner) view returns (uint256)",
];

const PropertyDetails = ({ property, onBack }) => {
  4;
  const [capitalRequired, setCapitalRequired] = useState("0");
  const [totalInvested, setTotalInvested] = useState("0");
  const [investmentAmount, setInvestmentAmount] = useState("");
  const [usdcTokenAddress, setUsdcTokenAddress] = useState("");
  const [usdcDecimals, setUsdcDecimals] = useState(6);
  const [userAddress, setUserAddress] = useState("");
  const [usdcBalance, setUsdcBalance] = useState("0");
  const [modal, setModal] = useState({
    isOpen: false,
    title: "",
    message: "",
    type: "",
  });
  const [isProcessing, setIsProcessing] = useState(false);

  const showModal = (title, message, type) => {
    setModal({ isOpen: true, title, message, type });
  };

  const closeModal = () => {
    setModal({ ...modal, isOpen: false });
  };

  useEffect(() => {
    const fetchContractData = async () => {
      if (window.ethereum) {
        try {
          console.log("Iniciando carga de datos del contrato...");
          const provider = new ethers.BrowserProvider(window.ethereum);
          const signer = await provider.getSigner();
          const address = await signer.getAddress();
          setUserAddress(address);
          console.log(`✅ Conectado a la dirección: ${address}`);

          const contract = new ethers.Contract(
            contractAddress,
            contractABI,
            provider
          );
          const usdcAddress = await contract.usdcToken();
          setUsdcTokenAddress(usdcAddress);
          console.log(`✅ Dirección del token USDC obtenida: ${usdcAddress}`);

          const usdcContract = new ethers.Contract(
            usdcAddress,
            usdcABI,
            provider
          );
          const decimals = await usdcContract.decimals();
          setUsdcDecimals(decimals);
          console.log(`✅ Decimales del token USDC: ${decimals}`);

          const capital = await contract.capitalRequired();
          setCapitalRequired(ethers.formatUnits(capital, decimals));
          const invested = await contract.totalInvested();
          setTotalInvested(ethers.formatUnits(invested, decimals));

          const balance = await usdcContract.balanceOf(address);
          const formattedBalance = ethers.formatUnits(balance, decimals);
          setUsdcBalance(formattedBalance);
          console.log(
            `✅ Balance de USDC del usuario (${address}): ${formattedBalance}`
          );
        } catch (error) {
          console.error("❌ Error al cargar datos del contrato:", error);
          showModal(
            "Error de conexión",
            "Error al conectar o cargar datos del contrato. Verifica tu conexión a MetaMask y a la red de Sepolia.",
            "error"
          );
        }
      }
    };
    fetchContractData();
  }, []);

  const handleInvestment = async () => {
    if (!window.ethereum) {
      showModal(
        "Error de Wallet",
        "Por favor, instala y conecta tu wallet (MetaMask).",
        "error"
      );
      return;
    }

    const numericAmount = parseFloat(investmentAmount);
    if (isNaN(numericAmount) || numericAmount <= 0) {
      showModal(
        "Monto Inválido",
        "Por favor, ingresa una cantidad válida (mayor a 0).",
        "error"
      );
      return;
    }

    setIsProcessing(true);

    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(
        contractAddress,
        contractABI,
        signer
      );
      const usdcContract = new ethers.Contract(
        usdcTokenAddress,
        usdcABI,
        signer
      );

      const investmentAmountInWei = ethers.parseUnits(
        investmentAmount,
        usdcDecimals
      );

      // Verificación de balance
      const userCurrentBalance = await usdcContract.balanceOf(userAddress);
      if (userCurrentBalance < investmentAmountInWei) {
        showModal(
          "Saldo insuficiente",
          `Tu balance es de ${ethers.formatUnits(
            userCurrentBalance,
            usdcDecimals
          )} USDC.`,
          "error"
        );
        setIsProcessing(false);
        return;
      }

      // Verificación y solicitud de aprobación
      const allowance = await usdcContract.allowance(
        userAddress,
        contractAddress
      );
      if (allowance < investmentAmountInWei) {
        showModal(
          "Paso 1: Aprobación",
          "Por favor, confirma la transacción para darle permiso al contrato de gastar tus USDC. Se abrirá una ventana de MetaMask.",
          "info"
        );
        const approveTx = await usdcContract.approve(
          contractAddress,
          investmentAmountInWei
        );
        await approveTx.wait();
        showModal(
          "Aprobación exitosa",
          "Paso 1 completado. El contrato ya tiene permiso. Ahora procede con el siguiente paso: la inversión.",
          "success"
        );
      }

      // Inversión
      showModal(
        "Paso 2: Inversión",
        "Por favor, confirma la transacción para invertir tus USDC. Se abrirá una ventana de MetaMask.",
        "info"
      );
      const investTx = await contract.invest(investmentAmountInWei);
      await investTx.wait();

      showModal(
        "¡Inversión exitosa!",
        "Tu inversión ha sido registrada correctamente. Los datos se actualizarán en breve.",
        "success"
      );

      const invested = await contract.totalInvested();
      setTotalInvested(ethers.formatUnits(invested, usdcDecimals));
      setInvestmentAmount("");
    } catch (error) {
      console.error("Error en la inversión:", error);

      let errorMessage = "Hubo un error en la transacción.";
      if (error.reason) {
        errorMessage = `Error de contrato: ${error.reason}. Asegúrate de que el monto cumple con el mínimo de inversión o que el capital máximo no ha sido alcanzado.`;
      } else if (error.code === 4001) {
        errorMessage = "Transacción rechazada por el usuario.";
      } else if (error.message.includes("insufficient funds for gas")) {
        errorMessage =
          "Error: Fondos insuficientes de ETH para pagar el gas de la transacción.";
      } else {
        errorMessage = `Error desconocido: ${error.message}`;
      }
      showModal("Error en la Transacción", errorMessage, "error");
    } finally {
      setIsProcessing(false);
    }
  };

  const percentageRaised =
    parseFloat(capitalRequired) > 0
      ? (parseFloat(totalInvested) / parseFloat(capitalRequired)) * 100
      : 0;

  return (
    <div className="property-details-container">
      <div className="property-details-header">
        <button className="back-button" onClick={onBack}>
          <FontAwesomeIcon icon={faArrowLeft} /> Volver al catálogo
        </button>
      </div>
      <div className="property-details-content">
        <div className="property-main-info">
          {/* (Tu JSX para la galería y la info básica, que se mantiene igual) */}
        </div>

        <div className="investment-panel">
          <div className="investment-card">
            <h2>Recaudado - objetivo</h2>
            <div className="progress-section">
              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{
                    width: `${
                      percentageRaised > 100 ? 100 : percentageRaised
                    }%`,
                  }}
                ></div>
              </div>
              <div className="progress-labels">
                <span>${totalInvested}</span>
                <span>${capitalRequired}</span>
              </div>
            </div>

            <h2>Inversión</h2>
            <div className="purchase-form">
              <div className="input-group">
                <label>
                  Cantidad a invertir (USDC) - Tu balance: {usdcBalance}
                </label>
                <input
                  type="number"
                  placeholder="Ej: 100"
                  value={investmentAmount}
                  onChange={(e) => setInvestmentAmount(e.target.value)}
                  min="1"
                  disabled={isProcessing}
                />
              </div>
              <button
                className="buy-now-btn"
                onClick={handleInvestment}
                disabled={isProcessing}
              >
                {isProcessing ? "Procesando..." : "Invertir Ahora"}
              </button>
            </div>
          </div>
        </div>
      </div>
      <ModalDialog
        isOpen={modal.isOpen}
        onClose={closeModal}
        title={modal.title}
        message={modal.message}
        type={modal.type}
      />
    </div>
  );
};

export default PropertyDetails;
