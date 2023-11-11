import { pseudoRandomBytes } from "crypto";
import { StorageEngine, diskStorage } from "multer";

export const setupStorage = (dest: string): StorageEngine => {
  return diskStorage({
    destination: dest,
    filename(req, file, callback) {
      const fileExtension = file.mimetype.split("/")[1];

      callback(
        null,
        pseudoRandomBytes(16).toString("hex") +
          "." +
          (fileExtension === "svg+xml" ? "svg" : fileExtension)
      );
    },
  });
};
