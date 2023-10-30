import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  Paper,
  TableBody,
  Grid,
  Button,
  TableFooter,
  FormControl,
  FormLabel,
  Select,
  MenuItem,
} from "@mui/material/";
import { useState } from "react";

type ExpenseData = {
  description: string;
  amount: number;
  category: string;
  id: number;
};

type Props = {
  expenseData: ExpenseData[];
  handleDelete: (id: number) => void;
};

export default function TableSection({ expenseData, handleDelete }: Props) {
  const [category, setCategory] = useState("allCategories");
  const filteredCategory =
    category === "allCategories"
      ? expenseData
      : expenseData.filter((ele) => ele.category === category);

  return (
    <Grid lg={6} item sx={{ width: "95%", margin: "0 auto" }}>
      <FormControl
        sx={{ width: "30%", marginLeft: "1rem", marginBottom: "2rem" }}
      >
        <FormLabel className="mb-2">Filter By</FormLabel>
        <Select
          name="Filter"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <MenuItem value="allCategories">All Category</MenuItem>
          <MenuItem value="Groceries">Groceries</MenuItem>
          <MenuItem value="Utilities">Utilities</MenuItem>
          <MenuItem value="Entertainment">Entertainment</MenuItem>
        </Select>
      </FormControl>
      <TableContainer component={Paper} sx={{ width: "95%", margin: "0 auto" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Description</TableCell>
              <TableCell align="right">Amount</TableCell>
              <TableCell align="right">Category</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredCategory.length === 0 ? (
              <TableRow>
                <TableCell>No data found</TableCell>
              </TableRow>
            ) : (
              filteredCategory.map((ele, index) => {
                return (
                  <TableRow key={index + 923}>
                    <TableCell>{ele.description}</TableCell>
                    <TableCell align="right">
                      ${ele.amount.toFixed(1)}
                    </TableCell>
                    <TableCell align="right">{ele.category}</TableCell>
                    <TableCell align="right">
                      <Button
                        sx={{ color: "red" }}
                        onClick={() => handleDelete(ele.id)}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
          {filteredCategory.length === 0 ? (
            ""
          ) : (
            <TableFooter>
              <TableRow>
                <TableCell>Total</TableCell>
                <TableCell align="right">
                  $
                  {filteredCategory
                    .reduce((acum, expeses) => {
                      return expeses.amount + acum;
                    }, 0)
                    .toFixed(2)}
                </TableCell>
              </TableRow>
            </TableFooter>
          )}
        </Table>
      </TableContainer>
    </Grid>
  );
}
