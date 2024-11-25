import React, { useEffect, useState } from 'react'
import Header3 from '../components/Header3';
import { getAllenquiries } from '../services/allApi';
import TablePagination from '@mui/material/TablePagination'; 

function Enquiry2() {
    const [allusers, setAllusers] = useState([]);
    const [page, setPage] = useState(0); // Track the current page
    const [rowsPerPage, setRowsPerPage] = useState(5); // Rows per page

    const getUsers = async () => {
        try {
          const results = await getAllenquiries();
          if (results.status === 200) {
            // Sort the data by createdAt in descending order
            const sortedData = results.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            setAllusers(sortedData);
          }
        } catch (error) {
          console.error(error);
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
                <h2 className="text-center mt-3">Enquiry</h2>
                <div style={{ overflowX: 'auto' }}>

                    <table className="table table-bordered mt-5" style={{ borderCollapse: 'collapse' }}>
                        <thead>
                            <tr>
                                <th scope="col" style={{ backgroundColor: "#0EA5E9", color: "white" }}>SI</th>
                                <th scope="col" style={{ backgroundColor: "#0EA5E9", color: "white" }}>First Name</th>
                                <th scope="col" style={{ backgroundColor: "#0EA5E9", color: "white" }}>Last Name</th>
                                <th scope="col" style={{ backgroundColor: "#0EA5E9", color: "white" }}>Email</th>
                                <th scope="col" style={{ backgroundColor: "#0EA5E9", color: "white" }}>Mobile Number</th>
                                <th scope="col" style={{ backgroundColor: "#0EA5E9", color: "white" }}>Message</th>
                              
                            </tr>
                        </thead>
                        <tbody>
                            {paginatedUsers && paginatedUsers.length > 0 ? (
                                paginatedUsers.map((item, index) => (
                                    <tr key={index}>
                                        <td>{page * rowsPerPage + index + 1}</td>
                                        <td>{item.First_Name}</td>
                                        <td>{item.Last_Name}</td>
                                        <td>{item.email}</td>
                                        <td>{item.Phone_number}</td>
                                        <td>{item.message}</td>
                                       
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" className="text-center">
                                        No Enquiries available.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
               </div>
                
                
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
  )
}

export default Enquiry2
