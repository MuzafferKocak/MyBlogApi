"use strict";
/*------------------------------------------------
|     //? Express - My Blog Api
-------------------------------------------------*/

//* FILTERING & SEARCHING & SORTING & PAGINATION */

module.exports = (req, res, next) => {
  //* ### FILTERING ###

  //? URL?filter[key1]=value1&filter[key2]=value2
  const filter = req.query?.filter || {};
  

  //* ### SEARCHING ###

  const search = req.query?.search || {};
  
  //? const example = { title: { $regex: 'test', $options: 'i' } } // const example = { title: /test/ }
  for (let key in search) search[key] = { $regex: search[key], $options: "i" };
  

  //* ### SORTING ###

  //? URL?sort[key1]=asc&sort[key2]=desc
  //* asc: A-Z - desc: Z-A
  const sort = req.query?.sort || {};

  //* ### PAGINATION ###

  //? URL?page=3&limit=10
  let limit = Number(req.query?.limit);

  limit = limit > 0 ? limit : Number(process.env.PAGE_SIZE || 20);

  let page = Number(req.query?.page);
  page = page > 0 ? page - 1 : 0;

  let skip = Number(req.query?.skip);
  skip = skip > 0 ? skip : page * limit;

  //* FILTERING & SEARCHING & SORTING & PAGINATION */

  //* Run for output:
  res.getModelList = async (Model, customFilter = {}, populate = null) => {
    return await Model.find({ ...filter, ...search, ...customFilter })
      .sort(sort)
      .skip(skip)
      .limit(limit)
      .populate(populate);
  };

  //* Details:
  res.getModelListDetails = async (Model, customFilter = {}) => {
    const data = await Model.find({ ...filter, ...search, ...customFilter });

    let details = {
      filter,
      search,
      sort,
      skip,
      limit,
      page,
      pages: {
        previous: page > 0 ? page : false,
        current: page + 1,
        next: page + 2,
        total: Math.ceil(data.length / limit),
      },
      totalRecords: data.length,
    };
    details.pages.next =
      details.pages.next > details.pages.total ? false : details.pages.next;
    if (details.totalRecords <= limit) details.pages = false;
    return details;
  };

  next();
};
