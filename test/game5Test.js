const { assert } = require("chai");
const ethersjs = require("ethers");

describe("Game5", function () {
	it("should be a winner", async function () {
		const Game = await ethers.getContractFactory("Game5");
		const game = await Game.deploy();
		await game.deployed();

		let wallet = await ethersjs.Wallet.createRandom();

		while (
			BigInt(wallet.address) >
			BigInt("0x00FfFFfFFFfFFFFFfFfFfffFFFfffFfFffFfFFFf")
		) {
			wallet = await ethersjs.Wallet.createRandom();
		}
		wallet = wallet.connect(ethers.provider);

		const signer = ethers.provider.getSigner(0);
		await signer.sendTransaction({
			to: wallet.address,
			value: ethers.utils.parseUnits("1"),
		});
		await game.connect(wallet).win();

		assert(await game.isWon(), "You did not win the game");
	});
});
