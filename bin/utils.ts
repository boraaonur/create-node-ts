import { execSync } from "child_process";
import fs from "fs";
import path from "path";

/**
 * Executes the provided shell command.
 *
 * @param command The command to be executed.
 * @returns True if the command executed successfully, otherwise false.
 */
export function runCommand(command: string) {
  try {
    execSync(command, { stdio: "inherit" });
  } catch (e) {
    console.error(`Failed to execute ${command}`);
    process.exit(-1);
  }
}

/**
 * Update the 'name' field in package.json with the given project name.
 *
 * @param userProjectDir The directory name specified by the user.
 */
export function updatePackageJson(userProjectDir: string): void {
  const packageJsonPath = path.join(userProjectDir, "package.json");
  const packageJsonContent = fs.readFileSync(packageJsonPath, "utf-8");
  const packageJson = JSON.parse(packageJsonContent);

  // Update the name field
  packageJson.name = userProjectDir;
  delete packageJson.bin;
  delete packageJson.main;

  fs.writeFileSync(
    packageJsonPath,
    JSON.stringify(packageJson, null, 2) + "\n"
  );
}
