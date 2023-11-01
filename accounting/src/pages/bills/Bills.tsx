import React from "react";
import { Box, Grid, ListItemButton, ListItemIcon } from "@mui/material";
import PrintOutlinedIcon from "@mui/icons-material/PrintOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import CustomTable from "../../components/customtable/CustomTable";
import { useGetAllBillsQuery } from "../../slice/billsApiSlice";
import { columns } from "./data/columns";
import { Link } from "react-router-dom";
import { mockDataBills } from "./mockDataBills";

const Bills = () => {
  const {
    data: allBills,
    isLoading,
    isFetching,
  } = useGetAllBillsQuery({ page: 1, limit: 10 });
  // const { data, meta } = allBills || [];
  const { data, meta } = mockDataBills;
  console.log(data);
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

        <Grid item xs={12}>
          <CustomTable columns={columns} rows={rows} />
        </Grid>
      </Grid>
    </>
  );
};

export default Bills;
