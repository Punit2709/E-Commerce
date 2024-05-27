class ApiFeatures {
    constructor(query, queryStr){
        this.query = query;
        this.queryStr = queryStr; // queryStr for URL query
    }

    search(){
        const keyword = this.queryStr.keyword ? {
            name:{
                $regex: this.queryStr.keyword,
                $options: "i" // i for case insensitive
            }
        } : {};

        this.query = this.query.find({...keyword});
        return this;
    }


    filter(){
        const queryStrCopy = {...this.queryStr}

        // not wanted fields
        const removeFields = ["keyword", "page", "limit"];
        removeFields.forEach(key => delete queryStrCopy[key]);

        // filter for Price
        let queryPrice = JSON.stringify(queryStrCopy);
        queryPrice =  queryPrice.replace(/\b(gt|gte|lt|lte)\b/g, key => `$${key}`)


        this.query = this.query.find(JSON.parse(queryPrice))
        return this;
    }
}

module.exports = ApiFeatures;