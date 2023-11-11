import { Router } from "express";
import { RestaurantRecord } from "../records/restaurant.record";
import multer from "multer";
import { setupStorage } from "../middleware/multer";
import {
  RestaurantEntityInsertRequest,
  RestaurantEntityListRequest,
  RestaurantMapEntityRequest,
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
      throw new DataFetchError(errMsg.dataFetch.EmptyResults);
    }

    res.status(302).send(result);
  })
  .get("/map", async (req, res) => {
    const { searchString }: RestaurantMapEntityRequest = req.body;
    const result = await RestaurantRecord.findAllAsMapPoints(searchString);

    if (result.length <= 0) {
      throw new DataFetchError(errMsg.dataFetch.EmptyResults);
    }
    res.status(302).send(result);
  })
  .get("/:id", async (req, res) => {
    const id = req.params.id;
    const result = await RestaurantRecord.findOne(id);

    if (!result) {
      throw new DataFetchError(errMsg.dataFetch.EmptyResults);
    }
    res.status(302).send(result);
  })
  .post("/", upload.single("image"), async (req, res) => {
    const data: RestaurantEntityInsertRequest = req.body;
    const NewRestaurantRecord = new RestaurantRecord({
      ...data,
      id: null,
      rating: null,
      image: req.file.filename,
    });

    const RestaurantId = await NewRestaurantRecord.insert();
    res.status(201).send(RestaurantId);
  });
