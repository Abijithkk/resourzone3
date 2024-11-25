import React, { useEffect, useState } from 'react';
import Header3 from '../components/Header3';
import {
  Button,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  TablePagination
} from '@mui/material';
import AddJobModal from '../components/AddJobModal';
import EditModal from '../components/EditModal';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addJobs, deleteJobs, getAllJobs } from '../services/allApi';
import { ClipLoader } from 'react-spinners';

function Dashboard() {
  const [selectedRowIndex, setSelectedRowIndex] = useState(null);
  const [selectedRole, setSelectedRole] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [dialogopen, setDialogopen] = useState(false);
  const [addJob, setAddJob] = useState('');
  const [job, setJob] = useState([]);
  const [selectedJob, setSelectedJob] = useState('');
  const [loading, setLoading] = useState(false);
  
  // Pagination state
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const handleDialogOpen = () => {
    setDialogopen(true);
  };

  const handleDialogClose = () => {
    setDialogopen(false);
  };

  const handleRowClick = (index) => {
    setSelectedRowIndex(index);
  };

  const handleRoleChange = (event) => {
    setSelectedRole(event.target.value);
  };

  // Filter jobs based on selected role and sort them
  const sortedJob = job
    .filter((job) => selectedRole === '' || job.jobRole === selectedRole)
    .concat(job.filter((job) => selectedRole !== '' && job.jobRole !== selectedRole));

  // Slice jobs based on pagination
  const paginatedJobs = sortedJob.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  const getallJobs = async () => {
    setLoading(true);
    try {
      const results = await getAllJobs();
      if (results.status === 200) {
        // Sort the data by post_date in descending order
        const sortedData = results.data.sort((a, b) => new Date(b.post_date) - new Date(a.post_date));
        setJob(sortedData);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    getallJobs();
  }, []);
  
  const handleEdit = (job) => {
    setShowEditModal(true);
    setSelectedJob(job);
  };

  const handleDeletion = (id) => {
    setSelectedJob(id);
    setDialogopen(true);
  };

  const handleDeletejob = async (id) => {
    setLoading(true);
    try {
      const result = await deleteJobs(id);
      if (result.status === 200) {
        setLoading(false);
        toast.success('Job deleted successfully');
        getallJobs();
        setDialogopen(false);
        setSelectedJob('');
      }
    } catch (error) {
      toast.error('Something went wrong on deletion');
      setSelectedJob('');
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // Handle page change for pagination
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Handle rows per page change
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Convert date format
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  return (
    <>
      <Header3 />
      {loading === true ? (
        <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
          <ClipLoader color="#10b981" size={50} />
        </div>
      ) : (
        <>
          <div className="p-8 mt-5 container">
            <div className="flex justify-between items-center mb-6">
              <div className="d-flex justify-content-between">
                <div>
                  <h1 className="text-3xl font-normal text-black">Careers</h1>
                </div>

                <div className="d-flex">
                  <FormControl   className="me-3" style={{ minWidth: 150 }}>
                    <InputLabel>Select Job Role</InputLabel>
                    <Select
                      labelId="job-role-select-label"
                      value={selectedRole}
                      onChange={handleRoleChange}
                      label="Select Job Role"
                      sx={{
                        border: '1px solid green',
                        borderRadius: '6px',
                        color: 'black',
                        textTransform: 'none',
                        backgroundColor: 'white',

                        '&:hover': {
                          backgroundColor: '#f8fafc',
                          border: '1px solid #e2e8f0',
                        },
                      }}
                    >
                      <MenuItem value="">All</MenuItem>
                      {Array.from(new Set(job.map((job) => job.jobRole))).map((uniqueRole, index) => (
                        <MenuItem key={index} value={uniqueRole}>
                          {uniqueRole}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: '#10b981',
                      borderRadius: '6px',
                      textTransform: 'none',
                      boxShadow: 'none',
                      '&:hover': {
                        backgroundColor: '#059669',
                        boxShadow: 'none',
                      },
                    }}
                    onClick={() => setShowModal(true)}
                  >
                    Add Job Role
                  </Button>
                </div>
              </div>
            </div>
            <div style={{ overflowX: 'auto' }}>

              <table className="table table-bordered mt-5" style={{ borderCollapse: 'collapse',overflowX:'scroll' }}>
                <thead>
                  <tr>
                  <th scope="col" style={{ backgroundColor: '#0EA5E9', color: 'white' }}>
                      SI
                    </th>
                    <th scope="col" style={{ backgroundColor: '#0EA5E9', color: 'white' }}>
                      jobRole
                    </th>
                    <th scope="col" style={{ backgroundColor: '#0EA5E9', color: 'white' }}>
                      Req ID
                    </th>
                    <th scope="col" style={{ backgroundColor: '#0EA5E9', color: 'white' }}>
                      Country
                    </th>
                    <th scope="col" style={{ backgroundColor: '#0EA5E9', color: 'white' }}>
                      Location
                    </th>
                    <th scope="col" style={{ backgroundColor: '#0EA5E9', color: 'white' }}>
                      Posted Date
                    </th>
                    <th scope="col" style={{ backgroundColor: '#0EA5E9', color: 'white' }}>
                      Dead Line
                    </th>
                    <th scope="col" style={{ backgroundColor: '#0EA5E9', color: 'white' }}>
                     Status
                    </th>
  
                    <th scope="col" style={{ backgroundColor: '#0EA5E9', color: 'white' }}>
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedJobs.map((job, index) => (
                    <tr key={index} onClick={() => handleRowClick(index)}>
                      <td scope="row">{page * rowsPerPage + index + 1}</td>
                      <td scope="row">{job.jobRole}</td>
                      <td>{job.reqId}</td>
                      <td>{job.country}</td>
                      <td>{job.location}</td>
                      <td>{formatDate(job.post_date)}</td>
                      <td>{formatDate(job.deadline_date)}</td>
                      <td>{job.status===true?'Active':'Expired'}</td>
                      <td>
                        <Button
                          sx={{
                            color: '#22c55e',
                            textTransform: 'none',
                            minWidth: 'auto',
                            padding: '0 8px',
                            fontSize: '15px',
                            '&:hover': {
                              backgroundColor: 'transparent',
                            },
                          }}
                          onClick={() => handleEdit(job)}
                        >
                          Edit
                        </Button>
                        <Button
                          sx={{
                            color: '#e11d48',
                            textTransform: 'none',
                            minWidth: 'auto',
                            padding: '0 8px',
                            fontSize: '15px',
                            '&:hover': {
                              backgroundColor: 'transparent',
                            },
                          }}
                          onClick={() => handleDeletion(job._id)}
                        >
                          Delete
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
           </div>

            {/* Pagination controls */}
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={sortedJob.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </div>
          {/* Add Job Modal */}
          <AddJobModal 
                    show={showModal}
                    onHide={() => setShowModal(false)}
                    setAddJob={setAddJob} 
                    getallJobs={getallJobs}
                    setLoading={setLoading}
                    
                />
       <EditModal 
       setLoading={setLoading}
        showEdit={showEditModal}
        onEditHide={() => setShowEditModal(false)}
        getallJobs={getallJobs}
        SelectedJob={selectedJob}
        
      />
          {/* Delete Confirmation Dialog */}
          <Dialog
            open={dialogopen}
            onClose={handleDialogClose}
            fullScreen={fullScreen}
          >
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Are you sure you want to delete this job?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleDialogClose}>Cancel</Button>
              <Button
                onClick={() => handleDeletejob(selectedJob)}
                color="error"
                autoFocus
              >
                Yes, Delete
              </Button>
            </DialogActions>
          </Dialog>
        </>
      )}
      <ToastContainer />
    </>
  );
}

export default Dashboard;
