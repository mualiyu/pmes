import ActionButton from '@/components/ActionButton';
import BackButton from '@/components/BackButton';
import useForm from '@/hooks/useForm';
import ContainerBox from '@/layouts/ContainerBox';
import Layout from '@/layouts/MainLayout';
import { redirectTo } from '@/utils/route';
import { usePage } from '@inertiajs/react';
import { Anchor, Breadcrumbs, Fieldset, Grid, Group, TextInput, Title } from '@mantine/core';

const VendorEdit = () => {
  const { item } = usePage().props;
  const [form, submit, updateValue] = useForm('post', route('vendors.update', item.id), {
    _method: 'put',
    code: item.code || '',
    name: item.name,
    email: item.email || '',
    phone: item.phone || '',
  });

  return (
    <>
      <Breadcrumbs
        fz={14}
        mb={30}
      >
        <Anchor
          href='#'
          onClick={() => redirectTo('vendors.index')}
          fz={14}
        >
          Vendors
        </Anchor>
        <div>Edit</div>
      </Breadcrumbs>

      <Grid
        justify='space-between'
        align='flex-end'
        gutter='xl'
        mb='lg'
      >
        <Grid.Col span='auto'>
          <Title order={1}>Edit Vendor</Title>
        </Grid.Col>
        <Grid.Col span='content'></Grid.Col>
      </Grid>

      <ContainerBox maw={600}>
        <form onSubmit={submit}>
          <TextInput
            label='Vendor Code'
            placeholder='E.g. VEN001'
            required
            value={form.data.code}
            onChange={e => updateValue('code', e.target.value)}
            error={form.errors.code}
          />
          <TextInput
            label='Vendor Name'
            placeholder='Vendor name'
            required
            mt='md'
            value={form.data.name}
            onChange={e => updateValue('name', e.target.value)}
            error={form.errors.name}
          />

          <Fieldset
            legend='Contact'
            mt='xl'
          >
            <Group grow>
              <TextInput
                label='Email'
                placeholder='Email'
                value={form.data.email}
                onChange={e => updateValue('email', e.target.value)}
                error={form.errors.email}
              />

              <TextInput
                label='Phone'
                placeholder='Phone'
                value={form.data.phone}
                onChange={e => updateValue('phone', e.target.value)}
                error={form.errors.phone}
              />
            </Group>
          </Fieldset>

          <Group
            justify='space-between'
            mt='xl'
          >
            <BackButton route='vendors.index' />
            <ActionButton loading={form.processing}>Update Vendor</ActionButton>
          </Group>
        </form>
      </ContainerBox>
    </>
  );
};

VendorEdit.layout = page => <Layout title='Edit Vendor'>{page}</Layout>;

export default VendorEdit;

