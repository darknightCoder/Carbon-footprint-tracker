import { Context, Contract } from 'fabric-contract-api';
import { Boiler, BoilerData, GaseousParams, LiqidParams } from './models/carbon-tracker.model';

export class BoilerDataContract extends Contract {

    public async initLedger(ctx: Context) {
     
        const boiler: Boiler[] = [
            {
 
                'latitude': 28.123,
                'longitude': 120.51,
                'industryType': 1,
                'industryName': '',
                'boilerID': 'BL736',

            },
            {
                'latitude': 28.123,
                'longitude': 120.51,
                'industryType': 1,
                'industryName': '',
                'boilerID': 'BL436',
            }
        ];
        const boilerData:BoilerData = {
            boilerID: 'BL436',
            gaseous: null,
            liquid: null
        };

        for (let i = 0; i < boiler.length; i++) {            
            await ctx.stub.putState(boiler[i].boilerID, Buffer.from(JSON.stringify(boiler[i])));
            console.info('Added <--> ', boiler[i]);
        }
        console.info('============= END : Initialize Ledger ===========');
    }

    public async queryBoilerIoTData(ctx: Context, boilerID: string): Promise<string> {
        const assetAsBytes = await ctx.stub.getState(boilerID); // get the car from chaincode state
        if (!assetAsBytes || assetAsBytes.length === 0) {
            throw new Error(`${boilerID} does not exist`);
        }
        console.log(assetAsBytes.toString());
        return assetAsBytes.toString();
    }

    public async createBoiler(ctx: Context,boilerID: string, latitude: string, longitude: string, industryType: number, industryName: string) {
       
        const assetDetailsAsBytes = await ctx.stub.getState(boilerID); // get the car from chaincode state
        console.log(assetDetailsAsBytes)
        if (assetDetailsAsBytes && assetDetailsAsBytes.length >= 0) {
            throw new Error(`${boilerID} already exists`);
        }

        const boiler: Boiler = {
            'latitude': 28.123,
            'longitude': 120.51,
            'industryType': 1,
            'industryName': '',
            'boilerID': 'BL736',
        };

        await ctx.stub.putState(boilerID, Buffer.from(JSON.stringify(boiler)));
      
    }
    public async createIoTBoilerData(ctx: Context,boilerID: string, gaseous: string, liquid: string) {
       
        const assetDetailsAsBytes = await ctx.stub.getState(boilerID); // get the car from chaincode state
        console.log(assetDetailsAsBytes)
        if (assetDetailsAsBytes && assetDetailsAsBytes.length >= 0) {
            throw new Error(`${boilerID} already exists`);
        }

        const boiler: BoilerData = {
            'boilerID': 28.123,
            'gaseous': JSON.parse(gaseous),
            'liquid': JSON.parse(liquid),
        };

        await ctx.stub.putState(boilerID, Buffer.from(JSON.stringify(boiler)));
      
    }
    public async queryAllAssets(ctx: Context, startKey: string, endKey: string): Promise<string> {


        const iterator = await ctx.stub.getStateByRange(startKey, endKey);

        const allResults = [];
        while (true) {
            const res = await iterator.next();

            if (res.value && res.value.value.toString()) {
                console.log(res.value.value.toString('utf8'));

                const Key = res.value.key;
                let Record;
                try {
                    Record = JSON.parse(res.value.value.toString('utf8'));
                } catch (err) {
                    console.log(err);
                    Record = res.value.value.toString('utf8');
                }
                allResults.push({ Key, Record });
            }
            if (res.done) {
                console.log('end of data');
                await iterator.close();
                console.info(allResults);
                return JSON.stringify(allResults);
            }
        }
    }


}