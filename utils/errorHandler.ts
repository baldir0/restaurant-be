import { NextFunction, Request, Response } from "express";

export class InsertionError extends Error {}
export class FileAccessError extends Error {}

export const errorHandler = (err: Error, req: Request, res: Response, next:NextFunction) => {
  if (err instanceof InsertionError) res.status(409).json({message: err.message})
  else res.status(400).json({message: "An Error Occured. Sorry."})

  console.log(`[${new Date().toLocaleString()}] ${err.message}`)
};
