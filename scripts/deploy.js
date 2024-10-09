const hre = require("hardhat")
const path = require("path")
const fs = require("fs")


async function main () {
    const [deployer] = await ethers.getSigners()
    const address = await deployer.getAddress()
    console.log(`Deploying contract from address : ${address}`)

    const BitCaffein = await hre.ethers.getContractFactory("BitCaffein")
    const contract = await BitCaffein.deploy()
    await contract.waitForDeployment()

    console.log(`BitCaffein deployed to this address : ${contract.target}`)

    saveContractFiles(contract)

}

    function saveContractFiles (contract){
        const contractDir = path.join(__dirname, "..", "frontend", "public", "contracts")

        if(!fs.existsSync(contractDir)){
            fs.mkdirSync(contractDir)
        }

        fs.writeFileSync(
            path.join(contractDir, `BitCaffein-contract-address-${network.name}.json`),
            JSON.stringify({"BitCaffein": contract.target}, null, 2)
        )

        const BitCaffeinArtifact = artifacts.readArtifactSync("BitCaffein")

        fs.writeFileSync(
            path.join(contractDir, "BitCaffein.json"),
            JSON.stringify(BitCaffeinArtifact, null, 2)
        )  
    }

main().catch((error) => {
    console.log(error)
    process.exitCode = 1;
})

// npx hardhat run scripts/deploy.js --network localhost



