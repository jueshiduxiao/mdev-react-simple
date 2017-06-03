let state = {
    log: {
        filter: {
            provinceId: '-1',
            provinceName: '全部',
            provinceList: [],
            cityId: '',
            cityName: '',
            cityList: [],
            projectName: '',
            module: '-1',
            moduleText: '全部',
            moduleList: [
                {
                  "key": -1,
                  "value": "全部"
                },
                {
                  "key": 0,
                  "value": "楼盘管理"
                },
                {
                  "key": 1,
                  "value": "spider数据校对"
                },
                {
                  "key": 2,
                  "value": "新建楼盘审核"
                },
                {
                  "key": 3,
                  "value": "楼盘信息审核"
                },
                {
                  "key": 4,
                  "value": "spider楼盘更新监控"
                },
                {
                  "key": 5,
                  "value": "楼盘点评审核"
                },
                {
                  "key": 6,
                  "value": "点评审核记录"
                }
            ],
            operatorName: '',
            startTime: '',
            endTime: '',
            page: 0,
            pageSize: 10
        },
        table: {
            loading: false,
            list: []
        },
        page: {
            current: 1,
            total: 0
        }
    }
};

export default state;
