import { lensVerification } from "../lensVerification";

test('should return the sum of two numbers', async () => {

    const result = await lensVerification("0xf1996154c34e3dc77b26437a102231785e9ad7fe");

    // Assert
    expect(result.length).toBe(1);
});
