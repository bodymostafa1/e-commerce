export const paginate = async (queryPage,limit,model) => {
    let pageNumber = (queryPage) * 1 || 1
    if(pageNumber < 0) pageNumber = 1
    let skip = (pageNumber - 1) * limit
    let documents = await model.find().skip(skip).limit(limit)
    return {documents,pageNumber}
}