import { Request, Response } from 'express';
import { MarketplaceService } from './marketplace.service';
import sendResponse from '../../utils/sendResponse';

const getProducts = async (req: Request, res: Response) => {
    const result = await MarketplaceService.getAllProducts(req.query);
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Products fetched successfully",
        meta: result.meta,
        data: result.data
    });
};

export const MarketplaceController = {
    getProducts
};