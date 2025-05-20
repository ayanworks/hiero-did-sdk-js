const { PrivateKey, Client } = require("@hashgraph/sdk");
const { HcsDid } = require("../dist");
const { OPERATOR_ID, OPERATOR_KEY, DID_IDENTIFIER, DID_PRIVATE_KEY } = require("./.env.json");

async function main() {
    /**
     * Client setup
     */

    const privateKey = PrivateKey.fromString(OPERATOR_KEY);
    const client = Client.forTestnet({ scheduleNetworkUpdate: false });
    client.setOperator(OPERATOR_ID, privateKey);
    // Not sure why the above was undertaken instead of the normal initialization
    // const client = Client.forTestnet({ scheduleNetworkUpdate: false });
    // client.setOperator(OPERATOR_ID, OPERATOR_KEY);

    const didPrivateKey = PrivateKey.fromString(DID_PRIVATE_KEY);

    /**
     * Build DID instance
     */
    const did = new HcsDid({ identifier: DID_IDENTIFIER, privateKey: didPrivateKey, client: client });

    /**
     * Delete DID
     */
    await did.delete();
}

main();
