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

const MilestoneEdit = () => {
  const { project, item } = usePage().props;

  const [form, submit, updateValue] = useForm(
    "post",
    route("projects.milestones.update", {
      project: project.id,
      milestone: item.id,
    }),
    {
      _method: "put",
      name: item.name,
      description: item.description || "",
      status: item.status,
      start_date: item.start_date || "",
      end_date: item.end_date || "",
      actual_start_date: item.actual_start_date || "",
      actual_end_date: item.actual_end_date || "",
      progress: item.progress || 0,
      budget_allocated: item.budget_allocated || 0,
      deliverables: item.deliverables || "",
      order: item.order || 0,
    }
  );

  const statusOptions = [
    { value: "not_started", label: "Not Started" },
    { value: "in_progress", label: "In Progress" },
    { value: "completed", label: "Completed" },
    { value: "delayed", label: "Delayed" },
    { value: "cancelled", label: "Cancelled" },
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
            redirectTo("projects.milestones.index", { project: project.id })
          }
          fz={14}
        >
          {project.name}
        </Anchor>
        <div>Edit Milestone</div>
      </Breadcrumbs>

      <Grid justify="space-between" align="flex-end" gutter="xl" mb="lg">
        <Grid.Col span="auto">
          <Title order={1}>Edit Milestone</Title>
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
                placeholder="Enter milestone name"
                required
                value={form.data.name}
                onChange={(e) => updateValue("name", e.target.value)}
                error={form.errors.name}
              />
            </Grid.Col>

            <Grid.Col span={12}>
              <Textarea
                label="Description"
                placeholder="Describe this milestone"
                rows={4}
                value={form.data.description}
                onChange={(e) => updateValue("description", e.target.value)}
                error={form.errors.description}
              />
            </Grid.Col>

            <Grid.Col span={{ base: 12, sm: 6 }}>
              <Select
                label="Status"
                placeholder="Select status"
                data={statusOptions}
                required
                value={form.data.status}
                onChange={(value) => updateValue("status", value)}
                error={form.errors.status}
              />
            </Grid.Col>

            <Grid.Col span={{ base: 12, sm: 6 }}>
              <NumberInput
                label="Progress (%)"
                placeholder="0"
                min={0}
                max={100}
                value={form.data.progress}
                onChange={(value) => updateValue("progress", value)}
                error={form.errors.progress}
              />
            </Grid.Col>

            <Grid.Col span={{ base: 12, sm: 6 }}>
              <TextInput
                label="Start Date"
                type="date"
                value={form.data.start_date}
                onChange={(e) => updateValue("start_date", e.target.value)}
                error={form.errors.start_date}
              />
            </Grid.Col>

            <Grid.Col span={{ base: 12, sm: 6 }}>
              <TextInput
                label="End Date"
                type="date"
                value={form.data.end_date}
                onChange={(e) => updateValue("end_date", e.target.value)}
                error={form.errors.end_date}
              />
            </Grid.Col>

            <Grid.Col span={{ base: 12, sm: 6 }}>
              <TextInput
                label="Actual Start Date"
                type="date"
                value={form.data.actual_start_date}
                onChange={(e) => updateValue("actual_start_date", e.target.value)}
                error={form.errors.actual_start_date}
              />
            </Grid.Col>

            <Grid.Col span={{ base: 12, sm: 6 }}>
              <TextInput
                label="Actual End Date"
                type="date"
                value={form.data.actual_end_date}
                onChange={(e) => updateValue("actual_end_date", e.target.value)}
                error={form.errors.actual_end_date}
              />
            </Grid.Col>

            <Grid.Col span={{ base: 12, sm: 6 }}>
              <NumberInput
                label="Budget Allocated"
                placeholder="0.00"
                min={0}
                decimalScale={2}
                prefix="₦ "
                thousandSeparator=","
                value={form.data.budget_allocated}
                onChange={(value) => updateValue("budget_allocated", value)}
                error={form.errors.budget_allocated}
              />
            </Grid.Col>

            <Grid.Col span={{ base: 12, sm: 6 }}>
              <NumberInput
                label="Order"
                placeholder="0"
                min={0}
                value={form.data.order}
                onChange={(value) => updateValue("order", value)}
                error={form.errors.order}
              />
            </Grid.Col>

            <Grid.Col span={12}>
              <Textarea
                label="Deliverables"
                placeholder="List expected deliverables"
                rows={4}
                value={form.data.deliverables}
                onChange={(e) => updateValue("deliverables", e.target.value)}
                error={form.errors.deliverables}
              />
            </Grid.Col>
          </Grid>

          <Group justify="flex-end" mt="xl">
            <ActionButton loading={form.processing} type="submit">
              Update Milestone
            </ActionButton>
          </Group>
        </form>
      </ContainerBox>
    </>
  );
};

MilestoneEdit.layout = (page) => (
  <Layout title="Edit Milestone">{page}</Layout>
);

export default MilestoneEdit;

