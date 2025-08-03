// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

contract RealEstateCrowdfund is Ownable {
    using SafeERC20 for IERC20;

    struct Investor {
        uint256 amountInvested;
        bool claimed;
    }

    address public usdcToken;         // USDC token address
    address public projectOwner;      // Owner of the real estate asset
    address public platformWallet;    // Platform commission wallet

    uint256 public capitalRequired;   // Max funding target (e.g. 5000 USDC)
    uint256 public totalInvested;     // Total invested so far
    uint256 public totalProfit;       // Profit after sale
    uint256 public saleAmount;        // Final sale value of the asset
    bool public projectLiquidated;    // True once liquidated

    mapping(address => Investor) public investors;
    address[] public investorList;

    // Fixed distribution percentages over PROFIT only
    uint256 public constant INVESTOR_SHARE = 70;
    uint256 public constant OWNER_SHARE = 20;
    uint256 public constant PLATFORM_SHARE = 10;

    event Invested(address indexed investor, uint256 amount);
    event ProjectLiquidated(uint256 saleAmount, uint256 totalProfit);
    event ReturnsClaimed(address indexed investor, uint256 amount);

    constructor(
        address _usdcToken,
        address _projectOwner,
        address _platformWallet,
        uint256 _capitalRequired
    ) Ownable(msg.sender) {
        usdcToken = _usdcToken;
        projectOwner = _projectOwner;
        platformWallet = _platformWallet;
        capitalRequired = _capitalRequired;
    }

    modifier onlyNotLiquidated() {
        require(!projectLiquidated, "Project already liquidated");
        _;
    }

    function invest(uint256 amount) external onlyNotLiquidated {
        require(amount > 0, "Cannot invest zero");
        require(totalInvested + amount <= capitalRequired, "Exceeds capital limit");

        IERC20(usdcToken).safeTransferFrom(msg.sender, address(this), amount);

        if (investors[msg.sender].amountInvested == 0) {
            investorList.push(msg.sender);
        }

        investors[msg.sender].amountInvested += amount;
        totalInvested += amount;

        emit Invested(msg.sender, amount);
    }

    function liquidateProject(uint256 _saleAmount) external onlyOwner onlyNotLiquidated {
        require(_saleAmount >= totalInvested, "Sale amount must exceed total investment");

        saleAmount = _saleAmount;
        totalProfit = saleAmount - totalInvested;
        projectLiquidated = true;

        // Distribute gain
        uint256 ownerGain = (totalProfit * OWNER_SHARE) / 100;
        uint256 platformGain = (totalProfit * PLATFORM_SHARE) / 100;

        if (ownerGain > 0) {
            IERC20(usdcToken).safeTransfer(projectOwner, ownerGain);
        }

        if (platformGain > 0 && platformWallet != address(0)) {
            IERC20(usdcToken).safeTransfer(platformWallet, platformGain);
        }

        emit ProjectLiquidated(_saleAmount, totalProfit);
    }

    function claimReturns() external {
        require(projectLiquidated, "Project not liquidated yet");

        Investor storage inv = investors[msg.sender];
        require(inv.amountInvested > 0, "No investment found");
        require(!inv.claimed, "Already claimed");

        uint256 userShare = inv.amountInvested;
        uint256 userProfit = (totalProfit * INVESTOR_SHARE * userShare) / (100 * totalInvested);
        uint256 totalReturn = userShare + userProfit;

        inv.claimed = true;

        IERC20(usdcToken).safeTransfer(msg.sender, totalReturn);

        emit ReturnsClaimed(msg.sender, totalReturn);
    }

    function getInvestorCount() external view returns (uint256) {
        return investorList.length;
    }
}
