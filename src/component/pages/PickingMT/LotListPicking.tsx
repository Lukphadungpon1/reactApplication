import React from "react";
import {
  AddLotLisrequestSelected,
  SearchLotPicking,
  pickingSelector,
} from "../../../store/slices/pickingSlice";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../../store/store";
import { useDebounce } from "@react-hook/debounce";
import { AllocateLotRequest } from "../../../types/allocatelot.type";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Box } from "@mui/material";
import QuickSearchToolbar from "../../QuickSearchToolbar";

type Props = {
  handleselectLot: any;
};

const LotListPicking = (props: Props) => {
  const pickingReducer = useSelector(pickingSelector);

  const dispatch = useAppDispatch();

  const [keywordSearch, setKeywordSearch] = useDebounce<string>("", 1000);
  const [keywordSearchNoDelay, setKeywordSearchNoDelay] =
    React.useState<string>("");

  const [selectedLots, setSelectedLots] = React.useState<AllocateLotRequest[]>(
    []
  );

  React.useEffect(() => {
    dispatch(SearchLotPicking(keywordSearch));
  }, [keywordSearch]);

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
      width: 80,
    },
    {
      field: "soNumber",
      headerName: "SO Number",
      headerAlign: "center",
      width: 120,
    },
    {
      field: "lot",
      headerName: "Lot",
      headerAlign: "center",
      width: 120,
    },
    {
      field: "itemNo",
      headerName: "ItemNo",
      headerAlign: "center",
      align: "center",
      width: 80,
    },
    {
      field: "itemName",
      headerName: "ItemName",
      headerAlign: "center",
      align: "center",
      width: 150,
    },
    {
      field: "width",
      headerName: "Width",
      headerAlign: "center",
      align: "center",
      width: 80,
    },
    {
      field: "shipToCode",
      headerName: "Ship To Code",
      headerAlign: "center",
      align: "center",
      width: 100,
    },
    {
      field: "shipToName",
      headerName: "Ship To Desc",
      headerAlign: "center",
      align: "center",
      width: 150,
    },

    {
      field: "purOrder",
      headerName: "PU Order",
      headerAlign: "center",
      align: "center",
      width: 100,
    },
    {
      field: "total",
      headerName: "Total",
      headerAlign: "center",
      align: "center",
      width: 50,
    },
    {
      field: "s035",
      headerName: "035",
      headerAlign: "center",
      align: "center",
      width: 50,
    },
    {
      field: "s040",
      headerName: "040",
      headerAlign: "center",
      align: "center",
      width: 50,
    },
    {
      field: "s050",
      headerName: "050",
      headerAlign: "center",
      align: "center",
      width: 50,
    },
    {
      field: "s055",
      headerName: "055",
      headerAlign: "center",
      align: "center",
      width: 50,
    },
    {
      field: "s060",
      headerName: "060",
      headerAlign: "center",
      align: "center",
      width: 50,
    },
    {
      field: "s065",
      headerName: "065",
      headerAlign: "center",
      align: "center",
      width: 50,
    },
    {
      field: "s070",
      headerName: "070",
      headerAlign: "center",
      align: "center",
      width: 50,
    },
    {
      field: "s075",
      headerName: "075",
      headerAlign: "center",
      align: "center",
      width: 50,
    },
    {
      field: "s080",
      headerName: "080",
      headerAlign: "center",
      align: "center",
      width: 50,
    },
    {
      field: "s085",
      headerName: "085",
      headerAlign: "center",
      align: "center",
      width: 50,
    },
    {
      field: "s090",
      headerName: "090",
      headerAlign: "center",
      align: "center",
      width: 50,
    },
    {
      field: "s095",
      headerName: "095",
      headerAlign: "center",
      align: "center",
      width: 50,
    },
    {
      field: "s100",
      headerName: "100",
      headerAlign: "center",
      align: "center",
      width: 50,
    },
    {
      field: "s105",
      headerName: "105",
      headerAlign: "center",
      align: "center",
      width: 50,
    },
    {
      field: "s110",
      headerName: "110",
      headerAlign: "center",
      align: "center",
      width: 50,
    },
    {
      field: "s115",
      headerName: "115",
      headerAlign: "center",
      align: "center",
      width: 50,
    },
    {
      field: "s120",
      headerName: "120",
      headerAlign: "center",
      align: "center",
      width: 50,
    },
    {
      field: "s130",
      headerName: "130",
      headerAlign: "center",
      align: "center",
      width: 50,
    },
    {
      field: "s140",
      headerName: "140",
      headerAlign: "center",
      align: "center",
      width: 50,
    },

    {
      field: "s150",
      headerName: "150",
      headerAlign: "center",
      align: "center",
      width: 50,
    },

    {
      field: "s160",
      headerName: "160",
      headerAlign: "center",
      align: "center",
      width: 50,
    },

    {
      field: "s170",
      headerName: "170",
      headerAlign: "center",
      align: "center",
      width: 50,
    },
  ];

  return (
    <Box sx={{ height: "100%", width: "100%", overflowX: "scroll" }}>
      <DataGrid
        rowHeight={30}
        checkboxSelection
        onRowSelectionModelChange={(ids) => {
          const selectedIDs = new Set(ids);

          const selectedRows = pickingReducer.LotListSearch.filter((row) =>
            selectedIDs.has(row.id)
          );

          //console.log(selectedRows);

          const newdata = selectedRows.map((obj) => {
            const _data: AllocateLotRequest = {
              soNumber: "",
              buy: "",
              purOrder: "",
              lot: obj.lot,
            };
            return _data;
          });

          dispatch(AddLotLisrequestSelected(newdata));

          //console.log(newdata);
        }}
        components={{ Toolbar: QuickSearchToolbar }}
        componentsProps={{
          toolbar: {
            value: keywordSearchNoDelay,
            onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
              setKeywordSearch(e.target.value);
              setKeywordSearchNoDelay(e.target.value);
            },
            clearSearch: () => {
              setKeywordSearch("");
              setKeywordSearchNoDelay("");
            },
          },
        }}
        rows={
          pickingReducer.LotListSearch.length > 0
            ? pickingReducer.LotListSearch
            : rows
        }
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
          columns: {
            columnVisibilityModel: { id: false },
          },
        }}
        pageSizeOptions={[10, 50, 70]}
        // onRowDoubleClick={}
      ></DataGrid>
    </Box>
  );
};

export default LotListPicking;
