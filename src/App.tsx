import { Grid } from "@mui/material";
import "./App.css";
import InputSection from "./components/Input";
import TableSection from "./components/Table";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";

const schema = z.object({
  description: z
    .string()
    .min(1, { message: "Required, Please write something!" }),
  amount: z.number().min(1, { message: "Required, Please put the amount!" }),
  category: z.string().min(1, { message: "Required, Please pick something!" }),
});

type FormData = z.infer<typeof schema>;

type ExpenseData = {
  description: string;
  amount: number;
  category: string;
  id: number;
};

function App() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const [expenseData, setExpenseData] = useState<ExpenseData[]>([]);

  const onSubmit = (data: FormData) => {
    setExpenseData([
      ...expenseData,
      {
        id: expenseData.length + 1,
        description: data.description,
        amount: data.amount,
        category: data.category,
      },
    ]);
  };

  const handleDelete = (id: number): void => {
    setExpenseData((prevData) => prevData.filter((ele) => ele.id !== id));
  };

  return (
    <>
      <h1 className="text-5xl text-bold p-3">Expense Form</h1>
      <Grid container>
        <InputSection
          register={register}
          errors={errors}
          handleSubmit={handleSubmit((data) => {
            onSubmit(data);
            console.log(expenseData);
          })}
        />
        <TableSection expenseData={expenseData} handleDelete={handleDelete} />
      </Grid>
    </>
  );
}

export default App;
