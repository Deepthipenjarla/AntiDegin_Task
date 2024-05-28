import React from 'react'
import { Table, Button, Modal, Input } from 'antd';
import { useState } from 'react';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import { Bar } from '@ant-design/charts';

function App() {
	const [isEditing, setIsEditing] = useState(false)
	const [editingRecord, setEditingRecord] = useState(null)
	// Sample Data for the table 
	const [dataSource, setDataSource] = useState([
		{ key: '1', username: 'Gourav', age: 10 },
		{ key: '2', username: 'Kartik', age: 20 },
		{ key: '3', username: 'Madhu', age: 30 },
		{ key: '4', username: 'Karu', age: 40 },
		{ key: '5', username: 'Dinesh', age: 50 },
	]);

	// Sample Columns data 
	const columns = [
		{
			title: 'Username',
			dataIndex: 'username',
			key: '1',
		},
		{
			title: 'Age',
			dataIndex: 'age',
			key: '2',
		},

		{
			title: 'Actions',
			key: '3',
			render: (record) => {
				return <>
					<EditOutlined onClick={() => {
						onEditStudent(record);

					}} />
					<DeleteOutlined onClick={() => {
						onDeleteStudent(record)
					}}
						style={{ color: "red", marginLeft: 12 }} />
				</>
			}
		}
	];

	const onAddStudent = () => {
		const randomNumber = parseInt(Math.random() * 1000)
		const newStudent = {

			key: randomNumber, username: 'Name' + randomNumber, age: randomNumber,

		}
		setDataSource(pre => {
			return [...pre, newStudent]
		})
	}

	const onDeleteStudent = (record) => {
		Modal.confirm({
			title: 'Are you sure, you want to delete this student record',
			okText: 'yes',
			okType: "danger",

			onOk: () => {
				setDataSource(pre => {
					return pre.filter(student => student.key !== record.key)

				});
			},
		});
	};

	const onEditStudent = (record) => {
		setIsEditing(true)
		setEditingRecord({ ...record })

	};

	const onSaveEdit = () => {
		setDataSource(dataSource.map(item => {
			if (item.key === editingRecord.key) {
				return editingRecord;
			}
			return item;
		}));
		setIsEditing(false);
	};

	{/* Prepare the data for the chart */ }
	const chartData = dataSource.map(item => ({
		name: item.username,
		age: Number(item.age)
	}));

	// Configuration for the Ant Design Bar Chart
	const config = {
		data: chartData,
		xField: 'name',
		yField: 'age',
	};

	return (

		<div className="App" >
			<header className="App-header">
				<h4>ReactJS Ant-Design Table Component</h4>
				<Button onClick={onAddStudent}> Add a new student</Button>
				<Table dataSource={dataSource} columns={columns}></Table>
				<Modal
					title="Edit username"
					visible={isEditing}
					okText="Save"
					onCancel={() => {
						setIsEditing(false);
					}}
					onOk={onSaveEdit}
				>
					<Input value={editingRecord?.username} onChange={e => setEditingRecord({ ...editingRecord, username: e.target.value })} />
					<Input value={editingRecord?.age} onChange={e => setEditingRecord({ ...editingRecord, age: e.target.value })} />
				</Modal>

				<div style={{ height: '500px', width: '100%' }}>
				{/* Add the chart */}
					<Bar {...config} />
				</div>

			</header>
		</div>
	);
}

export default App;
