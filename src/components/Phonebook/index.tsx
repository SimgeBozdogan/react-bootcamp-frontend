import * as React from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";

const columns: GridColDef[] = [
  { field: "name", headerName: "Name", width: 150 },
  { field: "surname", headerName: "Surname", width: 150 },
  { field: "phoneNumber", headerName: "Phone Number", width: 200 },
];

const initialData = [
  { id: 1, name: "John", surname: "Doe", phoneNumber: "1234567890" },
  { id: 2, name: "Jane", surname: "Smith", phoneNumber: "0987654321" },
  { id: 3, name: "Alice", surname: "Johnson", phoneNumber: "2345678901" },
  { id: 4, name: "Bob", surname: "Williams", phoneNumber: "3456789012" },
  { id: 5, name: "Charlie", surname: "Brown", phoneNumber: "4567890123" },
  { id: 6, name: "David", surname: "Jones", phoneNumber: "5678901234" },
  { id: 7, name: "Ella", surname: "Garcia", phoneNumber: "6789012345" },
  { id: 8, name: "Fiona", surname: "Martinez", phoneNumber: "7890123456" },
  { id: 9, name: "George", surname: "Rodriguez", phoneNumber: "8901234567" },
  { id: 10, name: "Hannah", surname: "Lee", phoneNumber: "9012345678" },
  { id: 11, name: "Ian", surname: "Walker", phoneNumber: "1123456789" },
  { id: 12, name: "Jack", surname: "Hall", phoneNumber: "2234567890" },
  { id: 13, name: "Karen", surname: "Allen", phoneNumber: "3345678901" },
  { id: 14, name: "Liam", surname: "Young", phoneNumber: "4456789012" },
  { id: 15, name: "Mia", surname: "King", phoneNumber: "5567890123" },
  { id: 16, name: "Nathan", surname: "Wright", phoneNumber: "6678901234" },
  { id: 17, name: "Olivia", surname: "Scott", phoneNumber: "7789012345" },
  { id: 18, name: "Peter", surname: "Green", phoneNumber: "8890123456" },
  { id: 19, name: "Quinn", surname: "Adams", phoneNumber: "9901234567" },
  { id: 20, name: "Rachel", surname: "Baker", phoneNumber: "1012345678" },
];

const Phonebook: React.FC = () => {
  const [rows, setRows] = React.useState<any[]>([]);
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    let storedData = localStorage.getItem("phonebook");
    if (!storedData) {
      localStorage.setItem("phonebook", JSON.stringify(initialData));
      storedData = JSON.stringify(initialData);
    }
    setRows(JSON.parse(storedData));
  }, []);

  const handleNewEntry = (values: any) => {
    const newEntry = {
      id: rows.length + 1,
      ...values
    };
    const updatedRows = [...rows, newEntry];
    localStorage.setItem("phonebook", JSON.stringify(updatedRows));
    setRows(updatedRows);
    setOpen(false);
  };

  return (
    <div style={{ height: 400, width: "100%" }}>
      <Button variant="contained" color="primary" onClick={() => setOpen(true)}>
        New
      </Button>
      <DataGrid rows={rows} columns={columns} pageSizeOptions={[5]} />
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>New Entry</DialogTitle>
        <DialogContent>
          <Formik
            initialValues={{ name: "", surname: "", phoneNumber: "" }}
            validationSchema={Yup.object({
              name: Yup.string().required("Required"),
              surname: Yup.string().required("Required"),
              phoneNumber: Yup.string().required("Required").matches(/^\d{10}$/, "Phone number is not valid"),
            })}
            onSubmit={(values, { setSubmitting }) => {
              handleNewEntry(values);
              setSubmitting(false);
            }}
          >
            {({ isSubmitting, errors, touched }) => (
              <Form>
                <Field as={TextField} name="name" label="Name" fullWidth margin="normal" error={touched.name && !!errors.name} helperText={touched.name && errors.name} />
                <Field as={TextField} name="surname" label="Surname" fullWidth margin="normal" error={touched.surname && !!errors.surname} helperText={touched.surname && errors.surname} />
                <Field as={TextField} name="phoneNumber" label="Phone Number" fullWidth margin="normal" error={touched.phoneNumber && !!errors.phoneNumber} helperText={touched.phoneNumber && errors.phoneNumber} />
                <DialogActions>
                  <Button onClick={() => setOpen(false)} color="primary">Cancel</Button>
                  <Button type="submit" color="primary" disabled={isSubmitting}>Add</Button>
                </DialogActions>
              </Form>
            )}
          </Formik>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Phonebook;
