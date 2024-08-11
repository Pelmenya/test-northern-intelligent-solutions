import { MouseEvent, useEffect, useState } from 'react';
import {
    Typography,
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Paper,
    Box,
} from '@mui/material';

import {} from '../../store/selectors/github-selectors';
import { formatDate } from '../../utils/functions/formatDate';
import { TRepoNode } from '../../types/t-seach-repositories-response';
import { TableSortCell } from './components/table-sort-cell/table-sort-cell';
import { TSorts } from '../../types/t-sorts';
import { useAppDispatch } from '../../hooks/use-app-dispatch';
import { searchRepositories, setSorts } from '../../store/slices/github-slice';

export type TRepoTableProps = {
    data: TRepoNode[];
    sorts: TSorts;
    repoName: string;
    rowsPerPage: number;
};

export const RepoTable = ({
    data,
    sorts,
    repoName,
    rowsPerPage,
}: TRepoTableProps) => {
    const dispatch = useAppDispatch();

    const handleOnClickSort = (e: MouseEvent<HTMLButtonElement>) => {
        switch (e.currentTarget.id) {
            case 'forks':
                if (sorts.forks === 'sort:forks-asc') {
                    dispatch(
                        setSorts({
                            forks: 'sort:forks-desc',
                            stars: null,
                            updatedAt: null,
                        })
                    );
                    dispatch(
                        searchRepositories({
                            name: repoName + ' sort:forks-desc',
                            first: rowsPerPage,
                            after: null,
                        })
                    );
                } else {
                    dispatch(
                        setSorts({
                            forks: 'sort:forks-asc',
                            stars: null,
                            updatedAt: null,
                        })
                    );
                    dispatch(
                        searchRepositories({
                            name: repoName + ' sort:forks-asc',
                            first: rowsPerPage,
                            after: null,
                        })
                    );
                }
                break;
            case 'stars':
                if (sorts.stars === 'sort:stars-asc') {
                    dispatch(
                        setSorts({
                            forks: null,
                            stars: 'sort:stars-desc',
                            updatedAt: null,
                        })
                    );
                    dispatch(
                        searchRepositories({
                            name: repoName + ' sort:stars-desc',
                            first: rowsPerPage,
                            after: null,
                        })
                    );
                } else {
                    dispatch(
                        setSorts({
                            forks: null,
                            stars: 'sort:stars-asc',
                            updatedAt: null,
                        })
                    );
                    dispatch(
                        searchRepositories({
                            name: repoName + ' sort:stars-asc',
                            first: rowsPerPage,
                            after: null,
                        })
                    );
                }
                break;
            case 'updatedAt':
                if (sorts.updatedAt === 'sort:updated-asc') {
                    dispatch(
                        setSorts({
                            forks: null,
                            stars: null,
                            updatedAt: 'sort:updated-desc',
                        })
                    );
                    dispatch(
                        searchRepositories({
                            name: repoName + ' sort:updated-desc',
                            first: rowsPerPage,
                            after: null,
                        })
                    );
                } else {
                    dispatch(
                        setSorts({
                            forks: null,
                            stars: null,
                            updatedAt: 'sort:updated-asc',
                        })
                    );
                    dispatch(
                        searchRepositories({
                            name: repoName + ' sort:updated-asc',
                            first: rowsPerPage,
                            after: null,
                        })
                    );
                }
                break;
        }
    };

    return (
        <Box>
            <Typography variant="h3">Результаты поиска</Typography>
            <TableContainer
                sx={{ boxShadow: 'none', marginTop: '24px' }}
                component={Paper}
            >
                <Table
                    sx={{ width: '100%', maxWidth: 912 }}
                    aria-label="simple table"
                >
                    <TableHead
                        sx={[
                            {
                                th: {
                                    fontWeight: 500,
                                    lineHeight: '24px',
                                    padding: ' 0px 10px 0px 10px',
                                    opacity: 1,
                                    color: 'text.secondary',
                                    height: '56px',
                                    width: '183px',
                                    maxWidth: '183px',
                                },
                            },
                        ]}
                    >
                        <TableRow>
                            <TableCell>Название</TableCell>
                            <TableCell align="left">Язык</TableCell>
                            <TableCell align="left">
                                <TableSortCell
                                    id="forks"
                                    fieldName="Число форков"
                                    direction={sorts.forks}
                                    handleOnClick={handleOnClickSort}
                                />
                            </TableCell>
                            <TableCell align="left">
                                <TableSortCell
                                    id="stars"
                                    fieldName="Число звезд"
                                    direction={sorts.stars}
                                    handleOnClick={handleOnClickSort}
                                />
                            </TableCell>
                            <TableCell align="left">
                                <TableSortCell
                                    id="updatedAt"
                                    fieldName="Дата обновления"
                                    direction={sorts.updatedAt}
                                    handleOnClick={handleOnClickSort}
                                />
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody
                        sx={{
                            th: {
                                lineHeight: '24px',
                                padding: ' 0px 10px 0px 10px',
                                height: '52px',
                                width: '183px',
                                maxWidth: '183px',
                                whiteSpace: 'wrap',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                            },
                        }}
                    >
                        {data.map((repo) => (
                            <TableRow
                                key={repo.id}
                                sx={[
                                    {
                                        td: {
                                            lineHeight: '24px',
                                            padding: ' 0px 10px 0px 10px',
                                            height: '52px',
                                            width: '183px',
                                            maxWidth: '183px',
                                            whiteSpace: 'wrap',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                        },
                                    },
                                ]}
                            >
                                <TableCell component="th" scope="row">
                                    {repo.name}
                                </TableCell>
                                <TableCell align="left">
                                    {repo.primaryLanguage?.name
                                        ? repo.primaryLanguage.name
                                        : ''}
                                </TableCell>
                                <TableCell align="left">
                                    {repo?.forkCount}
                                </TableCell>
                                <TableCell align="left">
                                    {repo.stargazers?.totalCount}
                                </TableCell>
                                <TableCell align="left">
                                    {formatDate(repo.updatedAt)}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};
