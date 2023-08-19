"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePackageJson = exports.runCommand = void 0;
const child_process_1 = require("child_process");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
/**
 * Executes the provided shell command.
 *
 * @param command The command to be executed.
 * @returns True if the command executed successfully, otherwise false.
 */
function runCommand(command) {
    try {
        (0, child_process_1.execSync)(command, { stdio: "inherit" });
    }
    catch (e) {
        console.error(`Failed to execute ${command}`);
        process.exit(-1);
    }
}
exports.runCommand = runCommand;
/**
 * Update the 'name' field in package.json with the given project name.
 *
 * @param userProjectDir The directory name specified by the user.
 */
function updatePackageJson(userProjectDir) {
    const packageJsonPath = path_1.default.join(userProjectDir, "package.json");
    const packageJsonContent = fs_1.default.readFileSync(packageJsonPath, "utf-8");
    const packageJson = JSON.parse(packageJsonContent);
    // Update the name field
    packageJson.name = userProjectDir;
    delete packageJson.bin;
    delete packageJson.main;
    fs_1.default.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2) + "\n");
}
exports.updatePackageJson = updatePackageJson;
