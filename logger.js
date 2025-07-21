

export const logAction = (actionType, data) => {
  console.log(`[ACTION]: ${actionType}`, data);
};

export const logError = (errorType, message) => {
  console.error(`[ERROR]: ${errorType} - ${message}`);
};
