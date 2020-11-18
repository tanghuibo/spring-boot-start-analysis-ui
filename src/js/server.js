import request from './request';

export default {
    query() {
        return request.get("/beanStartAnalysis");
    }
}