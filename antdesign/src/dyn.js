import React, { useEffect, useState } from 'react';
import { Table, Tag, Select } from 'antd';
import { Area } from '@ant-design/charts';

function Dynamic() {
    const [columns, setColumns] = useState([]);
    const [dataSource, setDataSource] = useState([]);
    const [areaData, setAreaData] = useState([]);
    const [selectedField, setSelectedField] = useState(null);
    const dataType = 'comments';

    useEffect(() => {
        fetch(`https://dummyjson.com/${dataType}`)
            .then((res) => res.json())
            .then((result) => {
                const list = result[dataType] || [];
                const firstObject = list[0] || {};
                const cols = [];

                for (const key in firstObject) {
                    let render = (value) => <span>{String(value)}</span>;

                    if (typeof firstObject[key] === 'object') {
                        if (Array.isArray(firstObject[key])) {
                            render = (value) => (
                                <span>
                                    {value.map((tag) => (
                                        <Tag>{tag}</Tag>
                                    ))}
                                </span>
                            );
                        } else {
                            render = (value) => (
                                <span>
                                    {Object.keys(value).map((key) => (
                                        <div>
                                            {key}:{value[key]}
                                        </div>
                                    ))}
                                </span>
                            );
                        }
                    }

                    const col = {
                        title: String(key).charAt(0).toUpperCase() + String(key).slice(1),
                        dataIndex: key,
                        render: render,
                    };
                    cols.push(col);
                }

                setColumns(cols);
                setDataSource(list);
            });
    }, []);

    useEffect(() => {
        if (selectedField && dataSource.length > 0) {
            const areaData = dataSource.map((item, index) => ({
                x: 'Row ' + (index + 1),
                y: item[selectedField],
            }));
            setAreaData(areaData);
        }
    }, [selectedField, dataSource]);

    const config = {
        data: areaData,
        xField: 'x',
        yField: 'y',
        areaStyle: { fill: 'rgba(255,255,255,0.5)' },
    };

    const handleFieldChange = (value) => {
        setSelectedField(value);
    };

    return (
        <div>
            <Select onChange={handleFieldChange}>
                {columns.map((column) => (
                    <Select.Option value={column.dataIndex}>{column.title}</Select.Option>
                ))}
            </Select>
            <Table columns={columns} dataSource={dataSource} scroll={{ y: 500 }} />
            <Area {...config} />
        </div>
    );
}

export default Dynamic;
