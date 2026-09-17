import { Router, type Request, type Response } from "express";
// import Zod validators
import {
  zUserId,
  zItemId,
  zItemPostBody,
  zItemPutBody,
  zItemDeleteBody
} from "../libs/zodValidators.js";
// import types
import type { Item } from "../libs/types.ts";
// import database
import { items } from "../db/db.js";
//import uuid
import { v4 as uuidv4 } from 'uuid';
import { success } from "zod";
import { users } from "../db/db.js";

import type { User, UserPayload, CustomRequest } from "../libs/types.ts";
import { authenticateToken } from "../middlewares/authenMiddleware.ts";

const router = Router();

// GET /api/vXXX/items/:userId 
router.get("/:userId", authenticateToken, (req: CustomRequest, res: Response) => {
  try {
    const userId = req.params.userId;
    const parseResult = zUserId.safeParse(userId);
    const token = req.query.authenticateToken;
    
    if (!parseResult.success) {
      return res.status(400).json({
        message: "Validation failed",
        errors: parseResult.error.issues[0]?.message,
      });
    }

    // หนูไม่แน่ใจกับเรื่องนี้ แต่ก็คือดึงโทเคนจากพารามมา แล้วก็เอาไปเช็คกับที่เรามีอยู่ว่าตรงกันไหม
    // if(token !== userId) {
    //   return res.status(400).json({
    //     success: false,
    //     message: "Forbidden access"
    //   });
    // }

    const itemFilter = items.filter(
      (i: Item) => i.userId === userId
    );

    if (itemFilter.length <= 0) {
      return res.status(404).json({
        success: false,
        message: `items for user ID ${userId} not found`,
      });
    }

    res.status(200).json({
      success: true,
      data: itemFilter
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Something is wrong, please try again",
      error: err,
    });
  }

});

// POST /api/vXXX/items/:userId, body = {new item data}
// add a new Item for userId
router.post("/",async (req: Request, res: Response) => {
  
  res.status(201).json({
    success: true,
  });
  
});

// Delete /api/vXXX/items/:userId


export default router;