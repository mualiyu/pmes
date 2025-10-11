import ArchivedFilterButton from '@/components/ArchivedFilterButton';
import Pagination from '@/components/Pagination';
import SearchInput from '@/components/SearchInput';
import TableHead from '@/components/TableHead';
import TableRowEmpty from '@/components/TableRowEmpty';
import Layout from '@/layouts/MainLayout';
import { redirectTo, reloadWithQuery } from '@/utils/route';
import { actionColumnVisibility, prepareColumns } from '@/utils/table';
import { usePage } from '@inertiajs/react';
import { Button, Grid, Group, Table } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import TableRow from '../Clients/Companies/TableRow';

const DirectoratesIndex = () => {
  const { items } = usePage().props;

  const columns = prepareColumns([
    { label: 'Directorate Name', column: 'name' },
    { label: 'Email', column: 'email' },
    {
      label: 'Actions',
      sortable: false,
      visible: actionColumnVisibility('client company'),
    },
  ]);

  const rows = items.data.length ? (
    items.data.map(item => (
      <TableRow
        item={item}
        key={item.id}
        editRoute="directorates.edit"
        deleteRoute="directorates.destroy"
        restoreRoute="directorates.restore"
      />
    ))
  ) : (
    <TableRowEmpty colSpan={columns.length} />
  );

  const search = search => reloadWithQuery({ search });
  const sort = sort => reloadWithQuery(sort);

  return (
    <>
      <Grid
        justify='space-between'
        align='center'
      >
        <Grid.Col span='content'>
          <Group>
            <SearchInput
              placeholder='Search directorates'
              search={search}
            />
            <ArchivedFilterButton />
          </Group>
        </Grid.Col>
        <Grid.Col span='content'>
          {can('create client company') && (
            <Button
              leftSection={<IconPlus size={14} />}
              radius='xl'
              variant="gradient"
              gradient={{ from: 'green', to: 'green' }}
              onClick={() => redirectTo('directorates.create')}
            >
              Create Directorate
            </Button>
          )}
        </Grid.Col>
      </Grid>

      <Table.ScrollContainer
        miw={800}
        my='lg'
      >
        <Table verticalSpacing='sm'>
          <TableHead
            columns={columns}
            sort={sort}
          />
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      </Table.ScrollContainer>

      <Pagination
        current={items.meta.current_page}
        pages={items.meta.last_page}
      />
    </>
  );
};

DirectoratesIndex.layout = page => <Layout title='Directorates'>{page}</Layout>;

export default DirectoratesIndex;

