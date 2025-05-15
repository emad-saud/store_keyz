import { ProductImage } from '../models';
import AppError from '../utils/appError';
import catchAsync from '../utils/catchAsync';

export const createImages = catchAsync(async (req, res, next) => {
  if (!req.product)
    return next(new AppError('Please create a product first!', 400));

  const productId = req.product.id!;
  const files = req.body.productImages as string[];

  let imageRecords: any = [];
  if (req.body.productImages) {
    const images = files.map((el, index) => {
      return {
        name: el,
        productId,
      };
    });
    const records = await ProductImage.bulkCreate(images);
    imageRecords = records;
  }

  // console.log('IMAGES: ');
  // console.log(images);

  res.status(200).json({
    status: 'success',
    message: 'Created the product successfully!',
    data: {
      product: req.product,
      images: imageRecords,
    },
  });
});
