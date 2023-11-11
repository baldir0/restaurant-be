import { Router } from "express";
import { RestaurantRecord } from "../records/restaurant.record";
import multer from "multer";
import { setupStorage } from "../middleware/multer";

const storage = setupStorage("public/images/restaurants-icons");
const upload = multer({storage});

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
    if (result) {
      res.status(302).send(result);
      return;
    }
    res.sendStatus(404);
  })
  .post("/", upload.single("image"), async (req, res) => {
    console.log('REQUEST')
    console.log(req.body)
    const restaurantRecord = new RestaurantRecord({
      ...req.body,
      image: req.file.filename,
    });
    const result = await restaurantRecord.insert();
    res.status(201).send(result);
  });
