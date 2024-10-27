// Import the 'supertest' module, which is used to make HTTP requests in tests.
import request from "supertest";
// Import the application server and the database connection function.
import server, { connectDB } from "../server";
// Import the database configuration, which will be mocked in tests.
import db from "../config/db";

// Describe the test suite for the GET /api endpoint
describe("GET /api", () => {
    // Define a test to verify that the endpoint sends a JSON response with a message and a 200 status
    test("Should send back a JSON Response", async () => {
        const res = await request(server).get("/api"); // Makes a GET request to the /api endpoint

        expect(res.body.msg).toBe("API"); // Verifies that the response body message is "API"
        expect(res.status).toBe(200); // Checks that the response status is 200 (OK)
        expect(res.headers["content-type"]).toMatch(/json/); // Confirms that the content type is JSON

        // Additional checks to ensure the response is not 404 or "Not Found"
        expect(res.status).not.toBe(404);
        expect(res.body.msg).not.toBe("Not Found");
    });
});

// Mock the database configuration module
jest.mock("../config/db");

// Describe the test suite for handling database connection errors
describe("connectDB", () => {
    // Define a test to check how connectDB handles a database connection error
    test("Should handle db connection error", async () => {
        // Mock the 'authenticate' method of 'db' to reject with an error
        jest.spyOn(db, "authenticate").mockRejectedValueOnce(new Error("Database connection error"));
        // Spy on console.log to verify the error message output
        const consoleSpy = jest.spyOn(console, "log");

        await connectDB(); // Attempt to connect to the database

        // Check if console.log was called with the expected error message
        expect(consoleSpy).toHaveBeenCalledWith(
            expect.stringContaining("Database connection error")
        );
        expect(consoleSpy).toHaveBeenCalledTimes(1); // Ensure console.log was called once
        expect(consoleSpy).not.toHaveBeenCalledWith("Database connected"); // Confirm no success message was logged
    });
});
