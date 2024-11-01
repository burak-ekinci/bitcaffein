const hre = require("hardhat")
const fs = require("fs")
const path = require("path")


async function main () {
    const [deployer] = await ethers.getSigners()
    const address = await deployer.getAddress()
    console.log("Deploying contract from this address : ", address)

    const BitCaffeinNFT = await hre.ethers.getContractFactory("BitCaffeinNFT")
    const contract = await BitCaffeinNFT.deploy()
    contract.waitForDeployment()
    console.log("BitCaffeinNFT Deployed to this address : ", contract.target)

    saveContractFiles(contract)
}


async function saveContractFiles (contract) {
    const contractDir = path.join(__dirname, "..", "frontend", "public", "contracts"
    )

    // if frontend side don't have contracts files directory, make dir
    if(!fs.existsSync(contractDir)){
        fs.mkdirSync(contractDir)
    }

    fs.writeFileSync(
        path.join(contractDir,`contract-address-${network.name}.json`),
        JSON.stringify({ "BitCaffeinNFT" : contract.target}, null, 2)
    )

    const BitCaffeinNFTArtifact = await artifacts.readArtifactSync("BitCaffeinNFT")

    fs.writeFileSync(
        path.join(contractDir, "BitCaffeinNFT.json"),
        JSON.stringify(BitCaffeinNFTArtifact, null, 2)
    )    

}

main().catch(err => console.log(err))

// ApprovedforAll
//mint
//settokenuri
//settransfer