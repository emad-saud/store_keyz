import { RequestHandler, Request, Response, NextFunction } from 'express';

import { Model, ModelStatic, WhereOptions, Attributes } from 'sequelize';

import catchAsync from '../utils/catchAsync';
import AppError from '../utils/appError';

export const getAll = <T extends Model>(model: ModelStatic<T>) => {
  return catchAsync(async (req, res, next) => {
    const data = await model.findAll();

    res.status(200).json({
      status: 'success',
      data,
    });
  });
};

export const getOne = <T extends Model>(
  model: ModelStatic<T>,
  identifierSource: string
) => {
  return catchAsync(async (req, res, next) => {
    const [_src, _id] = identifierSource.split(':') as [
      'params' | 'body',
      string
    ];

    const id = req[_src][_id];
    if (!id) {
      console.log(`couldn't find id in ${_src}.${_id}`);
      return next(
        new AppError(`Identifier [${_id}] is required in [${_src}].`, 400)
      );
    }

    const data = await model.findOne({
      where: {
        id,
      },
    });

    res.status(200).json({
      status: 'success',
      data,
    });
  });
};

export const createOne = <T extends Model>(
  model: ModelStatic<T>,
  fields: (keyof Attributes<T>)[]
) => {
  return catchAsync(async (req, res, next) => {
    const record = await model.create(req.body, {
      fields,
    });

    res.status(200).json({
      status: 'success',
      data: record,
    });
  });
};

export const deleteOne = <T extends Model>(
  model: ModelStatic<T>,
  identifierSource: string
) => {
  return catchAsync(async (req, res, next) => {
    const [_src, _id] = identifierSource.split(':') as [
      'params' | 'body',
      string
    ];

    const id = req[_src][_id];

    if (!id) {
      return next(
        new AppError(`Identifier [${_id}] is required in [${_src}].`, 400)
      );
    }

    const numOfDeletedRows = await model.destroy({
      where: {
        id,
      },
    });

    res.status(201).json({
      status: 'success',
      data: numOfDeletedRows,
    });
  });
};

export const updateOneFactory = <T extends Model>(
  model: ModelStatic<T>,
  identifier: string,
  fields: (keyof Attributes<T>)[]
) => {
  return catchAsync(async (req, res, next) => {
    const [_src, _id] = identifier.split(':') as ['params' | 'body', string];
    const id = req[_src][_id];

    const where = {
      id,
    } as WhereOptions<Attributes<T>>;

    const updatedRecord = await model.update(req.body, {
      where,
      fields,
      returning: true,
    });

    res.status(200).json({
      status: 'success',
      data: updatedRecord,
    });
  });
};
