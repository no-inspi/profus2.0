import { LineChart, Line, CartesianGrid, XAxis, YAxis, ResponsiveContainer, Tooltip, Legend } from 'recharts';

import { useState, useEffect } from 'react'
import axios from 'axios'

import styles from "./graph.module.css"
import { Select } from '@chakra-ui/react'
import { add, format, differenceInCalendarDays, isFuture } from "date-fns";



const CustomTooltipTaux = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
        return (
            <div className={styles.tooltip_container}>
                <p className="label">{`Taux : ${payload[0].value}%`}</p>
            </div>
        );
    }

    return null;
};

const CustomTooltipRunePrice = ({ active, payload, label }: any) => {
    console.log(payload[0])
    if (active && payload && payload.length) {
        return (
            <div className={styles.tooltip_container}>
                <p className="label">{`Prix : ${Math.floor(payload[0].value)}`}</p>
                <p className="label">{`Date : ${format(new Date(payload[0].payload.saved_date), "dd/MMM/yyyy")}`}</p>
            </div>
        );
    }

    return null;
};

const dateFormatter = (date: any) => {
    return format(new Date(date), "dd/MMM/yyyy");
  };

export default function GraphicBrisageTaux({ item, data }: any) {

    const [dataTaux, setDataTaux] = useState([])
    const [dataRunePrice, setDataRunePrice] = useState([])
    const [loading, setLoading] = useState(true)
    const [server, setServer] = useState({"id": 36, "name": "Imagiro"})

    useEffect(() => {
        console.log(item.id_)
        var tauxresp = axios({
            method: 'get',
            url: `https://profus-api-1-0.vercel.app/items/get_item_taux?id=${item.id_}`,
            headers: {},
        })
            .then((response) => {
                console.log(response)
                if (response.status == 200) {
                    setDataTaux(response.data)
                    setLoading(false)
                }
                else {
                }

            }, (error) => {
                console.log(error);
            });

        console.log(item.item_effect[0].rune_item_id)


        const runepriceresp = axios({
            method: 'get',
            url: `https://profus-api-1-0.vercel.app/graph/get_rune_price_per_d?id=${item.item_effect[0].rune_item_id}&server_id=36`,
            headers: {},
        })
            .then((response) => {
                if (response.status == 200) {
                    setDataRunePrice(response.data)
                }
                else {
                }

            }, (error) => {
                console.log(error);
            });

    }, [item])

    return (
        <div className={styles.graph_container}>
            <div className={styles.graph_taux_title}>Statistiques </div>
            {loading ? ("test") : (
                <>
                    <div className={styles.graph_container_child}>
                        <div className={styles.graph_container_withselect}>
                            {/* <div>
                                <Select placeholder='Pourquoi tu guettes ?' style={{ opacity: 0 }}>
                                    <option value='option1'>Pourquoi tu guettes ? </option>
                                </Select>
                            </div> */}
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart
                                    width={800}
                                    height={300}
                                    data={dataTaux}
                                    margin={{
                                        top: 5,
                                        right: 30,
                                        left: 20,
                                        bottom: 5,
                                    }}
                                >
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="createdAt" tickFormatter={dateFormatter}/>
                                    <YAxis />
                                    <Tooltip content={<CustomTooltipTaux />} />
                                    <Legend />
                                    <Line type="monotone" dataKey="taux" stroke="white" activeDot={{ r: 3 }} />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                        <div className={styles.graph_container_withselect}>
                            <div className={styles.brisage__server}>
                                <Select bg='black' focusBorderColor="white">
                                    <option value='Imagiro' className={styles.option__select}>Imagiro</option>
                                    <option value='Draconiros' className={styles.option__select}>Draconiros</option>
                                    <option value='Tylezia' className={styles.option__select}>Tylezia</option>
                                </Select>
                            </div>
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart
                                    width={800}
                                    height={300}
                                    data={dataRunePrice}
                                    margin={{
                                        top: 5,
                                        right: 30,
                                        left: 20,
                                        bottom: 5,
                                    }}
                                >
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="saved_date" tickFormatter={dateFormatter}/>
                                    <YAxis />
                                    <Tooltip content={<CustomTooltipRunePrice />} />
                                    <Legend />
                                    <Line type="monotone" dataKey="_avg.price" stroke="white" dot={false}/>
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}