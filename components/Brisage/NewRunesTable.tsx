import {
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
    Input,
    Button,
    useToast
} from '@chakra-ui/react'

import Cookies from 'js-cookie';
import axios from 'axios';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    Cell,
    LabelList,
    ReferenceLine
} from "recharts";

import { useState, useEffect } from 'react'

import styles from "./RunesTable.module.css"
import global_styles from "../global/global.module.css"
import stylesButton from "../Navigation/Button.module.css"

interface StatsInternObject {
    id_rune: any;
    value: any;
    power: any;
    desc_fr: any;
    level: any;
}

interface RunePriceObject {
    id_rune: any;
    price: any;
}

interface QuantityWithFocus {
    desc: any;
    quantite: any;
    price: any;
}

interface QuantityWithoutFocus {
    desc: any;
    quantite: any;
    price: any;
}

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

const renderCustomizedLabel = (props: any) => {
    const { x, y, width, height, value } = props;
    const radius = 10;

    return (
        <g>
            <circle cx={x + width / 2} cy={y - radius} r={radius} fill="#8884d8" />
            <text x={x + width / 2} y={y - radius} fill="#fff" textAnchor="middle" dominantBaseline="middle">
                {value.split(' ')[1]}
            </text>
        </g>
    );
};

export default function NewRunesTable({ data, stats, runePrice, setStats, setRunePrice, item }: any) {
    const [totalSansFocus, setTotalSansFocus] = useState(0)
    const [statsIntern, setStatsIntern] = useState<StatsInternObject[]>([]);
    const [RunesPriceIntern, setRunesPriceIntern] = useState<RunePriceObject[]>([]);
    const [quantityWithFocus, setQuantityWithFocus] = useState<QuantityWithFocus[]>([])
    const [quantityWithoutFocus, setQuantityWithoutFocus] = useState<QuantityWithoutFocus[]>([])
    const [colorsArray, setColorsArray] = useState<string[]>([])

    const toast = useToast()

    useEffect(() => {
        setStatsIntern(data.stats)
        setRunesPriceIntern(data.runesPrice)
        let quantityWithFocusTmp = []
        let quantityWithoutFocusTmp = []
        let colorsArrayTmp = []
        for (let i = 0; i < data.stats.length; i++) {
            quantityWithFocusTmp.push({
                "desc": data.stats[i].desc_fr,
                "quantite": data.quantityWithFocus[i],
                "price": data.priceWithFocus[i]
            })

            quantityWithoutFocusTmp.push({
                "desc": data.stats[i].desc_fr,
                "quantite": data.quantityWithoutFocus[i],
                "price": data.priceWithoutFocus[i]
            })

        }
        quantityWithoutFocusTmp.push({
            "desc": "Total",
            "quantite": 1,
            "price": data.totalWithoutFocus
        })

        for (let j = 0; j < quantityWithoutFocusTmp.length; j++) {
            if (quantityWithoutFocusTmp.length - 1 == j) {
                colorsArrayTmp.push("#ff7f0e")
            }
            else {
                colorsArrayTmp.push("#1f77b4")
            }

        }
        console.log(quantityWithFocusTmp, colorsArrayTmp)
        setQuantityWithFocus(quantityWithFocusTmp)
        setQuantityWithoutFocus(quantityWithoutFocusTmp)
        setColorsArray(colorsArrayTmp)
    }, [])

    function handleTest() {
        // console.log(data.stats)
        console.log(RunesPriceIntern)
        RunesPriceIntern.forEach(element => {
            let dataParams = JSON.stringify({
                "id": element.id_rune,
                "price": element.price
            });
            console.log(dataParams)
            let config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: 'https://profus-api-1-0.vercel.app/items/set_rune_price',
                headers: {
                    'Content-Type': 'application/json',
                },
                data: dataParams
            };
            axios.request(config)
                .then((response) => {
                    console.log(response.data)
                })
                .catch((error) => {
                    toast({
                        title: 'An error occured while processing the request',
                        status: 'error',
                        duration: 9000,
                        isClosable: true,
                    })
                });
        });
        toast({
            title: 'Données bien sauvegardées',
            status: 'success',
            duration: 9000,
            isClosable: true,
        })
        // setTotalSansFocus(10)
    }

    function handleStat(event: any, id_rune: any, i: any) {
        let temp_state: any;
        // console.log(event.target.value, statsIntern[i])

        // if (event.target.value == data.stats[i].value) {



        temp_state = [...stats];

        data.stats[i].value = event.target.value

        console.log("enter test", id_rune)
        const isIn = temp_state.find(({ id }: any) => Number(id) === Number(id_rune))
        console.log(isIn)
        if (isIn != undefined) {
            console.log("enter not undefined")
            const idToUpdate = temp_state.findIndex(({ id }: any) => Number(id) === Number(id_rune))
            temp_state[idToUpdate].value = event.target.value
            setStats(temp_state)
        }
        else {
            console.log("enter undefined")
            temp_state.push({ "id": Number(id_rune), "value": event.target.value })
            setStats(temp_state)
        }
        console.log(temp_state)
        // }
        // 
    }

    function handleChangeStat(event: any, i: any) {
        console.log(event.target.value, statsIntern[i])
        let temp_state: any;

        temp_state = [...statsIntern];

        temp_state[i].value = event.target.value

        setStatsIntern(temp_state);
    }

    function handleChangeRunePrice(event: any, i: any) {
        console.log(event.target.value, RunesPriceIntern)
        let temp_state: any;

        temp_state = [...RunesPriceIntern];

        temp_state[i].price = event.target.value

        setRunesPriceIntern(temp_state);
    }

    function handleRunes(event: any, id_rune: any, i: any) {
        let temp_state: any;

        temp_state = [...runePrice];

        data.runesPrice[i].value = event.target.value

        console.log("enter test")
        const isIn = temp_state.find(({ id }: any) => Number(id) === Number(id_rune))
        console.log(isIn)
        if (isIn != undefined) {
            console.log("enter not undefined")
            const idToUpdate = temp_state.findIndex(({ id }: any) => Number(id) === Number(id_rune))
            temp_state[idToUpdate].value = event.target.value
            setRunePrice(temp_state)
        }
        else {
            console.log("enter undefined")
            temp_state.push({ "id": id_rune, "value": event.target.value })
            setRunePrice(temp_state)
        }
        console.log(temp_state)
    }

    return (
        <>
            {statsIntern[0] && RunesPriceIntern[0] ?
                <div className={styles.all__table__container}>
                    <table className={styles.table__container}>
                        <thead>
                            <tr>
                                <th>Runes</th>
                                <th>Statistiques de l&apos;item</th>
                                <th>Prix de la rune (/u)</th>
                                {/* <th>Quantité</th>
                            <th>Prix</th>
                            <th>Aucun focus</th> */}
                            </tr>

                        </thead>
                        <tbody>
                            {data.stats.map((object: any, i: any) => {
                                return (
                                    <tr key={object.id_rune}>
                                        <td className={styles.td}>
                                            {/* <i className={`${global_styles.stat} ${global_styles.stat_force} ${styles.icon_carac}`}></i>  */}
                                            {object.desc_fr}
                                        </td>
                                        <td>
                                            <div className={styles.input_container}>
                                                <Input placeholder='10' bg='black' focusBorderColor="white" className={styles.nb_input} size='sm' htmlSize={6} width='auto' value={statsIntern[i].value}
                                                    onBlur={(event) => handleStat(event, object.id_rune, i)}
                                                    onChange={(event) => handleChangeStat(event, i)} />
                                            </div>
                                        </td>
                                        <td>
                                            <div className={styles.input_container}>
                                                <Input placeholder='10' bg='black' focusBorderColor="white" className={styles.nb_input} size='sm' htmlSize={6} width='auto' value={RunesPriceIntern[i].price}
                                                    onBlur={(event) => handleRunes(event, object.id_rune, i)}
                                                    onChange={(event) => handleChangeRunePrice(event, i)} />
                                            </div>
                                        </td>
                                        {/* <td>{data.quantityWithFocus[i]}</td>
                                    <td>{data.priceWithFocus[i]}</td>
                                    <td>{data.priceWithoutFocus[i]}</td> */}
                                    </tr>
                                );
                            })}
                            <tr>
                                <td></td>
                                <td></td>
                                <td>
                                    <Button className={`${stylesButton.button} ${stylesButton.white}`} onClick={handleTest}> Save Runes </Button>
                                </td>
                            </tr>
                        </tbody>
                        {/* <tfoot>
                            <tr>
                                <td></td>
                                <td></td>
                                <td>
                                    <Button className={`${stylesButton.button} ${stylesButton.white}`}> Save Runes </Button>
                                </td>
                                <td colSpan={2} className={styles.footer_total}><b>Total sans focus :</b></td>
                                <td className={styles.td}>
                                    <b>{data.totalWithoutFocus}</b>
                                </td>
                            </tr>
                        </tfoot> */}
                    </table>
                    <div className={styles.graph__container}>
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart
                                width={500}
                                height={300}
                                data={quantityWithFocus}
                                
                                barSize={40}
                            >
                                <XAxis dataKey="desc" padding={{ left: 0, right: 0 }} />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                {/* <CartesianGrid strokeDasharray="2 2" /> */}
                                {/* <Bar dataKey="quantite" fill="#8884d8"  /> */}
                                <Bar dataKey="price" fill="#82ca9d" name='Prix avec focus'>
                                    <LabelList  dataKey="price" position="center" style={{fontWeight: "700", fontSize: '70%', fill: 'black' }} />
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart
                                width={300}
                                height={400}
                                data={quantityWithoutFocus}
                                
                                barSize={40}
                            >
                                <XAxis dataKey="desc" padding={{ left: 0, right: 0 }} />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                {/* <CartesianGrid strokeDasharray="2 2" /> */}
                                {/* <Bar dataKey="quantite" fill="#8884d8"  /> */}
                                <Bar dataKey="price" fill="#1f77b4" name='Prix sans focus'  >
                                    {
                                        colorsArray.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry} />
                                        ))
                                    }
                                    <LabelList dataKey="price" position="center" style={{fontWeight: "700", fontSize: '70%', fill: 'black' }} />
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
                : null}
        </>
    )
}