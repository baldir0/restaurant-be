import { NextFunction, Request, Response } from 'express';

export const errMsg = {
  dataFetch: {
    EmptyResults: 'Cannot find any matching records.',
  },
  dataInsert: {
    ObjectAlreadyExistsInDb: 'Object already exists in DB.',
    FailedToInsert: 'Cannot insert data.',
  },
};

export class DataInsertError extends Error {}
export class FileAccessError extends Error {}
export class DataFetchError extends Error {}

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  switch (err.constructor) {
    case DataFetchError:
      res.status(404).json({ message: err.message });
      break;
    case DataInsertError:
      res.status(409).json({ message: err.message });
      break;
    default:
      console.error(err.message);
      res.status(400).json({ message: 'An Error Occured. Sorry.' });
      break;
  }
};
