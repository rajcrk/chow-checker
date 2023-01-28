import { FC } from "react";
import { useAppDispatch } from "../../../hooks/redux/hooks";
import {
    TableRow,
    Table,
    TableHead,
    TableContainer,
    DataTable,
    Loading,
    TableBody,
    TableCell,
    TableHeader
} from '@carbon/react';
import { TrashCan } from '@carbon/icons-react';
import { Food } from "../models/Food";
import { deleteFood } from "../foodSlice";

const FoodTableComponent: 
    FC<{ foodList: Food[] | null, dataTableHeader: any }> = 
        ({ foodList = [], dataTableHeader }) => {
    const dispatch = useAppDispatch();

    const onFoodRemoveHandler = (foodId: string) => {
        dispatch(deleteFood(foodId));
    }

    if (foodList == null || foodList === undefined) return <Loading
        description="Active loading indicator" withOverlay={false} />

    return (
        <>
            <DataTable
                rows={foodList}
                headers={dataTableHeader}>
                {({ rows, headers, getHeaderProps, getTableProps }:
                    { rows: Food[], headers: any, getHeaderProps: any, getTableProps: any }) => (
                    <TableContainer title="What's in your fridge right now!">
                        <Table {...getTableProps()}>
                            <TableHead>
                                <TableRow key={"headerRowKey"}>
                                    {headers.map((header: { header: string, key: string }) => (
                                        <TableHeader {...getHeaderProps({ header })}>
                                            {header.header}
                                        </TableHeader>
                                    ))}
                                    <TableHeader>Remove Food</TableHeader>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows.map((row: any) => (
                                    <TableRow key={row.id}>
                                        {row.cells.map((cell: any) => (
                                            <TableCell key={cell.id}>{cell.value}</TableCell>
                                        ))}
                                        <TableCell key={Math.random()}>
                                            <button onClick={() => onFoodRemoveHandler(row.id)}><TrashCan size="24" /></button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                )}
            </DataTable>
        </>
    );
}

export default FoodTableComponent;