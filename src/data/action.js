import format from '../lib/format.js';
import querystring from 'querystring';
import modal from '../view/ui/modal.js';

const hostApi = 'http://www.easy-mock.com/mock/596ccc11a1d30433d8359503/api';

let context = null;

let config = function (conf) {
    if (conf.context) {
        context = conf.context;
    }
};

let logGetCity = function (item) {
    fetch(hostApi + '/city/list?provinceId=' + item.key)
    .then(res => res.json())
    .then(data => {
        let state = Object.assign({}, context.state);
        state.log.filter.cityList = data.data;
        state.log.filter.cityList.unshift({ cityId: -1, cityName: '全部' });
        context.setState(state);
    })
    .catch(e => console.log(e));
};

let logSearch = function (params) {
    let state = Object.assign({}, context.state);
    let filter = Object.assign({}, state.log.filter, params);
    if (!params || !params.page) {
        filter.page = 1;
        state.log.page.current = 1;
    } else {
        state.log.page.current = filter.page;
    }
    state.log.filter = filter;
    state.log.table.loading = true;
    context.setState(state);

    let qdata = {};
    qdata.page = filter.page;
    qdata.pageSize = filter.pageSize;
    if (filter.provinceName && filter.provinceName !== '全部') {
        qdata.provinceName = filter.provinceName;
    }
    if (filter.cityName && filter.cityName !== '全部') {
        qdata.cityName = filter.cityName;
    }
    if (filter.module && filter.module !== '-1') {
        qdata.module = filter.module;
    }
    if (filter.operatorName) {
        qdata.operatorName = filter.operatorName;
    }
    if (filter.projectName) {
        qdata.projectName = filter.projectName;
    }
    if (filter.startTime) {
        qdata.startTime = +new Date(filter.startTime);
    }
    if (filter.endTime) {
        qdata.endTime = +new Date(filter.endTime);
    }
    let qs = querystring.stringify(qdata);
    fetch(hostApi + '/record/list?' + qs)
    .then(res => res.json())
    .then(data => {
        let state = Object.assign({}, context.state);
        let fn = function (mid) {
            let mtext = '';
            state.log.filter.moduleList.forEach(item => {
                if (item.key === mid) {
                    mtext = item.value;
                }
            });
            return mtext;
        };
        state.log.table.list = data.data.list.map(item => {
            item.operateTime = format.dateToString(item.operateTime);
            item.moduleText = fn(item.module);
            return item;
        });
        state.log.page.total = data.data.total;
        state.log.table.loading = false;
        context.setState(state);
    })
    .catch(e => {
        let state = Object.assign({}, context.state);
        state.log.table.loading = false;
        context.setState(state);
        modal.success('系统提示', '数据加载失败！');
    });
};

let logInit = function () {
    fetch(hostApi + '/city/province')
    .then(res => res.json())
    .then(data => {
        let state = Object.assign({}, context.state);
        state.log.filter.provinceList = data.data;
        state.log.filter.provinceList.unshift({ provinceId: -1, provinceName: '全部' });
        context.setState(state);
        logSearch();
    })
    .catch(e => console.log(e));
};

export default {
    config,
    logInit,
    logGetCity,
    logSearch
};
