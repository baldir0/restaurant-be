import { Router, Request } from "express";
import { RestaurantRecord } from "../records/restaurant.record";
import multer from "multer";
import { setupStorage } from "../middleware/multer";
import {
  RestaurantEntityListRequest,
  RestaurantEntityListRequestQuery,
} from "../types";
import { DataFetchError, errMsg } from "../utils/errorHandler";

const storage = setupStorage("public/images/restaurants-icons");
const upload = multer({ storage });

export const restaurantRouter = Router()
  .get("/", async (req, res) => {
    const page = req.query.page.toString();
    const { itemsPerPage }: RestaurantEntityListRequest = req.body;

    const result = await RestaurantRecord.getPage(itemsPerPage, parseInt(page));

    if (result.length <= 0) {
      throw new DataFetchError(errMsg.dataFetch.EmptyResults)
    }

    res.status(302).send(result);
  })
  .get("/map", async (req, res) => {
    const result = await RestaurantRecord.findAllAsMapPoints(
      req.body.searchString
    );
    if (result.length > 0) {
      res.status(302).send(result);
      return;
    }
    res.sendStatus(404);
  })
  .get("/:id", async (req, res) => {
    const result = await RestaurantRecord.findOne(req.params.id);

    if (!result) {
      throw new DataFetchError(errMsg.dataFetch.EmptyResults);
    }
    res.status(302).send(result);
  })
  .post("/", upload.single("image"), async (req, res) => {
    console.log("REQUEST");
    console.log(req.body);
    const restaurantRecord = new RestaurantRecord({
      ...req.body,
      image: req.file.filename,
    });
    const result = await restaurantRecord.insert();
    res.status(201).send(result);
  });
