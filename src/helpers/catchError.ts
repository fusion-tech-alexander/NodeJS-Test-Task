import { Handler } from 'express';

function wrap(handler) {
  return async function (req, res, next): Promise<Handler> {
    try {
      await handler(req, res, next);
    } catch (error) {
      return next(error);
    }
  };
}

const wrapController = (controller) => {
  Object.keys(controller).forEach((handlerKey) => {
    controller[handlerKey] = wrap(controller[handlerKey]);
  });
};

export default wrapController;
