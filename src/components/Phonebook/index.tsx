import React, { useCallback, useEffect, useState } from "react";
import { DataGrid, GridColDef, GridActionsCellItem } from "@mui/x-data-grid";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import {
  getAllPhonebook,
  createPhonebookEntry,
  updatePhonebookEntry,
  deletePhonebookEntry,
} from "../../service/Phonebook";
import { Phonebook } from "../../types/phonebook";
import { generateRandomUid } from "../../utils";
import { toast } from "react-toastify";

const PhonebookComponent: React.FC = () => {
  const [rows, setRows] = useState<Phonebook[]>([]);
  const [open, setOpen] = useState(false);
  const [editRow, setEditRow] = useState<Phonebook | null>(null);
  const [deleteRow, setDeleteRow] = useState<Phonebook | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const fetchPhonebookData = useCallback(async () => {
    try {
      const response = await getAllPhonebook();
      if (response.status === 200) {
        setRows(response.data);
        toast.success("Data succesfully fetched.");
        return;
      }
      toast.error("Error fetching data.");
    } catch (error: any) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    fetchPhonebookData();
  }, [fetchPhonebookData]);

  const handleEditClick = (row: Phonebook) => {
    setEditRow(row);
    setOpen(true);
  };

  const handleDeleteClick = (row: Phonebook) => {
    setDeleteRow(row);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!deleteRow) return;
    try {
      const response = await deletePhonebookEntry(deleteRow.id);
      if (response.status === 200) {
        const updatedRows = rows.filter((row) => row.id !== deleteRow.id);
        setRows(updatedRows);
        toast.success("Data succesfully deleted.");
        return;
      }
      toast.error("Error deleting data");
    } catch (error: any) {
      console.error(error);
    } finally {
      setDeleteDialogOpen(false);
      setDeleteRow(null);
    }
  };

  const handleNewEntry = async (values: any) => {
    if (editRow) {
      try {
        const response = await updatePhonebookEntry(editRow.id, values);
        if (response.status === 200) {
          const updatedRows = rows.map((row) =>
            row.id === editRow.id ? { ...row, ...values } : row
          );
          setRows(updatedRows);
          toast.success("Data succesfully updated.");
          return;
        }
        toast.error("Error updating data.");
      } catch (error: any) {
        console.error(error);
      } finally {
        setOpen(false);
        setEditRow(null);
      }
    } else {
      const id = generateRandomUid();
      const newEntry = { ...values, id };

      try {
        const response = await createPhonebookEntry(newEntry);
        if (response.status === 201) {
          const updatedRows = [...rows, newEntry];
          setRows(updatedRows);
          toast.success("Data succesfully created.");
          return;
        }
        toast.error("Error creating data.");
      } catch (error: any) {
        console.error(error);
      } finally {
        setOpen(false);
        setEditRow(null);
      }
    }
  };

  const columns: GridColDef[] = [
    { field: "name", headerName: "Name", width: 150 },
    { field: "surname", headerName: "Surname", width: 150 },
    { field: "phoneNumber", headerName: "Phone Number", width: 200 },
    {
      field: "actions",
      headerName: "Actions",
      type: "actions",
      width: 250,
      getActions: (params) => [
        <GridActionsCellItem
          icon={
            <Button variant="contained" color="primary">
              Update
            </Button>
          }
          label="Update"
          onClick={() => handleEditClick(params.row as Phonebook)}
        />,
        <GridActionsCellItem
          icon={
            <Button variant="contained" color="secondary">
              Delete
            </Button>
          }
          label="Delete"
          onClick={() => handleDeleteClick(params.row as Phonebook)}
        />,
      ],
    },
  ];

  return (
    <div style={{ height: 400, width: "100%" }}>
      <Button
        style={{ marginBottom: "2rem" }}
        variant="contained"
        color="primary"
        onClick={() => setOpen(true)}
      >
        New
      </Button>
      <DataGrid rows={rows} columns={columns} pageSizeOptions={[5]} />
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>{editRow ? "Update Entry" : "New Entry"}</DialogTitle>
        <DialogContent>
          <Formik
            initialValues={{
              name: editRow ? editRow.name : "",
              surname: editRow ? editRow.surname : "",
              phoneNumber: editRow ? editRow.phoneNumber : "",
            }}
            validationSchema={Yup.object({
              name: Yup.string().required("Required"),
              surname: Yup.string().required("Required"),
              phoneNumber: Yup.string()
                .required("Required")
                .matches(/^\d{10}$/, "Phone number is not valid"),
            })}
            onSubmit={(values, { setSubmitting }) => {
              handleNewEntry(values);
              setSubmitting(false);
            }}
          >
            {({ isSubmitting, errors, touched }) => (
              <Form>
                <Field
                  as={TextField}
                  name="name"
                  label="Name"
                  fullWidth
                  margin="normal"
                  error={touched.name && !!errors.name}
                  helperText={touched.name && errors.name}
                />
                <Field
                  as={TextField}
                  name="surname"
                  label="Surname"
                  fullWidth
                  margin="normal"
                  error={touched.surname && !!errors.surname}
                  helperText={touched.surname && errors.surname}
                />
                <Field
                  as={TextField}
                  name="phoneNumber"
                  label="Phone Number"
                  fullWidth
                  margin="normal"
                  error={touched.phoneNumber && !!errors.phoneNumber}
                  helperText={touched.phoneNumber && errors.phoneNumber}
                />
                <DialogActions>
                  <Button onClick={() => setOpen(false)} color="primary">
                    Cancel
                  </Button>
                  <Button type="submit" color="primary" disabled={isSubmitting}>
                    {editRow ? "Update" : "Add"}
                  </Button>
                </DialogActions>
              </Form>
            )}
          </Formik>
        </DialogContent>
      </Dialog>
      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this entry?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteConfirm} color="secondary">
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default PhonebookComponent;
