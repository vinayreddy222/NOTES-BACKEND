import crypto from "crypto";

let secretKey = crypto.randomBytes(32).toString("hex");

console.log(`Generated key: ${secretKey}`);
