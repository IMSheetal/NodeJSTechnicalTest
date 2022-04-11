# NodeJS Technical Test
1. Your name - Sheetal Matey
2. Project title- APIforEthereum
3. Dependencies and steps on how to install
- Download the Node.js source code or a pre-built installer for your platform, and start developing
https://nodejs.org/en/download/

-used node version for this project v14.17.6. 
Create directory APIforEthereum and CD APIforEthereum then on CLI give npm init -y.

 npm i express  
 npm i axios  
 npm i body-parser  
 npm i dotenv  
 npm i nodemon  
 npm i winston 

4. Steps on how to build and run the application
npm run dev............ to run the application ex: localhost:3000

5. Any information you think it is important
check in postman
http://localhost:3000
method POST
body row json
for multiple addresses
{
	"addresses" :
    "0x39a582bE8039a526Bdf4730e4D1E3E0fE1Bc811b,0x902c38F2bcddF95E7BCE50A14515B4B62F502Bf2,0xBcFE52fEF72A70AD09245e40AEAcCE4B1e851320,0x0560de6E5a452a00F58a90cb5501C18e77EB91B4"
	
}
for single address
{
	"addresses" :
    "0x39a582bE8039a526Bdf4730e4D1E3E0fE1Bc811b"
	
}

### Functional Requirements
Following the documentation provided in https://docs.etherscan.io/ to finished below tasks
1. Create an API service which contains 1 API for getting total balance of a list of address
The expect response is shown as below:
{
“addresses”: [
{
“address”: [addressValue1],
“balance”: [balanceValue1]
},
...
{
“address”: [addressValueN],
“balance”: [balanceValueN]
}
]
“totalBalance”: [totalBalance]
}
2. The maximum number of addresses per call should be up to 100.
3. The API service should point to Goerli network
4. Well unit testing and logs will be an advantage.