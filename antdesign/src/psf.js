
import { Table, Space } from "antd";
import { Line } from '@ant-design/charts';
import './antd.css'
import "./App.css";
import { useState, useEffect } from 'react'
function Pagin() {
    const [loading, setLoading] = useState(false)
    const [dataSource, setDataSource] = useState([])
    const [page, setPage] = useState(1)
    const [pageSize, setPageSize] = useState(10)
    useEffect(() => {
        setLoading(true)
        fetch("https://jsonplaceholder.typicode.com/todos")
            .then(response => response.json())
            .then(data => {
                setDataSource(data)
            }).catch(err => {
                console.log(err)
            }).finally(() => {
                setLoading(false)
            })

    }, [])

    const columns = [
        {
            key: "1",
            title: 'ID',
            dataIndex: 'id'
        },
        {
            key: "2",
            title: 'User ID',
            dataIndex: 'userId',
            sorter: (record1, record2) => {
                return record1.userId > record2.userId
            }
          

        },
        {
            key: "3",
            title: 'Status',
            dataIndex: 'completed',
            render: (completed) => {
                return < p > {completed ? 'Complete' : 'In Progress'}</p >
            },

            filters: [
                { text: 'Complete', value: true },
                { text: 'In Progress', value: false }

            ],
            onFilter: (value, record) => {
                return record.completed === value

            }
        },
    ]
    // Prepare data for the line chart
    const chartData = dataSource.reduce((acc, record) => {
        const status = record.completed ? 'Complete' : 'In Progress';
        const index = acc.findIndex(item => item.userId === record.userId && item.status === status);
        if (index > -1) {
            acc[index].count += 1;
        } else {
            acc.push({ userId: record.userId, status, count: 1 });
        }
        return acc;
    }, []);

    const config = {
        data: chartData,
        xField: 'userId',
        yField: 'count',
        seriesField: 'status',
    };

    return (
        <div className="App">
            <header className="App-header">
                <Space direction="vertical" style={{ width: '100%' }}>
                    <Table
                        loading={loading}
                        columns={columns}
                        dataSource={dataSource}
                        pagination={{
                            current: page,
                            pageSize: pageSize,
                            total: 500,
                            onChange: (page, pageSize) => {
                                setPage(page);
                                setPageSize(pageSize)
                            }
                        }}
                    />
                    <Line {...config} />
                </Space>
            </header>
        </div>
    );
}

export default Pagin;