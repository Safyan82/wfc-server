import { Request, Response } from "express";

export interface  Context {
  req: any,
  res: any
  user?: any;
}