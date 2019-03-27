package main

import (
	"bytes"
	"encoding/json"
	"fmt"

	"github.com/hyperledger/fabric/core/chaincode/shim"
	sc "github.com/hyperledger/fabric/protos/peer"
)

// Define the Smart Contract structure
type SmartContract struct {
}

// Carbon struct type
type Carbon struct {
	ID   string `json:"id,omitempty"`
	Data string `json:"data,omitempty"`
	// Timestamp      string  `json:"timestamp,omitempty"`
	// BoilerLocation string  `json:"boilerLocation,omitempty"`
	// IndustryType   string  `json:"industryType, omitempty"`
	// IndustryName   string  `json:"industryName, omitempty"`
	// Gas            *Gas    `json:"gas,omitempty"`
	// Liquid         *Liquid `json: "liquid,omitempty"`
}

// gas struct type
// type Gas struct {
// 	NH3        string `json: "NH3,omitempty"`
// 	NOx        string `json: "NOx,omitempty"`
// 	sulphor    string `json: "sulphor,omitempty"`
// 	phosphorus string `json: "phosphorus,omitempty"`
// 	CO         string `json: "CO, omitempty"`
// 	CO2        string `json: "CO2, omitempty"`
// 	SO2        string `json: "SO2, omitempty"`
// 	CH4        string `json: "CH4, omitempty"`
// }

// liquid struct type
// type Liquid struct {
// 	Alcohol string `json: "Alcohol,omitempty"`
// 	Benzene string `json: "Benzene,omitempty"`
// 	Silicon string `json: "Silicon,omitempty"`
// }

/*
 * The Init method *
 called when the Smart Contract "carbon" is instantiated by the network
 * Best practice is to have any Ledger initialization in separate function
 -- see initLedger()
*/
func (s *SmartContract) Init(APIstub shim.ChaincodeStubInterface) sc.Response {
	return shim.Success(nil)
}

/*
 * The Invoke method *
 called when an application requests to run the Smart Contract "carbon"
 The app also specifies the specific smart contract function to call with args
*/
func (s *SmartContract) Invoke(APIstub shim.ChaincodeStubInterface) sc.Response {

	// Retrieve the requested Smart Contract function and arguments
	function, args := APIstub.GetFunctionAndParameters()
	// Route to the appropriate handler function to interact with the ledger
	if function == "query" {
		return s.query(APIstub, args)
	} else if function == "insertCarbon" {
		return s.insertCarbon(APIstub, args)
	} else if function == "queryAllCarbonPollution" {
		return s.queryAllCarbonPollution(APIstub, args)
	} else if function == "initLedger" {
		return s.initLedger(APIstub)
	}

	return shim.Error("Invalid Smart Contract function name.")
}

func (s *SmartContract) initLedger(APIstub shim.ChaincodeStubInterface) sc.Response {

	return shim.Success(nil)
}

/*
 * The query method *
Used to view the records of one particular pollution data on boilerID
It takes one argument -- the key for the tuna in question
*/
func (s *SmartContract) query(APIstub shim.ChaincodeStubInterface, args []string) sc.Response {

	if len(args) != 1 {
		return shim.Error("Incorrect number of arguments. Expecting 1")
	}

	carbonAsBytes, _ := APIstub.GetState(args[0])
	if carbonAsBytes == nil {
		return shim.Error("Could not locate data on boiler")
	}
	return shim.Success(carbonAsBytes)
}

/**
 * Insert data into chaincode
**/
func (s *SmartContract) insertCarbon(APIstub shim.ChaincodeStubInterface) sc.Response {
	var _carbonData = Carbon{ID: args[0], Data: args[1]}
	fmt.Println(_carbonData)
	carbonAsBytes, _ := json.Marshal(_carbonData)
	err := APIstub.PutState(args[0], carbonAsBytes)
	if err != nil {
		return shim.Error(fmt.Sprintf("Failed to insert carbon data: %s", args[0]))
	}

	return shim.Success(nil)
}

func (s *SmartContract) queryAllCarbonPollution(APIstub shim.ChaincodeStubInterface, args []string) sc.Response {

	startKey := "0"
	endKey := "999"

	resultsIterator, err := APIstub.GetStateByRange(startKey, endKey)
	if err != nil {
		return shim.Error(err.Error())
	}
	defer resultsIterator.Close()

	// buffer is a JSON array containing QueryResults
	var buffer bytes.Buffer
	buffer.WriteString("[")

	bArrayMemberAlreadyWritten := false
	for resultsIterator.HasNext() {
		queryResponse, err := resultsIterator.Next()
		if err != nil {
			return shim.Error(err.Error())
		}
		// Add comma before array members,suppress it for the first array member
		if bArrayMemberAlreadyWritten == true {
			buffer.WriteString(",")
		}
		buffer.WriteString("{\"Key\":")
		buffer.WriteString("\"")
		buffer.WriteString(queryResponse.Key)
		buffer.WriteString("\"")

		buffer.WriteString(", \"Record\":")
		// Record is a JSON object, so we write as-is
		buffer.WriteString(string(queryResponse.Value))
		buffer.WriteString("}")
		bArrayMemberAlreadyWritten = true
	}
	buffer.WriteString("]")

	fmt.Printf("- queryAllCarbon:\n%s\n", buffer.String())

	return shim.Success(buffer.Bytes())
}

/*
 * main function *
calls the Start function
The main function starts the chaincode in the container during instantiation.
*/
func main() {
	// Create a new Smart Contract
	err := shim.Start(new(SmartContract))
	if err != nil {
		fmt.Printf("Error creating new Smart Contract: %s", err)
	}
}
