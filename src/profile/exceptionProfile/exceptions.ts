import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Catch(NotFoundException, BadRequestException, PrismaClientKnownRequestError)
export class ProfileExceptionFilter implements ExceptionFilter {
  catch(
    exception:
      | NotFoundException
      | BadRequestException
      | PrismaClientKnownRequestError,
    host: ArgumentsHost,
  ) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    let status = 500;
    let message = 'Internal server error';

    if (exception instanceof NotFoundException) {
      status = 404;
      message = 'Resource not founds';
    } else if (exception instanceof BadRequestException) {
      status = 400;
      message = 'Bad request';
    } else if (exception instanceof PrismaClientKnownRequestError) {
      status = 400;
      message = 'Prisma error';
    }

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message: message,
    });
  }
}
