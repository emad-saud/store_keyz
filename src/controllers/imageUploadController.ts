import multer, { FileFilterCallback } from 'multer';
import sharp from 'sharp';
import { Request } from 'express';
import { v4 } from 'uuid';
import path from 'path';
import fs from 'fs';

import catchAsync from '../utils/catchAsync';
import AppError from '../utils/appError';

// Create the "public/imgs/*" directories in they don't exist!
const outputDirs = ['products', 'categories'];
outputDirs.forEach((el) => {
  const dirName = path.join(__dirname, `./public/imgs/${el}`);
  if (!fs.existsSync(dirName)) {
    fs.mkdirSync(dirName, { recursive: true });
  }
});

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

  await image
    .resize(500, 500)
    .toFormat('jpeg')
    .jpeg({ quality: 90 })
    .toFile(`public/imgs/categories/${req.body.image}`);

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
      await sharp(file.buffer)
        .resize(800, 800)
        .toFormat('jpeg')
        .toFile(path.join(outDir, filename));

      req.body.productImages.push(filename);
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
