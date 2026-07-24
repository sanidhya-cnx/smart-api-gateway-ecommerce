class ApiResponse{
    constructor(
        success,
        message,
        data = null,
        meta = null
    ){
        this.success = success;
        this.message = message;
        if(data != null){
            this.data = data;
        }
        if(meta != null){
            this.meta = meta;
        }
    }
}

module.exports = ApiResponse;