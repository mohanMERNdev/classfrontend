import React, { Component } from 'react';

class Dashboard extends Component {
    state = {
        data: [],
        error: ''
    };

    async componentDidMount() {
        const role = localStorage.getItem('role');
        const endpoint = role === 'teacher' ? '/students' : '/teachers';
        try {
            const response = await fetch(`https://classbackend-reut.onrender.com/${endpoint}`, {
                headers: {
                    Authorization: localStorage.getItem('token')
                }
            });
            if (!response.ok) throw new Error('Failed to load data');
            const data = await response.json();
            this.setState({ data });
        } catch (error) {
            this.setState({ error: error.message });
        }
    }

    render() {
        return (
            <div className="container mx-auto p-6 bg-white shadow-md rounded-md mt-8">
                <h2 className="text-3xl mb-6 text-blue-700">Dashboard</h2>
                {this.state.error && (
                    <p className="text-red-500 mb-4">{this.state.error}</p>
                )}
                <ul className="space-y-4">
                    {this.state.data.map((item, index) => (
                        <li key={index} className="p-4 bg-gray-100 rounded-md">
                            {item.name}
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
}

export default Dashboard;

