export class ApiFeatures {
    constructor(mongooseQuery, searchQuery) {
        this.mongooseQuery = mongooseQuery
        this.searchQuery = searchQuery
    }
    paginate() {
        const limit = 2
        let pageNumber = (this.searchQuery.page) * 1 || 1
        if (pageNumber < 0) pageNumber = 1
        this.pageNumber = pageNumber
        let skip = (pageNumber - 1) * limit
        this.mongooseQuery.skip(skip).limit(limit)
        return this
    }
    filter(){
        let filterObj = structuredClone(this.searchQuery)
        filterObj = JSON.stringify(filterObj)
        filterObj.replace(/(gt|gte|lt|lte)/g, value => `$${value}`)
        filterObj = JSON.parse(filterObj)
        let excludedFields = ['sort', 'search', 'page', "fields"]
        excludedFields.forEach(val => {
            delete filterObj[val]
        })
        this.mongooseQuery.find(filterObj)
         return this
    }
    sort(){
        if (this.searchQuery.sort) {
            let sortedBy = this.searchQuery.sort.split(',').join(' ')
            this.mongooseQuery.sort(sortedBy)
        }
        return this
    }
    fields(){
        if (this.searchQuery.fields) {
            let fields = this.searchQuery.fields.split(',').join(' ')
            this.mongooseQuery.select(fields)
        }
        return this
    }
    search(){
        if (this.searchQuery.search) {
             this.mongooseQuery.find({
                $or:[
                    {title:{$regex:this.searchQuery.search , $options:'i'}},
                    {desc:{$regex:this.searchQuery.search , $options:'i'}}
                ]
            })
        }
        return this 
    }
}