const filterFeature = async (req, res, next, model) => {
  const queryLocation = req.query.location || '';
  const queryCategory = req.query.category || '';
  const queryLimit = parseInt(req.query.limit);
  const queryTables = req.baseUrl.substring(1);
  const querySort = req.query.sort || 'DESC';
  const queryPage = req.query.page || 1;
  const queryField = req.query.field || 'updatedAt';
  const categoryQuery = req.query.type || '';
  console.log(categoryQuery);

  const limit = queryLimit || 8;

  // response data
  const dataResponse = {};

  const startIndex = (queryPage - 1) * limit || 0;
  // searching product

  // GET DATA FROM MODELS
  await model(
    queryLocation,
    queryCategory,
    limit,
    queryTables,
    queryField,
    querySort,
    startIndex,
    categoryQuery
  )
    .then((result) => {
      // res.status(200).json(result);
      // return;

      const { totalData, limit, data, totalPage, statusCode, errorMessage } =
        result;
      // totalPage

      dataResponse.meta = {
        location: queryLocation,
        category: queryCategory,
        totalData,
        totalPage: totalPage || 1,
        currentPage: queryPage,
        limit,
        sortBy: `${queryField} ${querySort}`,
      };

      dataResponse.data = data;
      dataResponse.error = {
        statusCode,
        message: errorMessage,
      };

      // Image Condition - Only return one image
      const getDataResult = dataResponse.data;
      // console.log(getDataResult);
      getDataResult.forEach((item) => {
        const getImageResponse = item.images;
        if (getImageResponse) {
          const parseToArray = getImageResponse.split(',').shift();
          item.images = parseToArray;
        }
      });

      // console.log(dataResponse);
      res.result = dataResponse;
    })
    .catch(next);
  next();
};

module.exports = filterFeature;
