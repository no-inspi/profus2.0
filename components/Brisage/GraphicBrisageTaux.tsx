import { LineChart, Line, CartesianGrid, XAxis, YAxis, ResponsiveContainer, Tooltip, Legend } from 'recharts';

import { useState, useEffect } from 'react'
import axios from 'axios'

import styles from "./graph.module.css"



const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className={styles.tooltip_container}>
          <p className="label">{`Taux : ${payload[0].value}%`}</p>
        </div>
      );
    }
  
    return null;
  };

export default function GraphicBrisageTaux({item}: any) {

    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        var tauxresp = axios({
            method: 'get',
            url: `http://localhost:3001/items/get_item_taux?id=${item.id}`,
            headers: {},
        })
            .then((response) => {
                if (response.status == 200) {
                    setData(response.data)
                    setLoading(false)
                }
                else {
                }

            }, (error) => {
                console.log(error);
            });
    }, [])

    return (
        <div className={styles.graph_container}>
            <div className={styles.graph_taux_title}>Taux </div>
            {loading ? ("test") : (
            <ResponsiveContainer width="100%" height="100%">
                <LineChart
                    width={800}
                    height={300}
                    data={data}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="createdAt" />
                    <YAxis />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                    <Line type="monotone" dataKey="taux" stroke="white" activeDot={{ r: 8 }} /> 
                </LineChart>
            </ResponsiveContainer>
            )}
        </div>
    )
}