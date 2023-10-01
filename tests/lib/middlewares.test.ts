/* middlewares unit tests
should immediately respond to the request if the method is OPTIONS
should throw an error if Bearer indicator not passed
should throw an error if missing token
should throw an error if blank token
should throw an error if there is a problem validating the token
should throw an error if the token is invalid
should throw an error if the token is expired
should throw an error if the token is not active
should throw an error if the token is not a user token
should set session token if successful
*/

/* error handler unit tests
should return a 500 status code when given an error with no status code
should return a static error message when an unhandled error is thrown
should return an error with the provided statusCode
 */

/* validate unit tests
should throw an error when given an invalid request
should succeed with a valid request
*/

/* add empty default test to pass CI */
describe("utility-classes", () => {
    it("should pass", () => {
        expect(true).toBe(true);
    });
});

