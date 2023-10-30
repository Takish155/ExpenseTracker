import {
  Button,
  FormControl,
  FormLabel,
  Grid,
  MenuItem,
  Paper,
  Select,
  TextField,
} from "@mui/material";
import { FieldErrors, UseFormRegister } from "react-hook-form";

type ExpenseData = {
  description: string;
  amount: number;
  category: string;
};

type Props = {
  register: UseFormRegister<ExpenseData>;
  handleSubmit: () => void;
  errors: FieldErrors<ExpenseData>;
};

export default function InputSection({
  register,
  handleSubmit,
  errors,
}: Props) {
  return (
    <Grid lg={6} item sx={{ width: "95%", margin: "1.4rem auto" }}>
      <Paper sx={{ margin: "0 auto", width: "95%" }}>
        <form onSubmit={handleSubmit}>
          <FormControl sx={{ marginLeft: "1rem" }}>
            <TextField
              {...register("description")}
              error={Boolean(errors.description)}
              helperText={errors.description?.message}
              variant="standard"
              label="Description"
              sx={{ width: "20rem", marginBottom: "1rem", marginTop: "1rem" }}
            />
            <TextField
              {...register("amount", { valueAsNumber: true })}
              error={Boolean(errors.amount)}
              helperText={errors.amount?.message}
              variant="standard"
              label="Amount"
              sx={{ width: "20rem", marginBottom: "2rem" }}
            />
            <FormControl sx={{ width: "65%" }}>
              <FormLabel className="mb-2">Category</FormLabel>
              <Select
                defaultValue={"Groceries"}
                sx={{ marginBottom: "1rem" }}
                {...register("category")}
              >
                <MenuItem value="Groceries">Groceries</MenuItem>
                <MenuItem value="Utilities">Utilities</MenuItem>
                <MenuItem value="Entertainment">Entertainment</MenuItem>
              </Select>
            </FormControl>
            <Button
              variant="contained"
              sx={{ marginBottom: "1rem" }}
              type="submit"
            >
              Submit
            </Button>
          </FormControl>
        </form>
      </Paper>
    </Grid>
  );
}
