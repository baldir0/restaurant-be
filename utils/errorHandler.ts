import { NextFunction, Request, Response } from "express";

export const errMsg = {
  dataFetch: {
    EmptyResults: "Cannot find any matching records."
  }
}

export class InsertionError extends Error {}
export class FileAccessError extends Error {}
export class DataFetchError extends Error {}

export const errorHandler = (err: Error, req: Request, res: Response, next:NextFunction) => {
  switch (err.constructor) {
    case DataFetchError:
      res.status(404).json({message: err.message})
    break;
    case InsertionError:
      res.status(409).json({message: err.message})
    break;
    default: 
      res.status(400).json({message: "An Error Occured. Sorry."})
    break;
  }
};
