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
    TableHeader,
    Tile,
    TableExpandRow,
    TableExpandedRow,
} from '@carbon/react';
import { Close } from '@carbon/icons-react';
import { Food } from "../models/Food";
import { deleteFood } from "../foodSlice";
import React from "react";

const FoodTableComponent:
    FC<{ foodList: Food[] | null, dataTableHeader: any }> =
    ({ foodList = [], dataTableHeader }) => {
        const dispatch = useAppDispatch();

        const onFoodRemoveHandler = (foodId: string) => {
            dispatch(deleteFood(foodId));
        }

        if (foodList == null || foodList === undefined) return <Loading
            description="Active loading indicator" withOverlay={false} />

        if (foodList.length === 0) return (
            <Tile> Wow such emptiness in your fridge, Add new food!</Tile>);

        return (
            <>
                <DataTable
                    rows={foodList}
                    headers={dataTableHeader}>
                    {({ rows, headers,
                        getHeaderProps,
                        getTableProps,
                        getRowProps,
                        getTableContainerProps
                    }:
                        { rows: Food[], headers: any, getHeaderProps: any, getTableProps: any, getRowProps: any, getTableContainerProps: any }) => (
                        <TableContainer
                            title="What's in your fridge right now!"
                            description="You can expand to see nutrient contents"
                            {...getTableContainerProps()}>
                            <Table {...getTableProps()}>
                                <TableHead>
                                    <TableRow key={"headerRowKey"}>
                                        <TableHeader></TableHeader>
                                        {headers.map((header: { header: string, key: string }) => (
                                            <TableHeader {...getHeaderProps({ header })}>
                                                {header.header}
                                            </TableHeader>
                                        ))}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {rows.map((row: any) => (
                                        <React.Fragment key={row.id}>
                                            <TableExpandRow {...getRowProps({ row })}>
                                                {row.cells.map((cell: any) => {
                                                    if (cell.info.header === 'action') {
                                                        return (
                                                            <TableCell key={Math.random()}>
                                                                <Close
                                                                    onClick={() => onFoodRemoveHandler(row.id)}
                                                                    className="carbon-link" />
                                                            </TableCell>
                                                        )
                                                    } else {
                                                        return (
                                                            <TableCell key={cell.id}>{cell.value}</TableCell>
                                                        )
                                                    }
                                                })}

                                            </TableExpandRow>
                                            {row.isExpanded && (
                                                <TableExpandedRow colSpan={headers.length + 1}>
                                                    <p>Aux squad rules</p>
                                                </TableExpandedRow>
                                            )}
                                        </React.Fragment>
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