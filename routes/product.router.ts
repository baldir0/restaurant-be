import { Router } from 'express';
import multer from 'multer';
import { ProductRecord } from '../records/product.record';
import { setupStorage } from '../middleware/multer';
import { DataFetchError, errMsg } from '../utils/errorHandler';
import { ProductEntityInsertRequest } from '../types';

const storage = setupStorage('public/images/products-icons');
const upload = multer({ storage });

export const productRouter = Router()
  .get('/:restaurantId', async (req, res) => {
    const restaurantId = req.params.restaurantId;
    const result = await ProductRecord.getList(restaurantId);

    if (result.length <= 0) {
      throw new DataFetchError(errMsg.dataFetch.EmptyResults);
    }

    res.status(302).json(result);
  })
  .post('/', upload.single('image'), async (req, res) => {
    const data: ProductEntityInsertRequest = req.body;
    const NewProductRecord = new ProductRecord({
      ...data,
      id: null,
      image: req.file ? req.file.filename : null,
    });
    const result = await NewProductRecord.insert();
    res.status(201).json(result);
  });
