
export default function errorMiddleware(err, req, res, next) {
  if (res.headersSent) {
    return next(err);
  }

  const context = err.context || {};

  console.error('\n========== BACKEND ERROR LOGS ==========');

 console.error('API Method       :', req.method);
  console.error('API URL          :', req.originalUrl);

  console.error('Controller       :', context.controller || 'Unknown');
  console.error('File             :', context.file || 'Unknown');
  console.error('Function         :', context.function || 'Unknown');
  console.error('Operation        :', context.operation || 'Unknown');
  console.error('Layer            :', context.layer || 'Unknown');

  console.error('Error Message    :', err.message);
  console.error('Error Code       :', err.code || 'N/A');

  console.error('\nFull Error Details:');
  console.error(err);

  console.error('\nStack Trace:');
  console.error(err.stack);

  console.error('========== BACKEND ERROR LOGS END ==========\n');

  const statusCode = err.statusCode || 500;

  return res.status(statusCode).json({
    success: false,
    message:
      statusCode >= 500
        ? 'Internal server error'
        : err.message || 'Request failed',
  });
}