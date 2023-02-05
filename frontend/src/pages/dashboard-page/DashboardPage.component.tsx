import './DashboardPage.style.scss';
import FoodTableComponent from '../../features/food/components/FoodTable.component';
import { Loading, Grid, Column } from '@carbon/react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getFoodList } from '../../features/food/foodSlice';
import { useAppDispatch, useAppSelector } from '../../hooks/redux/hooks';
import { PieChart } from "@carbon/charts-react";
import { Food } from '../../features/food/models/Food';

const DashboardPage: React.FC = () => {

    enum Alignments {
        LEFT = "left",
        CENTER = "center",
        RIGHT = "right"
    }

    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [pieData, setPieData] = useState<{ 
        group: string, value: number }[] | null>([]);

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

    useEffect(() => populatePieData(foodList), [foodList]);

    const populatePieData = (foodList: Food[] | null | undefined) => {
        // return if foodList is undefined or null
        if (!foodList) return;

        // create an array to store chart data
        const chartData: { group: string, value: number }[] = [];

        // create a Map to store the count of each food item
        const foodMap = new Map<string, number>();

        // loop through foodList and update the count of each food item in the Map
        foodList.forEach(food => {
            if (!foodMap.has(food.name)) {
                foodMap.set(food.name, 1);
            } else {
                foodMap.set(food.name, foodMap.get(food.name)! + 1);
            }
        });

        // convert the Map to an array of chart data
        foodMap.forEach((value, key) => chartData.push({ group: key, value }));
        setPieData(chartData);
    };

    const options = {
        "title": "What do you consume the most?",
        "resizable": true,
        "legend": {
            "alignment": Alignments.CENTER,
        },
        "pie": {
            "alignment": Alignments.CENTER,
        },
        "height": "400px"
    };

    if (foodList == null || foodList === undefined) return (
        <Grid style={{ marginTop: "6em" }}>
            <Column lg={4} md={2} sm={0}></Column>
            <Column lg={8} md={4} sm={4}>
                <Loading
                    description="Active loading indicator" withOverlay={false} />
            </Column>
            <Column lg={4} md={2} sm={0}></Column>
        </Grid>
    );

    return (
        <div className='dashboard-container'>
            <Grid className="cds--grid">
                <Column lg={8} md={8} sm={4}>
                    <FoodTableComponent
                        foodList={foodList}
                        dataTableHeader={dataTableHeader}
                    />
                </Column>
                <Column lg={8} md={8} sm={4}>
                    {
                        pieData !== null
                        && pieData.length > 0
                        && (<PieChart
                            options={options}
                            data={pieData} />)
                    }
                </Column>
            </Grid>
        </div>
    );
};

export default DashboardPage;