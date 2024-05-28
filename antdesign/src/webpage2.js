import './w2.css';
import { Button, Input, Table } from "antd";
import { useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { Pie } from "@ant-design/charts";
function Webpage2() {
    const [dataSource, setDataSource] = useState([
        {
            name: "John",
            age: 32,
            address: "New York",
        },
        {
            name: "Jim",
            age: 33,
            address: "Sydney",
        },
        {
            name: "David",
            age: 40,
            address: "Japan",
        },
        {
            name: "James",
            age: 32,
            address: "New York",
        },
        {
            name: "Sam",
            age: 40,
            address: "Sydney",
        },
        {
            name: "John",
            age: 32,
            address: "New York",
        },
        {
            name: "Jim",
            age: 33,
            address: "Sydney",
        },
        {
            name: "David",
            age: 40,
            address: "Japan",
        },
        {
            name: "James",
            age: 32,
            address: "New York",
        },
        {
            name: "Sam",
            age: 40,
            address: "Sydney",
        },
    ]);
    const columns = [
        {
            title: "Name",
            dataIndex: "name",
            filterDropdown: ({
                setSelectedKeys,
                selectedKeys,
                confirm,
                clearFilters,
            }) => {
                return (
                    <>
                        <Input
                            autoFocus
                            placeholder="Type text here"
                            value={selectedKeys[0]}
                            onChange={(e) => {
                                setSelectedKeys(e.target.value ? [e.target.value] : []);
                                confirm({ closeDropdown: false });
                            }}
                            onPressEnter={() => {
                                confirm();
                            }}
                            onBlur={() => {
                                confirm();
                            }}
                        ></Input>
                        <Button
                            onClick={() => {
                                confirm();
                            }}
                            type="primary"
                        >
                            Search
                        </Button>
                        <Button
                            onClick={() => {
                                clearFilters();
                            }}
                            type="danger"
                        >
                            Reset
                        </Button>
                    </>
                );
            },
            filterIcon: () => {
                return <SearchOutlined />;
            },
            onFilter: (value, record) => {
                return record.name.toLowerCase().includes(value.toLowerCase());
            },
        },
        {
            title: "Age",
            dataIndex: "age",
            filterDropdown: ({
                setSelectedKeys,
                selectedKeys,
                confirm,
                clearFilters,
            }) => {
                return (
                    <>
                        <Input
                            autoFocus
                            placeholder="Type text here"
                            value={selectedKeys[0]}
                            onChange={(e) => {
                                setSelectedKeys(e.target.value ? [e.target.value] : []);
                                confirm({ closeDropdown: false });
                            }}
                            onPressEnter={() => {
                                confirm();
                            }}
                            onBlur={() => {
                                confirm();
                            }}
                        ></Input>
                        <Button
                            onClick={() => {
                                confirm();
                            }}
                            type="primary"
                        >
                            Search
                        </Button>
                        <Button
                            onClick={() => {
                                clearFilters();
                            }}
                            type="danger"
                        >
                            Reset
                        </Button>
                    </>
                );
            },
            filterIcon: () => {
                return <SearchOutlined />;
            },
            onFilter: (value, record) => {
                return record.age == value;
            },
        },
        {
            title: "Address",
            dataIndex: "address",
            filterDropdown: ({
                setSelectedKeys,
                selectedKeys,
                confirm,
                clearFilters,
            }) => {
                return (
                    <div style={{ display: "flex", flex: 1, justifyContent: "center" }}>
                        <Input
                            autoFocus
                            placeholder="Type text here"
                            value={selectedKeys[0]}
                            onChange={(e) => {
                                setSelectedKeys(e.target.value ? [e.target.value] : []);
                                confirm({ closeDropdown: false });
                            }}
                            onPressEnter={() => {
                                confirm();
                            }}
                            onBlur={() => {
                                confirm();
                            }}
                        ></Input>
                        <Button
                            onClick={() => {
                                confirm();
                            }}
                            type="primary"
                        >
                            Search
                        </Button>
                        <Button
                            onClick={() => {
                                clearFilters();
                            }}
                            type="danger"
                        >
                            Reset
                        </Button>
                    </div>
                );
            },
            filterIcon: () => {
                return <SearchOutlined />;
            },
            onFilter: (value, record) => {
                return record.address.toLowerCase().includes(value.toLowerCase());
            },
        },
    ];

    // Pie chart data preparation
    const addressData = {};
    dataSource.forEach(record => {
        addressData[record.address] = (addressData[record.address] || 0) + 1;
    });
    const pieData = Object.keys(addressData).map(address => ({
        type: address,
        value: addressData[address],
    }));

    return (
        <div className="Webpage2">
            <header className="App-header">
                <Table
                    style={{ display: "flex", flex: 1, margin: 10 }}
                    columns={columns}
                    dataSource={dataSource}
                ></Table>
                <div style={{ width: '100%', maxWidth: 600, margin: '0 auto' }}>

                    <Pie
                        data={pieData}
                        angleField="value"
                        colorField="type"
                        radius={0.8}
                        label={{
                            type: "inner",
                            content: "{name}: {percentage}",
                        }}
                        interactions={[{ type: "element-active" }]}
                    />
                </div>

            </header>
        </div>
    );
}

export default Webpage2;