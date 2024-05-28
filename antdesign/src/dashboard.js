import React from 'react';
import { Card, Tooltip } from 'antd';
import { Link } from 'react-router-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Webpage2 from './webpage2';
import Pagin from './psf';
import Fetchapi from './api';
import Dynamic from './dyn';
import App from './App';


const Dashboard = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={
                    <div style={{ padding: '20px' }}>
                        <h1 style={{ textAlign: 'center', marginBottom: '30px' }}> Ant-Design Task</h1>
                        <div style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap' }}>
                            <Link to="/App">
                                <Card title="Editing and Adding New Student Table" style={{ width: 350, height: 200, backgroundColor: '#ffadad', fontFamily: "'Courier New', Courier, monospace", fontSize: '20px' }} hoverable>
                                    <Tooltip title="In this table we have list of students we can add a student or edit student details and save and get a graph insights"><div style={{ height: '100px' }}></div></Tooltip>
                                </Card>
                            </Link>
                            <Link to="/webpage2">
                                <Card title="Search Table" style={{ width: 350, height: 200, backgroundColor: '#ffd6a5', fontFamily: "'Courier New', Courier, monospace", fontSize: '20px' }} hoverable>
                                    <Tooltip title="In this table we have data , we can search the data or record in a table through search bar "><div style={{ height: '100px' }}></div></Tooltip>
                                </Card>
                            </Link>
                            <Link to="/psf">
                                <Card title="Sort and Filter Table" style={{ width: 350, height: 200, backgroundColor: '#fdffb6', fontFamily: "'Courier New', Courier, monospace", fontSize: '20px' }} hoverable>
                                    <Tooltip title="In this table we have a data , we can sort that data eighter in ascending or decending,and also we can do filter."><div style={{ height: '100px' }}></div></Tooltip>
                                </Card>
                            </Link>
                            <Link to="/api">
                                <Card title="API Fetching Table Data" style={{ width: 350, height: 200, backgroundColor: '#caffbf', fontFamily: "'Courier New', Courier, monospace", fontSize: '20px' }} hoverable>
                                    <Tooltip title=" in this table we're fetching data from an api `https://api.publicapis.org/entries' "><div style={{ height: '100px' }}></div></Tooltip>
                                </Card>
                            </Link>
                            <Link to="/dyn">
                                <Card title="Dynamic Table Data from API" style={{ width: 350, height: 200, backgroundColor: '#9bf6ff', fontFamily: "'Courier New', Courier, monospace", fontSize: '20px' }} hoverable>
                                    <Tooltip title="in this table , we will generate dynamic data from an api , so that feature names and data types we can't define before"><div style={{ height: '100px' }}></div></Tooltip>
                                </Card>
                            </Link>
                        </div>
                        <footer style={{ marginTop: '50px', textAlign: 'center' }}>
                            <p>� {new Date().getFullYear()} MERN solutions. All rights reserved.</p>
                        </footer>
                    </div>
                } />
                <Route path="/App" element={<App />} />
                <Route path="/webpage2" element={<Webpage2 />} />
                <Route path="/psf" element={<Pagin />} />
                <Route path="/api" element={<Fetchapi />} />
                <Route path="/dyn" element={<Dynamic />} />
            </Routes>
        </Router>
    );
};

export default Dashboard;
