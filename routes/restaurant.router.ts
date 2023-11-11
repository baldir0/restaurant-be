import { Router } from "express";
import { RestaurantRecord } from "../records/restaurant.record";
import multer from "multer";

const upload = multer({ dest: "uploads/restaurants-icons" });

export const restaurantRouter = Router()
  .get("/", async (req, res) => {
    const result = await RestaurantRecord.getPage(15, parseInt(req.query.page as string))
    if (result.length > 0) {
      res.status(302).send(result);
      return;
    }
    res.sendStatus(404);
  })
  .get("/map", async (req, res) => {
    const result = await RestaurantRecord.findAllAsMapPoints(req.body.searchString);
    if (result.length > 0) {
      res.status(302).send(result);
      return;
    }
    res.sendStatus(404);
  })
  .get("/:id", async (req, res) => {
    const result = await RestaurantRecord.findOne(req.params.id);
    if (result.length > 0) {
      res.status(302).send(result);
      return;
    }
    res.sendStatus(404);
  })
  .post("/", upload.single("image"), async (req, res) => {
    const restaurantRecord = new RestaurantRecord({
      ...req.body,
      image: req.file.filename,
    });
    const result = await restaurantRecord.insert();
    res.status(201).send(result);
  });
