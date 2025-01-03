// middleware/errorHandler.js

export const errorHandler = (err, req, res, next) => {
    console.error(err);  // Log the error details (for dev/debugging)
    
    // Handle specific error types (optional)
    if (err.name === 'ValidationError') {
      return res.status(400).json({ message: 'Validation Error', errors: err.errors });
    }
  
    if (err.name === 'MongoError' && err.code === 11000) {
      return res.status(400).json({ message: 'Duplicate key error', details: err.keyValue });
    }
  
    // Default server error response
    res.status(500).json({ message: 'Internal Server Error', error: err.message });
  };
  