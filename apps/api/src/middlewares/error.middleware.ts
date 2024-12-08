// import { Request, Response, NextFunction } from 'express';

// import CustomError from '../errors/custom-errors';

// export const errorHandler = (
//   err: Error,
//   _req: Request,
//   res: Response,
//   /* eslint-disable-next-line */
//   _next: NextFunction,
// ) => {
//   if (err instanceof CustomError) {
//     const error = {
//       error: {
//         code: err.code,
//         message: err.getError(),
//       },
//     };
//     console.log(err.getError());
//     return res.status(err.getStatus()).json(error);
//   }
//   console.log(err.stack);
//   return res.status(500).json({ error: 'Internal Server Error' });
// };
