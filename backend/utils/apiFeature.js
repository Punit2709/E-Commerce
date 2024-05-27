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
}

module.exports = ApiFeatures;