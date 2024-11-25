import React, { useEffect, useState } from 'react';
import Header3 from '../components/Header3';
import { getAllusers } from '../services/allApi';
import { BASE_URL } from '../services/baseUrl';
import TablePagination from '@mui/material/TablePagination'; // Import TablePagination component from Material-UI

function Users() {
    const [allusers, setAllusers] = useState([]);
    const [page, setPage] = useState(0); // Track the current page
    const [rowsPerPage, setRowsPerPage] = useState(5); // Rows 

    const getUsers = async () => {
        try {
            const results = await getAllusers();
            if (results.status === 200) {
                const sortedData = results.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                setAllusers(sortedData);
            }
        } catch (error) {
            console.log(error);
        }
    };


    useEffect(() => {
        getUsers();
    }, []);

    // Handle page change
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    // Handle rows per page change
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0); // Reset to the first page
    };

    // Slice the data for pagination
    const paginatedUsers = allusers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    return (
        <>
            <Header3 />
            <div className="container">
                <h2 className="text-center mt-3">Users</h2>
                <div style={{ overflowX: 'auto' }}>

                    <table className="table table-bordered mt-5" style={{ borderCollapse: 'collapse' }}>
                        <thead>
                            <tr>
                                <th scope="col" style={{ backgroundColor: "#0EA5E9", color: "white" }}>SI</th>
                                <th scope="col" style={{ backgroundColor: "#0EA5E9", color: "white" }}>Name</th>
                                <th scope="col" style={{ backgroundColor: "#0EA5E9", color: "white" }}>Email</th>
                                <th scope="col" style={{ backgroundColor: "#0EA5E9", color: "white" }}>Job Position</th>
                                <th scope="col" style={{ backgroundColor: "#0EA5E9", color: "white" }}>Message</th>
                                <th scope="col" style={{ backgroundColor: "#0EA5E9", color: "white" }}>CV</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paginatedUsers && paginatedUsers.length > 0 ? (
                                paginatedUsers.map((item, index) => (
                                    <tr key={index}>
                                        <td>{page * rowsPerPage + index + 1}</td> {/* Adjust the index calculation */}
                                        <td>{item.Name}</td>
                                        <td>{item.email}</td>
                                        <td>{item.job_position}</td>
                                        <td>{item.message}</td>
                                        <td>
                                            <a 
                                                href={`${BASE_URL}/${item.cv}`} 
                                                download={`${item.Name}_cv.pdf`} 
                                                target="_blank" 
                                                rel="noopener noreferrer"
                                            >
                                                Download CV
                                            </a>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" className="text-center">
                                        No users available.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                
                {/* Pagination Controls */}
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]} // Options for number of rows per page
                    component="div"
                    count={allusers.length} // Total number of users
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </div>
        </>
    );
}

export default Users;
