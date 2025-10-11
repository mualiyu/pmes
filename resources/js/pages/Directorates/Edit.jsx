import ActionButton from '@/components/ActionButton';
import BackButton from '@/components/BackButton';
import useForm from '@/hooks/useForm';
import ContainerBox from '@/layouts/ContainerBox';
import Layout from '@/layouts/MainLayout';
import { redirectTo } from '@/utils/route';
import { usePage } from '@inertiajs/react';
import { Anchor, Breadcrumbs, Fieldset, Grid, Group, TextInput, Title } from '@mantine/core';

const DirectorateEdit = () => {
  const { item } = usePage().props;
  const [form, submit, updateValue] = useForm('post', route('directorates.update', item.id), {
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
          onClick={() => redirectTo('directorates.index')}
          fz={14}
        >
          Directorates
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
          <Title order={1}>Edit Directorate</Title>
        </Grid.Col>
        <Grid.Col span='content'></Grid.Col>
      </Grid>

      <ContainerBox maw={600}>
        <form onSubmit={submit}>
          <TextInput
            label='Directorate Code'
            placeholder='E.g. DIR001'
            required
            value={form.data.code}
            onChange={e => updateValue('code', e.target.value)}
            error={form.errors.code}
          />
          <TextInput
            label='Directorate Name'
            placeholder='Directorate name'
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
            <BackButton route='directorates.index' />
            <ActionButton loading={form.processing}>Update Directorate</ActionButton>
          </Group>
        </form>
      </ContainerBox>
    </>
  );
};

DirectorateEdit.layout = page => <Layout title='Edit Directorate'>{page}</Layout>;

export default DirectorateEdit;

