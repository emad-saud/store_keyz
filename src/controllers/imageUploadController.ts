import multer, { FileFilterCallback } from 'multer';
import sharp from 'sharp';
import { Request } from 'express';
import { v4 } from 'uuid';
import path from 'path';
import fs from 'fs';
import axios from 'axios';

import catchAsync from '../utils/catchAsync';
import AppError from '../utils/appError';
import imagekit from '../config/imagekit';

const storage = multer.memoryStorage();
const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: FileFilterCallback
) => {
  // console.log(req);
  // console.log('#'.repeat(10));
  // console.log(file);

  if (file.mimetype.startsWith('image')) {
    console.log('file is coming!');
    // console.log(file);
    cb(null, true);
  } else {
    cb(new AppError('Only images are allowed!', 400));
  }
};

const upload = multer({
  storage,
  fileFilter,
});

const uploadCategoryImage = upload.single('categoryImage');

const uploadProductImages = upload.fields([
  { name: 'productImages', maxCount: 10 },
]);

const resizeCategoryImage = catchAsync(async (req, res, next) => {
  if (!req.file) return next();

  const image = sharp(req.file.buffer);
  req.body.image = `${req.user!.id}-${Date.now()}-category.jpeg`;

  // console.log('BODY: ');
  // console.log(req.body);

  const resizedImage = await image
    .resize(500, 500)
    .jpeg()
    // .toFile(`public/imgs/categories/${req.body.image}`);
    .toBuffer();

  const base64Image = resizedImage.toString('base64');

  const response = await imagekit.upload({
    file: base64Image,
    fileName: req.body.image,
  });

  req.body.image = response.url;

  next();
});

const resizeProductImages = catchAsync(async (req, res, next) => {
  // console.log(req.files);

  if (!req.files || !(req.files as any)['productImages']) return next();
  const images = (req.files as any)['productImages'] as Express.Multer.File[];

  const outDir = 'public/imgs/products';
  req.body.productImages = [];

  await Promise.all(
    images.map(async (file, index) => {
      const filename = `${v4()}-${Date.now()}-${index + 1}.jpeg`;
      const fileBuffer = await sharp(file.buffer)
        .resize(500, 500)
        .jpeg()
        .toBuffer();
      const response = await imagekit.upload({
        file: fileBuffer,
        fileName: filename,
      });
      req.body.productImages.push(response.url);
    })
  );

  next();
});

export {
  resizeCategoryImage,
  resizeProductImages,
  upload,
  uploadProductImages,
  uploadCategoryImage,
};
