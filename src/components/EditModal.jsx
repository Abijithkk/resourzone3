import React, { useState, useEffect } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { editJobs } from '../services/allApi';
import { toast, ToastContainer } from 'react-toastify';
import { FormControlLabel, RadioGroup, FormLabel, FormControl, Radio } from '@mui/material';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2';
import Dialog from '@mui/material/Dialog';
import { useTheme } from '@mui/material/styles';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';

const EditModal = ({ showEdit, onEditHide, getallJobs, SelectedJob, setLoading }) => {
  const [formData, setFormData] = useState({
    jobRole: '',
    reqId: '',
    country: '',
    location: '',
    deadline_date: '',
    status: ''
  });
  const [dialogopen, setDialogopen] = useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  useEffect(() => {
    if (SelectedJob) {
      setFormData({
        jobRole: SelectedJob.jobRole,
        reqId: SelectedJob.reqId,
        country: SelectedJob.country,
        location: SelectedJob.location,
        deadline_date: SelectedJob.deadline_date,
        status: SelectedJob.status ? "true" : "false" // Convert to string for radio button
      });
    }
  }, [SelectedJob]);

  const handleDialogOpen = () => {
    setDialogopen(true);
  };

  const handleDialogClose = () => {
    setDialogopen(false);
  };


  const handleEditJobs = async (id) => {
    setLoading(true);
    try {
      const result = await editJobs(formData, id);
      if (result.status === 200) {
        setLoading(false);
      
        Swal.fire({
          title: 'Success!',
          text: 'Your edit was successful.',
          icon: 'success',
          confirmButtonText: 'Done'
        });
        setTimeout(() => {
          getallJobs();
        }, 1000);
        onEditHide();
        setFormData({
          jobRole: '',
          reqId: '',
          country: '',
          location: '',
          deadline_date: '',
          status: ''
        });
      }
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: 'Something went wrong',
        icon: 'error',
        confirmButtonText: 'Done'
      });
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    onEditHide();
    setFormData({
      jobRole: '',
      reqId: '',
      country: '',
      location: '',
      deadline_date: '',
      status: ''
    });
  };

  return (
    <>
      <Modal
        show={showEdit}
        onHide={handleCancel}
        size="md"
        centered
        contentClassName="border-0"
      >
        <Modal.Header className="border-0 pb-0">
          <Modal.Title className="text-2xl font-normal">Edit Job Role</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
            <Form.Group className="mb-2">
              <Form.Label className="text-lg mb-2">Job Role</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Job Role Name"
                className="py-3 px-4 border rounded-lg text-gray-500"
                value={formData.jobRole}
                onChange={(e) => setFormData({ ...formData, jobRole: e.target.value })}
              />
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label className="text-lg mb-2">Req ID</Form.Label>
              <Form.Control
                type="text"
                className="py-3 px-4 border rounded-lg"
                value={formData.reqId}
                onChange={(e) => setFormData({ ...formData, reqId: e.target.value })}
              />
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label className="text-lg mb-2">Country</Form.Label>
              <Form.Control
                type="text"
                className="py-3 px-4 border rounded-lg text-gray-500"
                value={formData.country}
                onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                placeholder="Enter country"
              />
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label className="mb-2">Location</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Location"
                className="py-3 px-4 border rounded text-gray-500"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              />
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label className="mb-2">DeadLine Date</Form.Label>
              <Form.Control
                type="date"
                placeholder="DD/MM/YY"
                className="py-3 px-4 border rounded text-gray-500"
                value={formData.deadline_date}
                onChange={(e) => setFormData({ ...formData, deadline_date: e.target.value })}
              />
            </Form.Group>

            <Form.Group className="mb-4">
              <FormControl component="fieldset">
                <FormLabel component="legend">Job Status</FormLabel>
                <RadioGroup
                  row
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                >
                  <FormControlLabel value="true" control={<Radio />} label="Active" />
                  <FormControlLabel value="false" control={<Radio />} label="Expired" />
                </RadioGroup>
              </FormControl>
            </Form.Group>
          </Form>
        </Modal.Body>

        <Modal.Footer className="border-0 px-4 pb-4">
          <Button
            variant="light"
            onClick={handleCancel}
            className="px-8 py-2 rounded mr-3 font-normal"
            style={{ backgroundColor: '#fff', border: '1px solid #e2e8f0' }}
          >
            Cancel
          </Button>
          <Button
            variant="success"
            className="px-8 py-2 rounded font-normal"
            style={{ backgroundColor: '#10b981', border: 'none' }}
            onClick={handleDialogOpen}
          >
            Save
          </Button>
        </Modal.Footer>
      </Modal>
       {/* edit Confirmation Dialog */}
       <Dialog
  open={dialogopen}
  onClose={handleDialogClose}
  fullScreen={fullScreen}
>
  <DialogTitle>Confirm Edit</DialogTitle>
  <DialogContent>
    <DialogContentText>
      Are you sure you want to Save the changes?
    </DialogContentText>
  </DialogContent>
  <DialogActions>
    <Button
      style={{
        backgroundColor: 'red',
        color: 'white',
        border: 'none',
        padding: '8px 16px',
        fontWeight: 'bold',
        borderRadius: '4px',
      }}
      onClick={handleDialogClose}
    >
      Cancel
    </Button>
    <Button
      onClick={() => handleEditJobs(SelectedJob._id)}
      autoFocus
      style={{
        backgroundColor: 'green',
        color: 'white',
        border: 'none',
        padding: '8px 16px',
        fontWeight: 'bold',
        borderRadius: '4px',
      }}
    >
      Yes, Confirm
    </Button>
  </DialogActions>
</Dialog>

      <ToastContainer />
    </>
  );
};

export default EditModal;
