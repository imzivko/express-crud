"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("./db");
global.afterAll(async () => {
    await db_1.client.close();
});
//# sourceMappingURL=setupFilesAfterEnv.js.map