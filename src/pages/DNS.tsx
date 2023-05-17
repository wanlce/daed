import { Button, Flex, Group } from '@mantine/core'
import { useStore } from '@nanostores/react'
import { useCallback, useMemo, useState } from 'react'

import { useDNSsQuery, useRemoveDNSMutation } from '~/apis'
import { Table } from '~/components/Table'
import { useMainContainerSize } from '~/contexts'
import { defaultResourcesAtom } from '~/store'

export const DNSPage = () => {
  const { height } = useMainContainerSize()
  const { defaultDNSID } = useStore(defaultResourcesAtom)
  const { data: dnssQuery } = useDNSsQuery()
  const [rowSelection, onRowSelectionChange] = useState({})
  const removeDNSMutation = useRemoveDNSMutation()
  const [removing, setRemoving] = useState(false)
  const selectedRowIds: string[] = useMemo(
    () =>
      Object.keys(rowSelection)
        .map((selectedIndex) => {
          return dnssQuery?.dnss[Number(selectedIndex)].id
        })
        .filter((id) => !!id) as string[],
    [dnssQuery?.dnss, rowSelection]
  )

  const onRemove = useCallback(async () => {
    setRemoving(true)
    onRowSelectionChange({})
    await Promise.all(selectedRowIds.map((selectedRowId) => removeDNSMutation.mutateAsync(selectedRowId)))
    setRemoving(false)
  }, [removeDNSMutation, selectedRowIds])

  return (
    <Flex h={height} direction="column" justify="space-between">
      <Table
        columns={[
          {
            id: 'id',
            header: 'id',
            accessorKey: 'id',
          },
          {
            header: 'name',
            accessorKey: 'name',
          },
          {
            header: 'selected',
            accessorKey: 'selected',
          },
        ]}
        dataSource={dnssQuery?.dnss || []}
        enableRowSelection={(row) => {
          return row.getValue('id') !== defaultDNSID
        }}
        rowSelection={rowSelection}
        onRowSelectionChange={onRowSelectionChange}
      />

      <Group position="right">
        <Button color="red" uppercase loading={removing} onClick={onRemove}>
          Delete ({Object.keys(rowSelection).length})
        </Button>
      </Group>
    </Flex>
  )
}