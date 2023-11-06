import { Box, Grid, ListItemButton, ListItemIcon, Paper } from "@mui/material";
import PrintOutlinedIcon from "@mui/icons-material/PrintOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import CustomTable from "../../components/customtable/CustomTable";
import { useGetAllBillsQuery } from "../../slice/billsApiSlice";
import { columns } from "./data/columns";
import { Link } from "react-router-dom";
import Pagination from "@mui/material/Pagination";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useState } from "react";

const Bills = () => {
  const [limit, setLimit] = useState<number>(10);
  const [page, setPage] = useState(1);
  const {
    data: allBills,
    isLoading,
    isFetching,
  } = useGetAllBillsQuery({ page, limit });
  const { data, meta } = allBills || [];

  const handleChange = (e: SelectChangeEvent<number>) => {
    setLimit(e.target.value);
    setPage(1);
  };

  const rows = data?.map((item: any) => {
    return {
      name: item?.id ? (
        <Link to={`/home/bills/${item.id}`}>{item?.id}</Link>
      ) : (
        " -- "
      ),
      tip: item?.contact_tax_number ? item?.contact_tax_number : " -- ",
      included: item?.parent_name ? item?.parent_name : " -- ",
      clerks: item?.users_count ? item?.users_count : "--",
      last_edited: item?.updated_at ? item?.updated_at : "--",
      status: item?.status ? item?.status : " -- ",
      actiuni: "--",
    };
  });

  if (isLoading || isFetching) {
    return <div> Loading ....</div>;
  }
  return (
    <>
      <Grid container>
        <Grid
          item
          xs={12}
          display="flex"
          justifyContent="flex-end"
          alignContent="center"
        >
          <Box sx={{ display: "flex" }}>
            <ListItemButton>
              <ListItemIcon>
                <PrintOutlinedIcon />
              </ListItemIcon>
            </ListItemButton>
            <ListItemButton>
              <ListItemIcon>
                <SettingsOutlinedIcon />
              </ListItemIcon>
            </ListItemButton>
            <ListItemButton>
              <ListItemIcon>
                <CreateOutlinedIcon />
              </ListItemIcon>
            </ListItemButton>
          </Box>
        </Grid>
        {/*move pagination to sparate component*/}
        <Grid item xs={12}>
          <CustomTable columns={columns} rows={rows} />
          <Paper
            elevation={1}
            sx={{
              fontWeight: "700",
              fontSize: "0.875rem",
              lineHeight: "1.5rem",
              letterSpacing: "0.01071em",
              borderBottom: "1px solid rgba(224, 224, 224, 1)",
              textAlign: "center",
              padding: "6px 16px",
              backgroundColor: "#f2f2f2",
              minHeight: "50px",
              display: "flex",
              alignContent: "center",
              justifyContent: "flex-start",
              alignItems: "center",
            }}
          >
            <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
              <InputLabel id="demo-select-small-label">Show</InputLabel>
              <Select
                labelId="demo-select-small-label"
                id="demo-select-small"
                value={limit}
                label="Show"
                onChange={handleChange}
              >
                <MenuItem value={10}>10</MenuItem>
                <MenuItem value={20}>20</MenuItem>
                <MenuItem value={30}>30</MenuItem>
              </Select>
            </FormControl>
            <Pagination
              count={meta?.last_page}
              page={page}
              showFirstButton
              showLastButton
              onChange={(_event, value) => {
                setPage(value);
              }}
            />
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};

export default Bills;
