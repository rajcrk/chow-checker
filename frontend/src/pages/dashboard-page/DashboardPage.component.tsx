import './DashboardPage.style.scss';
import FoodTableComponent from '../../features/food/components/FoodTable.component';
import { Loading, Grid, Column } from '@carbon/react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getFoodList } from '../../features/food/foodSlice';
import { useAppDispatch, useAppSelector } from '../../hooks/redux/hooks';
import { PieChart } from "@carbon/charts-react";


const DashboardPage: React.FC = () => {

    enum Alignments {
        LEFT = "left",
        CENTER = "center",
        RIGHT = "right"
    }

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const { foodList, dataTableHeader }
        = useAppSelector((state) => state.food);

    const { user }
        = useAppSelector((state) => state.auth);


    useEffect(() => {
        if (user) {
            dispatch(getFoodList(user.email));
        } else {
            navigate('/login');
        }
    }, [dispatch]);

    const state = {
        data: [
            {
                "group": "2V2N 9KYPM version 1",
                "value": 20000
            },
            {
                "group": "L22I P66EP L22I P66EP L22I P66EP",
                "value": 65000
            },],
        options: {
            "title": "What do you consume the most?",
            "resizable": true,
            "legend": {
                "alignment": Alignments.CENTER,
            },
            "pie": {
                "alignment": Alignments.CENTER,
            },
            "height": "400px"
        }
    };

    if (foodList == null || foodList === undefined) return <Loading
        description="Active loading indicator" withOverlay={false} />

    return (
        <div className='dashboard-container'>
            <Grid className="cds--grid">
                <Column lg={8} md={0} sm={0}>
                    <FoodTableComponent
                        foodList={foodList}
                        dataTableHeader={dataTableHeader}
                    />

                </Column>
                <Column lg={8} md={8} sm={4}>
                    <PieChart
                        {...state}>
                    </PieChart>
                </Column>
            </Grid>

        </div>
    );
};

export default DashboardPage;