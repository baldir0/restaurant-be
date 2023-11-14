import { Router } from 'express';
import { RestaurantRecord } from '../records/restaurant.record';
import multer from 'multer';
import { setupStorage } from '../middleware/multer';
import {
  RestaurantEntityInsertRequest,
  RestaurantMapEntityRequest,
} from '../types';
import { DataFetchError, errMsg } from '../utils/errorHandler';

const storage = setupStorage('public/images/restaurants-icons');
const upload = multer({ storage });

export const restaurantRouter = Router()
  .get('/', async (req, res) => {
    const { page, items } = req.query;

    const result = await RestaurantRecord.getPage(
      parseInt(items as string),
      parseInt(page as string)
    );

    if (result.length <= 0) {
      throw new DataFetchError(errMsg.dataFetch.EmptyResults);
    }

    res.status(200).json(result);
  })

  .get('/count', async (req, res) => {
    const items = await RestaurantRecord.getRecordsNumber();
    res.status(200).json(items);
  })

  .get('/map', async (req, res) => {
    const { searchString }: RestaurantMapEntityRequest = req.body;
    const result = await RestaurantRecord.findAllAsMapPoints(searchString);

    if (result.length <= 0) {
      throw new DataFetchError(errMsg.dataFetch.EmptyResults);
    }
    res.status(200).json(result);
  })

  .get('/:id', async (req, res) => {
    const id = req.params.id;
    const result = await RestaurantRecord.findOne(id);

    if (!result) {
      throw new DataFetchError(errMsg.dataFetch.EmptyResults);
    }
    res.status(200).json(result);
  })

  .post('/', upload.single('image'), async (req, res) => {
    const data: RestaurantEntityInsertRequest = req.body;
    const NewRestaurantRecord = new RestaurantRecord({
      ...data,
      id: null,
      rating: null,
      image: req.file ? req.file.filename : null,
    });

    const RestaurantId = await NewRestaurantRecord.insert();
    res.status(201).json(RestaurantId);
  });
