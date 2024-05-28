
import { Table, Space } from "antd";
import { Scatter} from '@ant-design/charts';
import { useState, useEffect } from "react";
import axios from "axios";
import './api.css'

function Fetchapi() {
    const [dataSource, setDataSource] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchRecords(1);
    }, []);
    const columns = [
        {
            title: "API",
            dataIndex: "API",
        },
        {
            title: "Description",
            dataIndex: "Description",
        },
        {
            title: "Auth",
            dataIndex: "Auth",
        },
        {
            title: "HTTPS",
            dataIndex: "HTTPS",
        },
        {
            title: "Cors",
            dataIndex: "Cors",
        },
        {
            title: "Link",
            dataIndex: "Link",
        },
        {
            title: "Category",
            dataIndex: "Category",
        },
    ];

    const fetchRecords = (page) => {
        setLoading(true);
        axios
            .get(`https://api.publicapis.org/entries`)
            .then((res) => {
                setDataSource(res.data.entries);
                setTotalPages(res.data.totalPages);
                setLoading(false);
            });
    };
    const chartData = dataSource.map((record, index) => ({
        index,
        value: record.API.length, 
        category: record.Category,
    }));

    const config = {
        appendPadding: 10,
        data: chartData,
        xField: 'index',
        yField: 'value',
        colorField: 'category',
        size: 4,
        yAxis: {
            title: {
                text: 'API Name Length',
            },
            nice: true,
        },
        xAxis: {
            title: {
                text: 'API Index',
            },
        },
        tooltip: {
            showMarkers: false,
            showCrosshairs: true,
            shared: true,
        },
    };
    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <Space direction="vertical" style={{ width: '100%' }}>
                <div className="table-container">
                <Table
                    loading={loading}
                    columns={columns}
                    dataSource={dataSource}
                    pagination={{
                        pageSize: 10,
                        total: totalPages,
                        onChange: (page) => {
                            fetchRecords(page);
                        },
                        }}

                        style={{ tableLayout: 'auto' }}
                    />
                </div>
                <Scatter {...config}
                    xAxis={{ title: { text: 'API Index' } }}
                    yAxis={{ title: { text: 'API Name Length' } }}/>
            
            </Space>
        </div>
    );
}

export default Fetchapi;