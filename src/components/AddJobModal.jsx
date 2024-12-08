import React, { useState } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { toast, ToastContainer } from 'react-toastify';
import { addJobs } from '../services/allApi';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2';

const AddJobModal = ({ show, onHide, getallJobs, setLoading }) => {
  const [formData, setFormData] = useState({
    jobRole: '',
    reqId: '',
    country: '',
    location: '',
    deadline_date: ''
  });


  const handleAddJobs = async () => {
    setLoading(true)
    const { deadline_date, location, country, reqId, jobRole } = formData
    if (!deadline_date || !location || !country || !reqId || !jobRole) {
      toast.error("fill the form completely")
    }
    const dataToSubmit = {
      ...formData,
      post_date: new Date().toISOString()
    };
    try {
      const result = await addJobs(dataToSubmit)
      if (result.status === 201) {
        
        Swal.fire({
          title: 'Success!',
          text: 'The job has been added successfully.',
          icon: 'success',
          confirmButtonText: 'Done'
        });
        setLoading(false)
        setTimeout(() => {
          getallJobs();
        }, 1000);
        onHide()
        setFormData({
          jobRole: '',
          reqId: '',
          country: '',
          location: '',
          deadline_date: '',
          post_date: ''
        })
      }
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: 'Something went wrong',
        icon: 'error',
        confirmButtonText: 'Done'
      });
      console.log(error)
    }
    finally {
      setLoading(false)
    }
  }
  const handlecancel = () => {
    onHide()
    setFormData({
      jobRole: '',
      reqId: '',
      country: '',
      location: '',
      deadline_date: '',
      post_date: ''
    })
  }

  return (
    <>
      <Modal
        show={show}
        onHide={handlecancel}
        size="md"
        centered
        contentClassName="border-0"
      >
        <Modal.Header className="border-0 pb-0">
          <Modal.Title className="text-2xl font-normal">Add Job Role</Modal.Title>
        </Modal.Header>

        <Modal.Body className="">
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
                className="py-3 px-4 border rounded-lg"
                value={formData.country}
                onChange={(e) => setFormData({ ...formData, country: e.target.value })}
              />
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label className=" mb-2">Location</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Location"
                className="py-3 px-4 border rounded text-gray-500"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              />
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label className=" mb-2">DeadLine</Form.Label>
              <Form.Control
                type="date"
                placeholder="DD/MM/YY"
                className="py-3 px-4 border rounded text-gray-500"
                value={formData.deadline_date}
                onChange={(e) => setFormData({ ...formData, deadline_date: e.target.value })}
              />
            </Form.Group>
          </Form>
        </Modal.Body>

        <Modal.Footer className="border-0 px-4 pb-4">
          <Button
            variant="light"
            onClick={handlecancel}
            className="px-8 py-2 rounded mr-3 font-normal"
            style={{ backgroundColor: '#fff', border: '1px solid #e2e8f0' }}
          >
            Cancel
          </Button>
          <Button
            variant="success"
            className="px-8 py-2 rounded font-normal"
            style={{ backgroundColor: '#10b981', border: 'none' }}
            onClick={handleAddJobs}

          >
            Add Job
          </Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer />
    </>

  );
};

export default AddJobModal;


