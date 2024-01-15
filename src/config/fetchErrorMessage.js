const isFetchBaseQueryErrorType = (error) => {
  try {
    if ("data" in error && "message" in error?.data) {
      return error.data.message;
    }
  } catch (err) {
    console.log(err);
  }
};

export default isFetchBaseQueryErrorType;