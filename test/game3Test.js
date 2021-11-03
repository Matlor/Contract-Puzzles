const { assert } = require("chai");

describe("Game3", function () {
	it("should be a winner", async function () {
		const Game = await ethers.getContractFactory("Game3");
		const game = await Game.deploy();
		await game.deployed();

		const signer0 = ethers.provider.getSigner(0);
		const signer1 = ethers.provider.getSigner(1);
		const signer2 = ethers.provider.getSigner(2);

		const address0 = await signer0.getAddress();
		const address1 = await signer1.getAddress();
		const address2 = await signer2.getAddress();

		await game.connect(signer0).buy({ value: "2" });
		await game.connect(signer1).buy({ value: "3" });
		await game.connect(signer2).buy({ value: "1" });

		await game.win(address0, address1, address2);

		assert(await game.isWon(), "You did not win the game");
	});
});
