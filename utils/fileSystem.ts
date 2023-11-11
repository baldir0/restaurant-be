import { rm } from "fs/promises";
import path from "path";

export const getImagePath = (
  fileName: string,
  storageFolder: string
): string => {
  return `http://${process.env.APP_HOST}:${process.env.APP_PORT}/img/${storageFolder}/${fileName}`;
};

export const deleteImageFile = async (
  fileName: string,
  folder: string
): Promise<void> => {
  await rm(path.join(__dirname, "../uploads", folder, fileName));
};
