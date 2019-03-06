package main

/* Imports
* 4 utility libraries for handling bytes, reading and writing JSON,
formatting, and string manipulation
* 2 specific Hyperledger Fabric specific libraries for Smart Contracts
*/
import (
	"encoding/json"
	"fmt"

	"github.com/hyperledger/fabric/core/chaincode/shim"
	sc "github.com/hyperledger/fabric/protos/peer"
)

// Define the Smart Contract structure
type SmartContract struct {
}

// Person struct type
type Carbon struct {
	ID        string  `json:"id,omitempty"`
	Firstname string  `json:"firstname,omitempty"`
	Lastname  string  `json:"lastname,omitempty"`
	Gas       *Gas    `json:"gas,omitempty"`
	Liquid    *Liquid `json: "liquid,omitempty"`
}

// gas struct type
type Gas struct {
	NH3        string `json: "NH3,omitempty"`
	NOx        string `json: "NOx,omitempty"`
	sulphor    string `json: "sulphor,omitempty"`
	phosphorus string `json: "phosphorus,omitempty"`
	CO         string `json: "CO, omitempty"`
	CO2        string `json: "CO2, omitempty"`
	SO2        string `json: "SO2, omitempty"`
	CH4        string `json: "CH4, omitempty"`
}

// liquid struct type
type Liquid struct {
	Alcohol string `json: "Alcohol,omitempty"`
	Benzene string `json: "Benzene,omitempty"`
	Silicon string `json: "Silicon,omitempty"`
}

func (s *SmartContract) Init(APIstub shim.ChaincodeStubInterface) sc.Response {
	return shim.Success(nil)
}

func (s *SmartContract) Invoke(APIstub shim.ChaincodeStubInterface) sc.Response {

	// Retrieve the requested Smart Contract function and arguments
	function, args := APIstub.GetFunctionAndParameters()
	// Route to the appropriate handler function to interact with the ledger
	if function == "insertCarbon" {
		return s.insertCarbon(APIstub, args)
	}

	return shim.Error("Invalid Smart Contract function name.")
}

/*
 * The initLedger method *
add default data to network
*/
func (s *SmartContract) initLedger(APIstub shim.ChaincodeStubInterface) sc.Response {

}

//
func (s *SmartContract) insertCarbon(APIstub shim.ChaincodeStubInterface, args []string) sc.Response {
	if len(args) != 5 {
		return shim.Error("Incorrect number of arguments. Expecting 5")
	}

	var _carbon = Carbon{}

	carbonAsBytes, _ := json.Marshal(_carbon)
	err := APIstub.PutState(args[0], carbonAsBytes)
	if err != nil {
		return shim.Error(fmt.Sprintf("Failed to record carbon catch: %s", args[0]))
	}

	return shim.Success(nil)
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
