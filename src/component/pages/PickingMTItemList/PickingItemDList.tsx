import React from "react";
import { PickingItemD } from "../../../types/picking.type.tx";
import { Box } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

type Props = {
  itemD: PickingItemD[];
};

const PickingItemDList = (props: Props) => {
  const rows: any = [];
  const columns: GridColDef[] = [
    {
      headerName: "id",
      headerAlign: "center",
      field: "id",
      width: 50,
      // hideable: false,
    },

    {
      field: "buy",
      headerName: "Buy",
      headerAlign: "center",
      align: "center",
      width: 100,
    },
    {
      field: "lot",
      headerName: "Lot",
      headerAlign: "center",
      align: "center",
      width: 120,
    },

    {
      field: "itemCode",
      headerName: "ItemCode",
      headerAlign: "center",
      align: "left",
      width: 180,
    },
    {
      field: "itemName",
      headerName: "ItemName",
      headerAlign: "center",
      align: "left",

      width: 400,
    },
    {
      field: "lineNum",
      headerName: "LineNum",
      headerAlign: "center",
      align: "center",

      width: 80,
    },
    {
      field: "sizeNo",
      headerName: "SizeNo",
      headerAlign: "center",
      align: "center",

      width: 80,
    },
    {
      field: "uomName",
      headerName: "UOM",
      headerAlign: "center",
      align: "center",
      width: 80,
    },

    {
      field: "warehouse",
      headerName: "Warehouse",
      headerAlign: "center",
      align: "center",
      width: 100,
    },

    {
      field: "baseQty",
      headerName: "BaseQty",
      headerAlign: "center",
      align: "center",
      width: 150,
    },
    {
      field: "plandQty",
      headerName: "PlandQty",
      headerAlign: "center",
      align: "center",
      width: 150,
    },
    {
      field: "issueQty",
      headerName: "IssueQty",
      headerAlign: "center",
      align: "center",
      width: 150,
    },
    {
      field: "location",
      headerName: "Location",
      headerAlign: "center",
      align: "center",
      width: 150,
    },
  ];

  return (
    <Box
      sx={{
        height: "auto",
        width: "100%",
        overflowX: "scroll",
      }}
    >
      <DataGrid
        rowHeight={30}
        //rowSelectionModel={rowSelectionModel}
        keepNonExistentRowsSelected
        rows={props.itemD.length > 0 ? props.itemD : rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 25,
            },
          },
          columns: {
            columnVisibilityModel: { id: false },
          },
        }}
        pageSizeOptions={[25, 50, 70]}

        // onRowDoubleClick={}
      ></DataGrid>
    </Box>
  );
};

export default PickingItemDList;
