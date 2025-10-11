import ActionButton from "@/components/ActionButton";
import BackButton from "@/components/BackButton";
import useForm from "@/hooks/useForm";
import ContainerBox from "@/layouts/ContainerBox";
import Layout from "@/layouts/MainLayout";
import { redirectTo } from "@/utils/route";
import { usePage } from "@inertiajs/react";
import {
  Anchor,
  Breadcrumbs,
  Grid,
  Group,
  NumberInput,
  Select,
  TextInput,
  Textarea,
  Title,
} from "@mantine/core";

const BudgetCreate = ({ dropdowns: { currencies } }) => {
  const { project } = usePage().props;

  const [form, submit, updateValue] = useForm(
    "post",
    route("projects.budgets.store", { project: project.id }),
    {
      project_id: project.id,
      name: "",
      description: "",
      status: "draft",
      currency_id: "",
      total_amount: 0,
      allocated_amount: 0,
      spent_amount: 0,
      remaining_amount: 0,
      fiscal_year_start: "",
      fiscal_year_end: "",
      notes: "",
    }
  );

  const statusOptions = [
    { value: "draft", label: "Draft" },
    { value: "approved", label: "Approved" },
    { value: "active", label: "Active" },
    { value: "exceeded", label: "Exceeded" },
    { value: "closed", label: "Closed" },
  ];

  return (
    <>
      <Breadcrumbs fz={14} mb={30}>
        <Anchor
          href="#"
          onClick={() => redirectTo("projects.index")}
          fz={14}
        >
          Projects
        </Anchor>
        <Anchor
          href="#"
          onClick={() =>
            redirectTo("projects.budgets.index", { project: project.id })
          }
          fz={14}
        >
          {project.name}
        </Anchor>
        <div>Create Budget</div>
      </Breadcrumbs>

      <Grid justify="space-between" align="flex-end" gutter="xl" mb="lg">
        <Grid.Col span="auto">
          <Title order={1}>Create Budget</Title>
        </Grid.Col>
        <Grid.Col span="content">
          <BackButton />
        </Grid.Col>
      </Grid>

      <ContainerBox maw={700}>
        <form onSubmit={submit}>
          <Grid>
            <Grid.Col span={12}>
              <TextInput
                label="Name"
                placeholder="Enter budget name"
                required
                {...form.getInputProps("name")}
              />
            </Grid.Col>

            <Grid.Col span={12}>
              <Textarea
                label="Description"
                placeholder="Describe this budget"
                rows={3}
                {...form.getInputProps("description")}
              />
            </Grid.Col>

            <Grid.Col span={{ base: 12, sm: 6 }}>
              <Select
                label="Status"
                placeholder="Select status"
                data={statusOptions}
                required
                {...form.getInputProps("status")}
              />
            </Grid.Col>

            <Grid.Col span={{ base: 12, sm: 6 }}>
              <Select
                label="Currency"
                placeholder="Select currency"
                data={currencies}
                {...form.getInputProps("currency_id")}
              />
            </Grid.Col>

            <Grid.Col span={{ base: 12, sm: 6 }}>
              <NumberInput
                label="Total Amount"
                placeholder="0.00"
                min={0}
                decimalScale={2}
                prefix="₦ "
                thousandSeparator=","
                required
                {...form.getInputProps("total_amount")}
              />
            </Grid.Col>

            <Grid.Col span={{ base: 12, sm: 6 }}>
              <NumberInput
                label="Allocated Amount"
                placeholder="0.00"
                min={0}
                decimalScale={2}
                prefix="₦ "
                thousandSeparator=","
                {...form.getInputProps("allocated_amount")}
              />
            </Grid.Col>

            <Grid.Col span={{ base: 12, sm: 6 }}>
              <NumberInput
                label="Spent Amount"
                placeholder="0.00"
                min={0}
                decimalScale={2}
                prefix="₦ "
                thousandSeparator=","
                {...form.getInputProps("spent_amount")}
              />
            </Grid.Col>

            <Grid.Col span={{ base: 12, sm: 6 }}>
              <NumberInput
                label="Remaining Amount"
                placeholder="Auto-calculated"
                min={0}
                decimalScale={2}
                prefix="₦ "
                thousandSeparator=","
                disabled
                {...form.getInputProps("remaining_amount")}
              />
            </Grid.Col>

            <Grid.Col span={{ base: 12, sm: 6 }}>
              <TextInput
                label="Fiscal Year Start"
                type="date"
                {...form.getInputProps("fiscal_year_start")}
              />
            </Grid.Col>

            <Grid.Col span={{ base: 12, sm: 6 }}>
              <TextInput
                label="Fiscal Year End"
                type="date"
                {...form.getInputProps("fiscal_year_end")}
              />
            </Grid.Col>

            <Grid.Col span={12}>
              <Textarea
                label="Notes"
                placeholder="Additional notes or comments"
                rows={3}
                {...form.getInputProps("notes")}
              />
            </Grid.Col>
          </Grid>

          <Group justify="flex-end" mt="xl">
            <ActionButton loading={form.processing} type="submit">
              Create Budget
            </ActionButton>
          </Group>
        </form>
      </ContainerBox>
    </>
  );
};

BudgetCreate.layout = (page) => (
  <Layout title="Create Budget">{page}</Layout>
);

export default BudgetCreate;

