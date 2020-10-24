const advanceResults = (model, populate = null) => async(req, res, next) => {
    let query;

    const { filter = {} } = req.body;
    console.log('filter'.black.bgYellow, filter);

    // Copy req.query
    let reqQuery = {...req.query, ...filter};

    // Fields to exclude
    const removeFields = ['select', 'sort', 'page', 'limit', 'filter'];

    // Loop over removeFields and delete them from reqQuery
    removeFields.forEach(param => delete reqQuery[param]);

    console.log('reqQuery'.bgYellow, reqQuery);
    

    // Create query string
    let queryStr = JSON.stringify(reqQuery);

    // Create operators ($gt, $gte, etc)
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`);

    // Finding resource
    //query = model.find(JSON.parse(queryStr)).populate(populate);
    query = model.find(JSON.parse(queryStr));

    if (req.query.select) {
        const fields = req.query.select.split(',').join(' ');
        query = query.select(fields);
    }

     // Sort
     if (req.query.sort) {
        const sortBy = req.query.sort.split(',').join(' ');
        query = query.sort(sortBy);
    } else {
        query = query.sort('-createdAt');
    }

    if(populate) {
        query = query.populate(populate);
    }

    // Executing query
    const results = await query;

    res.advancedResults = {
        success: true,
        count: results.length,
        data: results
    };

    next();
};

module.exports = advanceResults;