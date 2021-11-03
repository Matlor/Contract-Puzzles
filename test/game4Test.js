const { assert } = require("chai");

describe("Game4", function () {
	it("should be a winner", async function () {
		const Game = await ethers.getContractFactory("Game4");
		const game = await Game.deploy();
		await game.deployed();

		const signer = ethers.provider.getSigner(0);
		const address = await signer.getAddress();

		await game.write(address);
		await game.win(address);

		assert(await game.isWon(), "You did not win the game");
	});
});
