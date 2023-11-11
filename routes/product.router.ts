import { Router } from "express";
import multer from "multer";
import { ProductRecord } from "../records/product.record";

const upload = multer({ dest: "uploads/products-icons" });

export const productRouter = Router()
  .get("/:restaurantId", async (req, res) => {
    const result = await ProductRecord.getList(req.params.restaurantId);
    if (result.length > 0) {
      res.status(302).send(result);
      return;
    }
    res.sendStatus(404);
  })
  .post("/", upload.single("image"), async (req, res) => {
    const productRecord = new ProductRecord({
      ...req.body,
      image: req.file.filename,
    });
    const result = await productRecord.insert();
    res.status(201).send(result);
  });
