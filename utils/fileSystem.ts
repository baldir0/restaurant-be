import { access, readFile, rm } from "fs/promises";
import path from "path";
import { FileAccessError } from "./errorHandler";

export const loadImageFile = async (
  fileName: string,
  folder: string
): Promise<Buffer> => {
  const filePath = path.join(__dirname, "../uploads", folder, fileName);
  try {
    await access(filePath)
    return await readFile(filePath);
  } catch (e) {
    throw new FileAccessError(
      "File doesn't exists or user doesn't have access to it."
    );
  }
};

export const deleteImageFile = async (
  fileName: string,
  folder: string
): Promise<void> => {
  await rm(path.join(__dirname, "../uploads", folder, fileName));
};
