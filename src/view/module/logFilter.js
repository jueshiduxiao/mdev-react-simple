import React from 'react';
import { Select, Input, DatePicker, Button } from 'antd';

const { Option } = Select;
const { RangePicker } = DatePicker;

class LogFilter extends React.Component {
    constructor(props) {
        super();
        this.state = Object.assign({}, props.filter);
    }
    selectProvice = (item) => {
        this.setState({ provinceId: item.key, provinceName: item.label });
        this.setState({ cityId: '-1', cityName: '全部' });
        this.props.action.logGetCity(item);
    }
    selectCity = (item) => {
        this.setState({ cityId: item.key, cityName: item.label });
    }
    projectNameChange = (e) => {
        this.setState({ projectName: e.target.value });
    }
    moduleChange = (item) => {
        this.setState({ module: item.key, moduleText: item.label });
    }
    operatorNameChange = (e) => {
        this.setState({ operatorName: e.target.value });
    }
    dateChange = (date, dateString) => {
        this.setState({ startTime: dateString[0], endTime: dateString[1] });
    }
    search = () => {
        let {
            provinceId,
            provinceName,
            cityId,
            cityName,
            module,
            moduleText,
            operatorName,
            projectName,
            startTime,
            endTime
        } = this.state;
        let params = Object.assign({}, {
            provinceId,
            provinceName,
            cityId,
            cityName,
            module,
            moduleText,
            operatorName,
            projectName,
            startTime,
            endTime
        });
        this.props.action.logSearch(params);
    }
    render() {
        const { filter } = this.props;
        const provinceList = filter.provinceList.map(item => {
            let id = item.provinceId.toString();
            return <Option value={id} key={id}>{item.provinceName}</Option>;
        });
        const cityList = filter.cityList.map(item => {
            let id = item.cityId.toString();
            return <Option value={id} key={id}>{item.cityName}</Option>;
        });
        const moduleList = filter.moduleList.map(item => {
            let id = item.key.toString();
            return <Option value={id} key={id}>{item.value}</Option>;
        });
        return (
            <div className="log-filter">
                <div className="row">
                    <span className="lable">省&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;份：</span>
                    <Select labelInValue value={{ key: this.state.provinceId, label: this.state.provinceName }}
                        onChange={this.selectProvice} style={{ width: 120 }}>
                        {provinceList}
                    </Select>
                    <span className="lable">城&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;市：</span>
                    <Select labelInValue value={{ key: this.state.cityId, label: this.state.cityName }}
                        onChange={this.selectCity} style={{ width: 120 }}>
                        {cityList}
                    </Select>
                    <span className="lable">楼盘名称：</span>
                    <Input onChange={this.projectNameChange} style={{ width: 200 }} />
                </div>
                <div className="row">
                    <span className="lable">来&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;源：</span>
                    <Select labelInValue defaultValue={{ key: this.state.module, label: this.state.moduleText }}
                        onChange={this.moduleChange} style={{ width: 120 }}>
                        {moduleList}
                    </Select>
                    <span className="lable">操&nbsp;&nbsp;作&nbsp;&nbsp;人：</span>
                    <Input onChange={this.operatorNameChange} style={{ width: 120 }} />
                    <span className="lable">操着时间：</span>
                    <RangePicker onChange={this.dateChange} style={{ width: 200 }} />
                    <Button type="primary" icon="search" onClick={this.search} style={{ marginLeft: 20 }}>Search</Button>
                </div>
            </div>
        );
    }
}

export default LogFilter;
